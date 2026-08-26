"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUp, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { InlineMessage } from "@/components/piche/inline-message";
import { useViewingRequest } from "@/components/piche/viewing-request-provider";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  computeBarPlacement,
  computeTravelProgress,
  hasReplyRoute,
  VIEWING_EYEBROW,
  VIEWING_LEAD_IN,
  VIEWING_PROMPT,
  VIEWING_REPLY_HINT,
  VIEWING_SENT,
  slotRestDistance,
} from "@/lib/viewing-request";

// Share of the remaining distance the bar covers per frame while it settles
// into the dock under its own steam — scroll is not driving it at that point
// (the form has just opened), so it needs an easing of its own.
const SETTLE_LERP = 0.16;
// Below this the bar and its target are close enough to call it arrived.
const SETTLE_EPSILON = 0.002;

const FIELD_CLASS =
  "h-(--input-height) w-full min-w-0 rounded-(--radius-md-ds) border border-(--border-hairline) bg-(--surface-soft) px-3.5 text-(length:--body-md-size) text-(--text-primary) outline-none transition-[border-color,box-shadow] duration-(--duration-base) ease-(--ease-standard) placeholder:text-(--text-disabled) focus-visible:border-(--text-primary) focus-visible:ring-4 focus-visible:ring-(--focus-ring)/20 aria-invalid:border-(--status-error)";

/**
 * The one request bar on the page. It starts life sitting in the hero, peels
 * off as the page scrolls and docks at the foot of the viewport, opens into a
 * full request form the moment the visitor starts writing, and steps aside
 * when the contact section — which is the same form again — comes into view.
 *
 * Position is written straight to the DOM from a scroll handler rather than
 * held in React state: it changes every frame, and the same rule the header
 * follows applies here — the scroll position *is* the animation, so none of
 * the travel is transitioned.
 */
export function ViewingBar() {
  const { draft, update, reset } = useViewingRequest();
  const reducedMotion = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const [sent, setSent] = useState(false);
  const [replyMissing, setReplyMissing] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // Read by the scroll handler, which must not be torn down and rebuilt every
  // time the form opens or closes.
  const expandedRef = useRef(false);
  const settlingRef = useRef(false);
  const scheduleRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let frame = 0;
    let progress = 0;
    let settled = false;

    const paint = () => {
      frame = 0;

      const slotEl =
        document.querySelector<HTMLElement>("[data-viewing-bar-slot]");
      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const rect = slotEl?.getBoundingClientRect();
      // No slot on the page at all (a route without the hero): stay docked.
      const scrolled = rect
        ? computeTravelProgress(
            window.scrollY,
            slotRestDistance(rect.bottom, viewport.height, window.scrollY),
            reducedMotion,
          )
        : 1;
      // An open form is pinned to the dock no matter where the page is —
      // otherwise it would drift back up over the hero mid-keystroke.
      const target = expandedRef.current ? 1 : scrolled;

      if (!settled) {
        progress = target;
        settled = true;
      } else if (settlingRef.current) {
        progress += (target - progress) * SETTLE_LERP;
        if (Math.abs(target - progress) < SETTLE_EPSILON) {
          progress = target;
          settlingRef.current = false;
        }
      } else {
        progress = target;
      }

      const slot = rect
        ? { left: rect.left, bottom: rect.bottom, width: rect.width }
        : { left: 0, bottom: viewport.height, width: viewport.width };

      const placement = computeBarPlacement(slot, viewport, progress);
      wrap.style.transform = `translate3d(${placement.x}px, ${-placement.y}px, 0)`;
      wrap.style.width = `${placement.width}px`;
      wrap.style.setProperty("--viewing-bar-progress", progress.toFixed(3));

      if (settlingRef.current) schedule();
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    scheduleRef.current = schedule;
    paint();
    setReady(true);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Web fonts landing and the hero video sizing itself both move the slot
    // after the first measurement, and neither fires a scroll event.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion]);

  // Declared after the effect above so `scheduleRef` is populated by the time
  // this first runs.
  const firstSync = useRef(true);
  useEffect(() => {
    expandedRef.current = expanded;
    if (firstSync.current) {
      firstSync.current = false;
      return;
    }
    settlingRef.current = true;
    scheduleRef.current();
  }, [expanded]);

  useEffect(() => {
    const contacts = document.getElementById("contacts");
    if (!contacts) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearContact(entry.isIntersecting),
      // Positive bottom margin: step aside as the contact section approaches,
      // not once it has already pushed under the bar.
      { rootMargin: "0px 0px 160px 0px" },
    );
    observer.observe(contacts);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => {
      setSent(false);
      setExpanded(false);
      reset();
    }, 6000);
    return () => clearTimeout(timer);
  }, [sent, reset]);

  const handleMessage = (value: string) => {
    update({ message: value });
    if (value.trim() !== "" && !expanded) setExpanded(true);
  };

  const handleMessageKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter carries on to the details instead of submitting a form that is
    // still missing everything but the message.
    if (event.key !== "Enter" || !expanded || draft.name.trim() !== "") return;
    event.preventDefault();
    nameRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!expanded) {
      setExpanded(true);
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }
    if (!hasReplyRoute(draft)) {
      setReplyMissing(true);
      return;
    }
    setReplyMissing(false);
    setSent(true);
  };

  const hidden = !ready || nearContact;

  return (
    <div
      ref={wrapRef}
      data-ready={ready ? "" : undefined}
      className="viewing-bar fixed bottom-0 left-0 z-40 will-change-transform"
      style={{ width: 0 }}
    >
      <div
        // The hide layer: a state change rather than a scroll-linked one, so
        // unlike the travel above it does get a transition.
        inert={hidden}
        className={`transition-[opacity,transform] duration-500 ease-(--ease-standard) ${
          hidden ? "translate-y-[130%] opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className={ready ? "viewing-bar-enter" : undefined}>
          <form
            onSubmit={handleSubmit}
            className={`viewing-bar-card relative flex flex-col overflow-hidden bg-(--surface-canvas) transition-[border-radius] duration-500 ease-(--ease-standard) ${
              expanded ? "rounded-(--radius-lg-ds)" : "rounded-(--radius-full-ds)"
            }`}
          >
            {/* 0fr → 1fr grows the panel from nothing without anyone having to
                know how tall it ends up. The card is anchored by its bottom
                edge, so all of that height is added upwards and the composer
                row below stays exactly where the visitor left it. */}
            <div
              data-viewing-panel={expanded ? "open" : "closed"}
              inert={!expanded}
              className="grid transition-[grid-template-rows] duration-500 ease-(--ease-standard)"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              {/* overflow-hidden is what lets the 0fr row collapse to nothing. */}
              <div className="overflow-hidden">
                {sent ? (
                  <div className="p-(--space-xl) pb-(--space-md)">
                    <InlineMessage tone="success">{VIEWING_SENT}</InlineMessage>
                  </div>
                ) : (
                  // Capped and scrollable so a phone-sized viewport cannot end
                  // up with the first fields pushed off the top of the screen.
                  <div className="flex max-h-[70dvh] flex-col gap-(--space-lg) overflow-y-auto overscroll-contain p-(--space-xl) pb-(--space-md)">
                    <div data-viewing-field style={fieldOrder(0)} className="pr-10">
                      <p className="m-0 text-(length:--body-sm-strong-size) font-semibold tracking-[0.1em] text-(--text-mute) uppercase">
                        {VIEWING_EYEBROW}
                      </p>
                      <p className="m-0 mt-(--space-xxs) text-(length:--body-sm-size) text-(--text-mute)">
                        {VIEWING_LEAD_IN}
                      </p>
                    </div>

                    <div className="grid gap-(--space-md) sm:grid-cols-2">
                      <BarField
                        ref={nameRef}
                        order={1}
                        label="Name"
                        name="name"
                        autoComplete="given-name"
                        placeholder="Your name"
                        required={expanded}
                        value={draft.name}
                        onChange={(event) => update({ name: event.target.value })}
                      />
                      <BarField
                        order={2}
                        label="Surname"
                        optional
                        name="surname"
                        autoComplete="family-name"
                        placeholder="Your surname"
                        value={draft.surname}
                        onChange={(event) =>
                          update({ surname: event.target.value })
                        }
                      />
                      <BarField
                        order={3}
                        label="E-mail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        aria-invalid={replyMissing || undefined}
                        value={draft.email}
                        onChange={(event) => {
                          update({ email: event.target.value });
                          setReplyMissing(false);
                        }}
                      />
                      <BarField
                        order={4}
                        label="Phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+371"
                        aria-invalid={replyMissing || undefined}
                        value={draft.phone}
                        onChange={(event) => {
                          update({ phone: event.target.value });
                          setReplyMissing(false);
                        }}
                      />
                    </div>

                    <div data-viewing-field style={fieldOrder(5)}>
                      {replyMissing ? (
                        <InlineMessage tone="error">
                          {VIEWING_REPLY_HINT}
                        </InlineMessage>
                      ) : (
                        <p className="m-0 text-(length:--body-sm-size) text-(--text-mute)">
                          {VIEWING_REPLY_HINT}
                        </p>
                      )}
                    </div>

                    <label
                      data-viewing-field
                      style={fieldOrder(6)}
                      className="flex items-start gap-(--space-md) text-(length:--body-sm-size) leading-relaxed text-(--text-mute)"
                    >
                      <Checkbox
                        required={expanded}
                        name="consent"
                        className="mt-0.5 border-(--text-disabled) data-[state=checked]:border-(--brand-primary) data-[state=checked]:bg-(--brand-primary)"
                      />
                      <span>
                        I agree to the processing of my personal data in line
                        with the{" "}
                        <a
                          href="#privacy-policy"
                          className="underline underline-offset-3 hover:text-(--text-primary)"
                        >
                          privacy policy
                        </a>
                        .
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* The composer — the pill the bar spends most of its life as. It
                is the fixed point of the whole thing: everything else opens
                above it so the field being typed into never moves. The rule
                above it is an inset shadow rather than a border so the pill
                keeps the exact height the hero slot reserves for it. */}
            <div
              className={`flex items-center gap-(--space-md) p-(--space-sm) transition-[padding,box-shadow] duration-500 ease-(--ease-standard) ${
                expanded
                  ? "pl-(--space-xl) shadow-[inset_0_1px_0_var(--border-hairline)]"
                  : "pl-(--space-lg)"
              }`}
            >
              <input
                required
                name="message"
                value={draft.message}
                onChange={(event) => handleMessage(event.target.value)}
                onKeyDown={handleMessageKeys}
                disabled={sent}
                placeholder={VIEWING_PROMPT}
                aria-label={VIEWING_PROMPT}
                className="h-11 min-w-0 flex-1 border-none bg-transparent text-(length:--body-md-size) text-(--text-primary) outline-none placeholder:text-(--text-mute) disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sent}
                aria-label={expanded ? "Send request" : "Continue"}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-(--text-primary) text-(--surface-canvas) transition-transform duration-(--duration-fast) ease-(--ease-standard) hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-40"
              >
                <ArrowUp className="size-4.5" />
              </button>
            </div>

            {/* Last in the DOM so it does not sit between the message and the
                details in the tab order; painted into the top corner. */}
            {expanded && !sent ? (
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  setReplyMissing(false);
                }}
                aria-label="Close the request form"
                className="absolute top-(--space-md) right-(--space-md) grid size-8 place-items-center rounded-full text-(--text-mute) transition-colors duration-(--duration-base) hover:bg-(--surface-secondary) hover:text-(--text-primary)"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

const fieldOrder = (order: number) => ({ "--i": order }) as CSSProperties;

function BarField({
  order,
  label,
  optional,
  ref,
  ...props
}: React.ComponentProps<"input"> & {
  order: number;
  label: string;
  optional?: boolean;
}) {
  return (
    <label
      data-viewing-field
      style={fieldOrder(order)}
      className="flex min-w-0 flex-col gap-(--space-xs)"
    >
      <span className="text-(length:--caption-md-size) font-semibold tracking-[0.08em] text-(--text-mute) uppercase">
        {label}
        {optional ? (
          <span className="ml-1 normal-case opacity-70">(optional)</span>
        ) : null}
      </span>
      <input ref={ref} className={FIELD_CLASS} {...props} />
    </label>
  );
}

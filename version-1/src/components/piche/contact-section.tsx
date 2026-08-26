"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PicheButton } from "@/components/piche/piche-button";
import { TextField } from "@/components/piche/text-field";
import { InlineMessage } from "@/components/piche/inline-message";
import { useViewingRequest } from "@/components/piche/viewing-request-provider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  hasReplyRoute,
  VIEWING_EYEBROW,
  VIEWING_PROMPT_LEAD,
  VIEWING_REPLY_HINT,
  VIEWING_SENT,
} from "@/lib/viewing-request";

export function ContactSection() {
  // The floating bar hides itself as this section arrives; whatever the
  // visitor had already written into it is waiting here.
  const { draft, update } = useViewingRequest();
  const [sent, setSent] = useState(false);
  const [replyMissing, setReplyMissing] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasReplyRoute(draft)) {
      setReplyMissing(true);
      return;
    }
    setReplyMissing(false);
    setSent(true);
  };

  return (
    <section
      id="contacts"
      className="scroll-mt-(--nav-height) rounded-t-[clamp(2rem,5vw,5rem)] bg-(--surface-dark) px-(--container-pad) pt-[clamp(4.5rem,8vw,8rem)] pb-[clamp(4rem,7vw,7rem)] text-(--text-on-dark)"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-[clamp(3rem,6vw,6rem)] grid gap-(--space-xl) lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end">
          <div>
            <p className="mb-(--space-lg) text-(length:--body-sm-strong-size) font-semibold tracking-[0.12em] text-(--brand-primary) uppercase">
              Let&rsquo;s talk
            </p>
            <h2
              className="m-0 max-w-[13ch] text-balance font-(family-name:--font-display) text-[clamp(3rem,7vw,7.5rem)] font-bold"
              style={{ lineHeight: 0.94, letterSpacing: "-0.055em" }}
            >
              A home starts with a conversation.
            </h2>
          </div>
          <div className="flex max-w-[46ch] flex-col gap-(--space-xl) lg:pb-2">
            <p className="m-0 text-(length:--heading-md-size) leading-relaxed text-(--text-on-dark-mute)">
              Tell us what you are looking for. Our sales team will help you
              compare projects, homes and financing options.
            </p>
            <a
              href="tel:+37122333333"
              className="group inline-flex w-fit items-center gap-(--space-sm) font-semibold text-(--text-on-dark)"
            >
              Speak with our sales team
              <ArrowUpRight className="size-4 transition-transform duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-(--surface-card) lg:grid-cols-[minmax(340px,0.78fr)_minmax(0,1.22fr)]">
          <div className="flex min-h-[460px] flex-col bg-[#1d1e1b]">
            <div className="grid gap-1 border-b border-white/10 p-[clamp(1.5rem,3vw,2.5rem)] sm:grid-cols-3 lg:grid-cols-1">
              <a
                href="tel:+37122333333"
                className="group flex items-center gap-3 rounded-(--radius-md-ds) px-3 py-3 text-(--text-on-dark) transition-colors duration-(--duration-base) hover:bg-white/6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-(--brand-primary)">
                  <Phone className="size-4" />
                </span>
                <span className="text-(length:--body-sm-size)">
                  <span className="block text-(--text-on-dark-mute)">Call us</span>
                  <span className="font-semibold">+371 22 333 333</span>
                </span>
              </a>
              <a
                href="mailto:info@piche.lv"
                className="group flex items-center gap-3 rounded-(--radius-md-ds) px-3 py-3 text-(--text-on-dark) transition-colors duration-(--duration-base) hover:bg-white/6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-(--brand-primary)">
                  <Mail className="size-4" />
                </span>
                <span className="text-(length:--body-sm-size)">
                  <span className="block text-(--text-on-dark-mute)">Write to us</span>
                  <span className="font-semibold">info@piche.lv</span>
                </span>
              </a>
              <div className="flex items-center gap-3 rounded-(--radius-md-ds) px-3 py-3 text-(--text-on-dark)">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-(--brand-primary)">
                  <MapPin className="size-4" />
                </span>
                <span className="text-(length:--body-sm-size)">
                  <span className="block text-(--text-on-dark-mute)">Visit us</span>
                  <span className="font-semibold">Mežciema iela, Mārupe</span>
                </span>
              </div>
            </div>
            <div className="relative min-h-[300px] flex-1 overflow-hidden">
              <iframe
                src="/map.html"
                title="Location map — Mežciema iela, Mārupe"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.15] contrast-[0.92]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-[#1d1e1b]/30 to-transparent" />
            </div>
          </div>

          {/* Same request as the floating bar, same order: what you are after
              first, then who to come back to. */}
          <form
            className="flex flex-col gap-(--space-xl) bg-(--surface-card) p-[clamp(1.5rem,4vw,4.5rem)]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-(--space-sm)">
              <p className="m-0 text-(length:--body-sm-strong-size) font-semibold tracking-[0.1em] text-(--text-mute) uppercase">
                Contact form
              </p>
              <h3 className="m-0 font-(family-name:--font-display) text-(length:--heading-xl-size) font-bold tracking-[-0.035em] text-(--text-primary)">
                {VIEWING_EYEBROW}
              </h3>
            </div>
            <label className="block">
              <span className="mb-(--space-sm) block text-(length:--body-strong-size) font-semibold text-(--text-primary)">
                {VIEWING_PROMPT_LEAD}
              </span>
              <Textarea
                required
                rows={4}
                placeholder="Which project or apartment are you interested in?"
                name="message"
                value={draft.message}
                onChange={(event) => update({ message: event.target.value })}
                className="min-h-32 resize-y rounded-(--radius-md-ds) border-(--gray-300) bg-(--surface-canvas) px-4 py-3 text-(length:--body-md-size) text-(--text-primary) shadow-none transition-[border-color,box-shadow] duration-(--duration-base) focus-visible:border-(--text-primary) focus-visible:ring-4 focus-visible:ring-(--focus-ring)/20"
              />
            </label>
            <div className="grid grid-cols-1 gap-x-(--space-lg) gap-y-(--space-xl) sm:grid-cols-2">
              <TextField
                required
                autoComplete="given-name"
                label="Name"
                placeholder="Your name"
                name="name"
                value={draft.name}
                onChange={(event) => update({ name: event.target.value })}
              />
              <TextField
                autoComplete="family-name"
                label="Surname (optional)"
                placeholder="Your surname"
                name="surname"
                value={draft.surname}
                onChange={(event) => update({ surname: event.target.value })}
              />
              <TextField
                autoComplete="email"
                label="E-mail"
                type="email"
                placeholder="name@example.com"
                name="email"
                aria-invalid={replyMissing || undefined}
                value={draft.email}
                onChange={(event) => {
                  update({ email: event.target.value });
                  setReplyMissing(false);
                }}
              />
              <TextField
                autoComplete="tel"
                label="Telephone number"
                type="tel"
                placeholder="+371"
                name="phone"
                aria-invalid={replyMissing || undefined}
                value={draft.phone}
                onChange={(event) => {
                  update({ phone: event.target.value });
                  setReplyMissing(false);
                }}
              />
            </div>
            {replyMissing ? (
              <InlineMessage tone="error">{VIEWING_REPLY_HINT}</InlineMessage>
            ) : (
              <p className="m-0 text-(length:--body-sm-size) text-(--text-mute)">
                {VIEWING_REPLY_HINT}
              </p>
            )}
            <label className="flex items-start gap-(--space-md) text-(length:--body-sm-size) leading-relaxed text-(--text-mute)">
              <Checkbox
                required
                className="mt-0.5 border-(--text-disabled) data-[state=checked]:border-(--brand-primary) data-[state=checked]:bg-(--brand-primary)"
              />
              <span>
                I agree to the processing of my personal data in line with the{" "}
                <a href="#privacy-policy" className="underline underline-offset-3 hover:text-(--text-primary)">
                  privacy policy
                </a>
                .
              </span>
            </label>
            <div className="flex flex-col items-start gap-(--space-lg) sm:flex-row sm:items-center">
              <PicheButton type="submit" className="h-12 shrink-0 px-6 whitespace-nowrap">
                Send message
                <ArrowUpRight className="size-4" />
              </PicheButton>
              {sent ? (
                <div className="motion-safe:animate-[reveal-up_420ms_var(--ease-standard)_both]">
                  <InlineMessage tone="success">{VIEWING_SENT}</InlineMessage>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

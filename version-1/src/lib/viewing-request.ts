// The floating viewing bar and the contact section collect the same request,
// so the wording, the shape of the draft and the rule about how we reply all
// live here rather than in either component. A visitor who starts typing in
// the bar and finishes in the contact form should not be able to tell they
// crossed from one to the other.

export const VIEWING_PROMPT =
  "Tell us what you're looking for — we'll arrange a viewing";
/** The same sentence, split so it can carry a heading and its sub-line. */
export const VIEWING_PROMPT_LEAD = "Tell us what you're looking for";
export const VIEWING_EYEBROW = "Arrange a viewing";
export const VIEWING_LEAD_IN =
  "A couple of details and our sales team takes it from here.";
export const VIEWING_REPLY_HINT =
  "Leave an e-mail or a phone number — either one is enough, both is welcome.";
export const VIEWING_SENT = "Thanks — our sales team will be in touch shortly.";

export type ViewingDraft = {
  message: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export const EMPTY_VIEWING_DRAFT: ViewingDraft = {
  message: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
};

/**
 * We only need one way back, so neither the e-mail nor the phone number is
 * required on its own — but one of the two has to be there. Nothing native
 * expresses "either of these", which is why both fields are left optional in
 * the markup and this runs on submit instead.
 */
export function hasReplyRoute(draft: Pick<ViewingDraft, "email" | "phone">) {
  return draft.email.trim() !== "" || draft.phone.trim() !== "";
}

/* Travel ---------------------------------------------------------------- */

/** Widest the docked bar gets before the gutters start eating into it. */
export const DOCK_MAX_WIDTH = 640;
const DOCK_GUTTER = 24;
/** Gap the docked bar keeps from the foot of the viewport. */
const DOCK_BOTTOM = 16;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * The slot rides up with the page one pixel per pixel of scroll, so however
 * far down the page we are, the distance that separated it from the docked
 * position at rest can be recovered from a live measurement.
 */
export function slotRestDistance(
  slotBottom: number,
  viewportHeight: number,
  scrollY: number,
): number {
  return viewportHeight - slotBottom - scrollY;
}

/**
 * Multiple of the hero-to-dock gap the journey is allowed to be stretched
 * over. The two are not independent: the slot the bar starts in scrolls
 * upward while the dock stays put, so past a point, stretching the journey has
 * the hero carrying the bar *up* the screen faster than the dock is pulling it
 * down — a bounce on the first flick of the wheel. Differentiating the blend
 * below puts that point at exactly three times the gap; 2.5 buys a long,
 * legible descent and still leaves room to spare.
 */
const TRAVEL_HEADROOM = 2.5;

/**
 * How far along the hero-to-dock journey the bar is. The distance it runs over
 * is derived from the gap it has to close rather than being a round number, so
 * it re-tunes itself to wherever the layout puts the slot.
 *
 * A visitor who has asked for less motion gets no journey at all: the bar is
 * either in the hero or docked, and flips between the two at the halfway mark.
 */
export function computeTravelProgress(
  scrollY: number,
  slotRestY: number,
  reducedMotion = false,
): number {
  const distance = Math.max(1, (slotRestY - DOCK_BOTTOM) * TRAVEL_HEADROOM);
  if (reducedMotion) return scrollY > distance / 2 ? 1 : 0;
  return 1 - (1 - clamp01(scrollY / distance)) ** 3;
}

export function computeDockWidth(viewportWidth: number) {
  return Math.min(DOCK_MAX_WIDTH, viewportWidth - DOCK_GUTTER * 2);
}

/**
 * Blends the bar between the slot it occupies in the hero and its docked place
 * at the foot of the viewport.
 *
 * `y` is measured *upwards from the bottom edge* rather than down from the
 * top, so the bar's own height — which changes by a few hundred pixels when
 * the form opens — never enters the sum, and the composer row the visitor is
 * typing into stays exactly where it was.
 */
export function computeBarPlacement(
  slot: { left: number; bottom: number; width: number },
  viewport: { width: number; height: number },
  progress: number,
): { x: number; y: number; width: number } {
  const p = clamp01(progress);
  const dockWidth = computeDockWidth(viewport.width);
  return {
    x: lerp(slot.left, (viewport.width - dockWidth) / 2, p),
    y: lerp(viewport.height - slot.bottom, DOCK_BOTTOM, p),
    width: lerp(slot.width, dockWidth, p),
  };
}

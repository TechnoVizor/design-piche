"use client";

import { useState } from "react";
import { PicheButton } from "@/components/piche/piche-button";
import { TextField } from "@/components/piche/text-field";
import { InlineMessage } from "@/components/piche/inline-message";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className="scroll-mt-(--nav-height) pt-(--space-section)">
      <div className="grid grid-cols-1 gap-(--space-section) lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-(--space-xl)">
          <h2
            className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
            style={{ letterSpacing: "-0.8px" }}
          >
            Contacts
          </h2>
          <div className="flex flex-col gap-(--space-md)">
            <span className="text-(length:--heading-md-size) font-semibold text-(--text-primary)">
              Sales team
            </span>
            <a href="tel:+37122333333" className="text-(length:--body-md-size) text-(--text-body)">
              +371 22 333 333
            </a>
            <a
              href="mailto:info@piche.lv"
              className="text-(length:--body-md-size) text-(--text-body)"
            >
              info@piche.lv
            </a>
            <span className="text-(length:--body-md-size) text-(--text-mute)">
              Mežciema iela, Mārupe, Latvia
            </span>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-md-ds) bg-(--surface-card)">
            <iframe
              src="/map.html"
              title="Location map — Mežciema iela, Mārupe"
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        <form
          className="flex flex-col gap-(--space-lg) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <span className="text-(length:--heading-lg-size) font-semibold text-(--text-primary)">
            Write to us
          </span>
          <div className="grid grid-cols-1 gap-(--space-lg) sm:grid-cols-2">
            <TextField label="Name" placeholder="Name" name="name" />
            <TextField label="Surname" placeholder="Surname" name="surname" />
            <TextField
              label="Telephone number"
              type="tel"
              placeholder="+371"
              name="phone"
            />
            <TextField
              label="E-mail"
              type="email"
              placeholder="name@example.com"
              name="email"
            />
          </div>
          <label className="block">
            <span className="mb-(--space-sm) block text-(length:--body-strong-size) font-semibold text-(--text-primary)">
              Your question or comment
            </span>
            <Textarea
              rows={4}
              placeholder="Which project or apartment are you interested in"
              name="message"
              className="min-h-24 resize-y rounded-(--radius-md-ds) border-(--text-disabled) bg-(--surface-canvas) px-4 py-2.5 text-(length:--body-md-size) text-(--text-primary) shadow-none focus-visible:border-(--text-primary) focus-visible:ring-4 focus-visible:ring-(--focus-ring)/100"
            />
          </label>
          <label className="flex items-start gap-(--space-sm) text-(length:--body-sm-size) text-(--text-mute)">
            <Checkbox
              required
              className="mt-0.5 border-(--text-disabled) data-[state=checked]:border-(--brand-primary) data-[state=checked]:bg-(--brand-primary)"
            />
            <span>
              I agree to the processing of my personal data in line with the
              privacy policy.
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-(--space-lg)">
            <PicheButton type="submit" className="shrink-0 px-5 whitespace-nowrap">
              Send message
            </PicheButton>
            {sent ? (
              <div className="motion-safe:animate-[reveal-up_420ms_var(--ease-standard)_both]">
                <InlineMessage tone="success">
                  Thank you. Our sales team will contact you shortly.
                </InlineMessage>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

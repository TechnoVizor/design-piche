"use client";

import { useState } from "react";
import { DsButton } from "./ds-button";

const inputCls =
  "type-body h-11 rounded-(--radius-control) border border-(--border-ui) px-3 text-(--text-body) outline-none placeholder:text-(--text-placeholder)";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className="bg-(--carbon-dark) py-16">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-16 px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
        <div className="flex flex-col gap-8">
          <h2 className="type-hero text-(--text-on-dark)">Contacts</h2>
          <div className="flex flex-col gap-2">
            <span className="text-[17px]/[24px] font-medium tracking-[0.24em] text-(--text-on-dark)">
              V ā r d s U z v ā r d s
            </span>
            <a
              href="tel:+37122333333"
              className="text-[15px]/[24px] tracking-[0.16em] text-(--pale-silver)"
            >
              + 3 7 1 2 2 3 3 3 3 3 3 3 3
            </a>
            <a
              href="mailto:info@piche.eu"
              className="text-[15px]/[24px] text-(--pale-silver)"
            >
              e - m a i l
            </a>
          </div>
          <div className="flex flex-col gap-2 border-t border-(--graphite) pt-(--space-3)">
            <span className="type-body text-(--silver-fog)">
              Mežciema iela, Mārupe, Latvia
            </span>
            <a href="https://piche.eu" className="type-body text-(--pale-silver)">
              piche.eu
            </a>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col gap-4 rounded-(--radius-card) bg-(--white) p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input placeholder="Name" className={inputCls} />
            <input placeholder="Surname" className={inputCls} />
            <input placeholder="Telephone number" className={inputCls} />
            <input placeholder="E-mail" className={inputCls} />
          </div>
          <textarea
            placeholder="Your question or comment"
            rows={5}
            className="type-body resize-y rounded-(--radius-control) border border-(--border-ui) p-3 text-(--text-body) outline-none placeholder:text-(--text-placeholder)"
          />
          <label className="type-body flex items-start gap-2 text-(--text-tertiary)">
            <input type="checkbox" className="mt-[3px]" />I agree to the
            processing of my personal data
          </label>
          <DsButton type="submit" className="w-full">
            Send message
          </DsButton>
          {sent && (
            <p className="type-body m-0 text-(--electric-blue)">
              Thank you — we will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

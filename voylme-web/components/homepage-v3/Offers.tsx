"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react";

import {
  V3_COPY,
  type V3Language,
} from "./content";

type Props = {
  language: V3Language;
};

export default function Offers({
  language,
}: Props) {
  const copy = V3_COPY[language];
  const isArabic = language === "ar";
  const ArrowIcon = isArabic
    ? ArrowLeft
    : ArrowRight;

  const icons = [
    PlaneTakeoff,
    Building2,
    Sparkles,
  ];

  return (
    <section
      className="v3-offers-section px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-9"
      dir={copy.direction}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#660033]">
            {copy.offersEyebrow}
          </p>

          <h2 className="mt-2 max-w-[700px] text-2xl font-black leading-tight text-[#271720] md:text-4xl">
            {copy.offersTitle}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {copy.offers.map((offer, index) => {
            const Icon = icons[index];

            return (
              <article
                key={offer.title}
                className="v3-offer-card group flex flex-col rounded-[22px] border border-[#660033]/10 bg-white p-4 shadow-[0_12px_32px_rgba(72,18,45,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(72,18,45,0.12)] md:p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#f8edf3] text-[#660033]">
                  <Icon
                    size={24}
                    strokeWidth={2}
                  />
                </div>

                <h3 className="mt-4 text-lg font-black text-[#321d28]">
                  {offer.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#766872]">
                  {offer.description}
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#660033]"
                >
                  <span>
                    {isArabic
                      ? "عرض التفاصيل"
                      : "View details"}
                  </span>

                  <ArrowIcon
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

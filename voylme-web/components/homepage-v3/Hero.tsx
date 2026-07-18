"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { V3_COPY, type V3Language } from "./content";

type Props = {
  language: V3Language;
};

export default function Hero({ language }: Props) {
  const copy = V3_COPY[language];
  const isArabic = language === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section
      className="v3-hero"
      dir={copy.direction}
      aria-labelledby="v3-hero-title"
    >
      <div className="v3-hero-overlay" />

      <div className="v3-hero-content">
        <p className="v3-hero-eyebrow">
          {copy.heroEyebrow}
        </p>

        <h1
          id="v3-hero-title"
          className="v3-hero-title"
        >
          {copy.heroTitle}
        </h1>

        <p className="v3-hero-description">
          {copy.heroDescription}
        </p>

        <Link
          href="/search"
          className="v3-hero-button"
        >
          <span>{copy.search.searchButton}</span>
          <ArrowIcon size={20} strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}

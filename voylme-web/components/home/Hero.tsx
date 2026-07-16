"use client";

import {
  getHeroContent,
  resolveHeroLanguage,
} from "@/lib/voylme/i18n/hero";

import {
  useVoylmeLanguage,
} from "@/lib/voylme/i18n/runtime";

export default function Hero() {
  const {
    languageCode,
  } = useVoylmeLanguage();

  const heroLanguage =
    resolveHeroLanguage(languageCode);

  const content =
    getHeroContent(heroLanguage);

  return (
    <section className="voylme-hero-v4">
      <div className="voylme-hero-v4-frame">
        <img
          className="voylme-hero-v4-image"
          src="/images/hero-bg-clean-v2.png"
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <div
          key={heroLanguage}
          className="voylme-hero-v4-copy"
          dir={content.dir}
          lang={heroLanguage.toLowerCase()}
        >
          <p className="voylme-hero-v4-eyebrow">
            {content.eyebrow}
          </p>

          <h1 className="voylme-hero-v4-title">
            {content.title}
          </h1>

          <p className="voylme-hero-v4-description">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

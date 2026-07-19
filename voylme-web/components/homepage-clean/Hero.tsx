import Image from "next/image";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type HeroProps = {
  language: V3Language;
};

export default function Hero({ language }: HeroProps) {
  const content = homepageContent[language].hero;
  const isArabic = language === "ar";

  return (
    <section
      className="relative isolate min-h-[430px] overflow-hidden bg-[#660033] sm:min-h-[500px]"
      aria-labelledby="voylme-hero-title"
    >
      <Image
        src="/images/hero-bg-clean-v2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#320018]/80 via-[#520029]/45 to-transparent"
        aria-hidden="true"
      />

      <div
        className={`relative z-10 mx-auto flex min-h-[430px] w-full max-w-7xl items-center px-5 py-14 sm:min-h-[500px] sm:px-8 lg:px-12 ${
          isArabic ? "justify-end text-right" : "justify-start text-left"
        }`}
      >
        <div className="max-w-[620px] text-white">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/85 sm:text-xs">
            {content.eyebrow}
          </p>

          <h1
            id="voylme-hero-title"
            className="max-w-[590px] text-[36px] font-black leading-[1.08] tracking-[-0.03em] sm:text-[48px] lg:text-[58px]"
          >
            {content.title}
          </h1>

          <p className="mt-5 max-w-[520px] text-[16px] font-medium leading-7 text-white/90 sm:text-[18px]">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

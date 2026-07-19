import Image from "next/image";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type WhyVoylmeProps = {
  language: V3Language;
};

const benefits = [
  {
    key: "compare",
    icon: "/assets/icons/search/icon-search.png",
    titleEn: "Compare smarter",
    titleAr: "قارن بشكل أذكى",
    descriptionEn:
      "Compare trusted travel options clearly and choose what suits you best.",
    descriptionAr:
      "قارن بين خيارات السفر الموثوقة بوضوح واختر الأنسب لك.",
  },
  {
    key: "trusted",
    icon: "/assets/icons/status/icon-check.png",
    titleEn: "Trusted partners",
    titleAr: "شركاء موثوقون",
    descriptionEn:
      "Search offers from reliable airlines, hotels and travel providers.",
    descriptionAr:
      "ابحث بين عروض شركات الطيران والفنادق ومزودي السفر الموثوقين.",
  },
  {
    key: "transparent",
    icon: "/assets/icons/status/icon-info.png",
    titleEn: "Clear pricing",
    titleAr: "أسعار واضحة",
    descriptionEn:
      "See prices and key details clearly before continuing to book.",
    descriptionAr:
      "اطلع على الأسعار والتفاصيل المهمة بوضوح قبل متابعة الحجز.",
  },
  {
    key: "support",
    icon: "/assets/icons/account/icon-support.png",
    titleEn: "Travel support",
    titleAr: "دعم السفر",
    descriptionEn:
      "Get helpful guidance throughout your search and travel journey.",
    descriptionAr:
      "احصل على المساعدة والإرشاد خلال البحث ورحلة السفر.",
  },
];

export default function WhyVoylme({
  language,
}: WhyVoylmeProps) {
  const content = homepageContent[language].whyVoylme;
  const isArabic = language === "ar";

  return (
    <section
      className="bg-white px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="why-voylme-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className={isArabic ? "text-right" : "text-left"}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#660033]">
            {content.eyebrow}
          </p>

          <h2
            id="why-voylme-title"
            className="mt-3 max-w-2xl text-3xl font-black leading-tight text-[#660033] sm:text-4xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.key}
              className="rounded-[24px] border border-[#660033]/10 bg-[#faf7f8] p-6 shadow-[0_10px_30px_rgba(102,0,51,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#660033]/20 hover:shadow-[0_16px_36px_rgba(102,0,51,0.10)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Image
                  src={benefit.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#660033]">
                {isArabic ? benefit.titleAr : benefit.titleEn}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {isArabic
                  ? benefit.descriptionAr
                  : benefit.descriptionEn}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

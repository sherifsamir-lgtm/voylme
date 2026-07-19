import Link from "next/link";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type PopularDestinationsProps = {
  language: V3Language;
};

const destinations = [
  {
    code: "DXB",
    cityEn: "Dubai",
    cityAr: "دبي",
    countryEn: "United Arab Emirates",
    countryAr: "الإمارات العربية المتحدة",
    priceEn: "From AED 399",
    priceAr: "ابتداءً من 399 درهم",
    gradient: "from-[#3f001f] via-[#7b003d] to-[#d4af37]",
  },
  {
    code: "IST",
    cityEn: "Istanbul",
    cityAr: "إسطنبول",
    countryEn: "Türkiye",
    countryAr: "تركيا",
    priceEn: "From AED 699",
    priceAr: "ابتداءً من 699 درهم",
    gradient: "from-[#172554] via-[#1d4ed8] to-[#f59e0b]",
  },
  {
    code: "LHR",
    cityEn: "London",
    cityAr: "لندن",
    countryEn: "United Kingdom",
    countryAr: "المملكة المتحدة",
    priceEn: "From AED 1,499",
    priceAr: "ابتداءً من 1,499 درهم",
    gradient: "from-[#111827] via-[#374151] to-[#9ca3af]",
  },
  {
    code: "CAI",
    cityEn: "Cairo",
    cityAr: "القاهرة",
    countryEn: "Egypt",
    countryAr: "مصر",
    priceEn: "From AED 449",
    priceAr: "ابتداءً من 449 درهم",
    gradient: "from-[#78350f] via-[#d97706] to-[#fde68a]",
  },
  {
    code: "MLE",
    cityEn: "Maldives",
    cityAr: "المالديف",
    countryEn: "Maldives",
    countryAr: "المالديف",
    priceEn: "From AED 1,799",
    priceAr: "ابتداءً من 1,799 درهم",
    gradient: "from-[#164e63] via-[#0891b2] to-[#67e8f9]",
  },
  {
    code: "CDG",
    cityEn: "Paris",
    cityAr: "باريس",
    countryEn: "France",
    countryAr: "فرنسا",
    priceEn: "From AED 1,299",
    priceAr: "ابتداءً من 1,299 درهم",
    gradient: "from-[#4c1d95] via-[#7e22ce] to-[#f0abfc]",
  },
] as const;

export default function PopularDestinations({
  language,
}: PopularDestinationsProps) {
  const content = homepageContent[language].destinations;
  const isArabic = language === "ar";

  return (
    <section
      className="bg-[#faf7f8] px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="popular-destinations-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className={isArabic ? "text-right" : "text-left"}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#660033]">
            {content.eyebrow}
          </p>

          <h2
            id="popular-destinations-title"
            className="mt-3 text-3xl font-black leading-tight text-[#660033] sm:text-4xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {destinations.map((destination) => (
            <Link
              key={destination.code}
              href={`/flights/results?to=${destination.code}`}
              className={`group relative isolate min-h-[230px] overflow-hidden rounded-[24px] bg-gradient-to-br ${destination.gradient} p-5 text-white shadow-[0_14px_34px_rgba(35,0,18,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(35,0,18,0.22)] sm:min-h-[280px] sm:p-6`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-white/10"
                aria-hidden="true"
              />

              <div className="relative z-10 flex h-full min-h-[190px] flex-col justify-between sm:min-h-[232px]">
                <span className="w-fit rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-black tracking-[0.16em] backdrop-blur-sm">
                  {destination.code}
                </span>

                <div>
                  <h3 className="text-2xl font-black sm:text-3xl">
                    {isArabic
                      ? destination.cityAr
                      : destination.cityEn}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-white/80">
                    {isArabic
                      ? destination.countryAr
                      : destination.countryEn}
                  </p>

                  <p className="mt-4 text-sm font-extrabold text-white">
                    {isArabic
                      ? destination.priceAr
                      : destination.priceEn}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

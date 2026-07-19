import Image from "next/image";
import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type OffersProps = {
  language: V3Language;
};

const offers = [
  {
    cityEn: "Dubai",
    cityAr: "دبي",
    countryEn: "United Arab Emirates",
    countryAr: "الإمارات العربية المتحدة",
    price: "AED 399",
    image: "/images/hero-bg-clean-v2.png",
    discount: "-20%",
  },
  {
    cityEn: "Istanbul",
    cityAr: "إسطنبول",
    countryEn: "Turkey",
    countryAr: "تركيا",
    price: "AED 699",
    image: "/images/hero-bg-clean-v2.png",
    discount: "-15%",
  },
  {
    cityEn: "London",
    cityAr: "لندن",
    countryEn: "United Kingdom",
    countryAr: "المملكة المتحدة",
    price: "AED 1499",
    image: "/images/hero-bg-clean-v2.png",
    discount: "-10%",
  },
];

export default function Offers({ language }: OffersProps) {
  const t = homepageContent[language].featuredOffers;
  const ar = language === "ar";

  return (
    <section className="bg-[#faf7f8] px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#660033]">
          {t.eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-black text-[#660033]">
          {t.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.cityEn}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <div className="relative h-56">
                <Image
                  src={offer.image}
                  alt={offer.cityEn}
                  fill
                  className="object-cover"
                />

                <div className="absolute right-4 top-4 rounded-full bg-[#660033] px-3 py-1 text-sm font-bold text-white">
                  {offer.discount}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#660033]">
                  {ar ? offer.cityAr : offer.cityEn}
                </h3>

                <p className="mt-1 text-gray-500">
                  {ar ? offer.countryAr : offer.countryEn}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase text-gray-400">
                      {ar ? "يبدأ من" : "Starting from"}
                    </div>

                    <div className="text-2xl font-black text-[#660033]">
                      {offer.price}
                    </div>
                  </div>

                  <button className="rounded-2xl bg-[#660033] px-5 py-3 font-bold text-white transition hover:bg-[#4f0028]">
                    {ar ? "احجز الآن" : "Book Now"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

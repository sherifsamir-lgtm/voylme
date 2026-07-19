import Image from "next/image";
import Link from "next/link";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type ServicesProps = {
  language: V3Language;
};

const services = [
  {
    key: "flights",
    href: "/search",
    image: "/assets/home/services/images/service-flights.png",
    button: {
      en: "/assets/home/services/buttons/en/button-flights-en.png",
      ar: "/assets/home/services/buttons/ar/button-flights-ar.png",
    },
  },
  {
    key: "hotels",
    href: "#",
    image: "/assets/home/services/images/service-hotels.png",
    button: {
      en: "/assets/home/services/buttons/en/button-hotels-en.png",
      ar: "/assets/home/services/buttons/ar/button-hotels-ar.png",
    },
  },
  {
    key: "cars",
    href: "#",
    image: "/assets/home/services/images/service-cars.png",
    button: {
      en: "/assets/home/services/buttons/en/button-cars-en.png",
      ar: "/assets/home/services/buttons/ar/button-cars-ar.png",
    },
  },
  {
    key: "activities",
    href: "#",
    image: "/assets/home/services/images/service-activities.jpeg",
    button: {
      en: "/assets/home/services/buttons/en/button-activities-en.png",
      ar: "/assets/home/services/buttons/ar/button-activities-ar.png",
    },
  },
  {
    key: "insurance",
    href: "#",
    image: "/assets/home/services/images/service-insurance.png",
    button: {
      en: "/assets/home/services/buttons/en/button-insurance-en.png",
      ar: "/assets/home/services/buttons/ar/button-insurance-ar.png",
    },
  },
  {
    key: "yachts",
    href: "#",
    image: "/assets/home/services/images/service-yachts.png",
    button: {
      en: "/assets/home/services/buttons/en/button-yachts-en.png",
      ar: "/assets/home/services/buttons/ar/button-yachts-ar.png",
    },
  },
] as const;

export default function Services({
  language,
}: ServicesProps) {
  const content = homepageContent[language].services;

  return (
    <section
      className="bg-white px-5 py-14 sm:px-8 sm:py-16"
      aria-labelledby="voylme-services-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className={language === "ar" ? "text-right" : "text-left"}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#660033]">
            {content.eyebrow}
          </p>

          <h2
            id="voylme-services-title"
            className="mt-3 text-3xl font-black leading-tight text-[#660033] sm:text-4xl"
          >
            {content.title}
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-gray-600 sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {services.map((service) => {
            const label = content[service.key];

            return (
              <Link
                key={service.key}
                href={service.href}
                aria-label={label}
                className="group relative isolate aspect-[4/5] overflow-hidden rounded-[22px] bg-gray-100 shadow-[0_10px_30px_rgba(102,0,51,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(102,0,51,0.18)]"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-3 bottom-3">
                  <div className="relative mx-auto h-11 w-full max-w-[190px]">
                    <Image
                      src={service.button[language]}
                      alt={label}
                      fill
                      sizes="190px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

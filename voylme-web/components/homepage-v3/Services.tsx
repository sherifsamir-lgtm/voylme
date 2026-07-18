"use client";

import Image from "next/image";
import type { V3Language } from "./content";

type ServicesProps = {
  language: V3Language;
};

const SERVICES = [
  {
    id: "flights",
    image: "/assets/home/services/images/service-flights.png",
  },
  {
    id: "hotels",
    image: "/assets/home/services/images/service-hotels.png",
  },
  {
    id: "cars",
    image: "/assets/home/services/images/service-cars.png",
  },
  {
    id: "activities",
    image: "/assets/home/services/images/service-activities.jpeg",
  },
  {
    id: "insurance",
    image: "/assets/home/services/images/service-insurance.png",
  },
  {
    id: "yachts",
    image: "/assets/home/services/images/service-yachts.png",
  },
] as const;

export default function Services({ language }: ServicesProps) {
  return (
    <section
      aria-label={language === "ar" ? "خدمات السفر" : "Travel services"}
      className="w-full bg-white px-4 py-5"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="mx-auto grid w-full max-w-[430px] grid-cols-2 gap-3">
        {SERVICES.map((service) => {
          const buttonImage =
            `/assets/home/services/buttons/${language}/` +
            `button-${service.id}-${language}.png`;

          return (
            <button
              key={service.id}
              type="button"
              className="group relative aspect-[1.28/1] w-full overflow-hidden rounded-[18px] bg-[#f5f5f5] shadow-[0_4px_14px_rgba(0,0,0,0.09)] transition-transform duration-200 active:scale-[0.98]"
              aria-label={service.id}
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 430px) 50vw, 205px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute inset-x-3 bottom-3">
                <div className="relative mx-auto h-[36px] w-full">
                  <Image
                    src={buttonImage}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

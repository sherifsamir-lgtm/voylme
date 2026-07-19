"use client";

import Image from "next/image";
import { useState } from "react";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type ServicesProps = {
  language: V3Language;
};

type ServiceKey =
  | "flights"
  | "hotels"
  | "cars"
  | "activities"
  | "insurance"
  | "yachts";

const services: {
  key: ServiceKey;
  image: string;
  button: {
    en: string;
    ar: string;
  };
}[] = [
  {
    key: "flights",
    image: "/assets/home/services/images/service-flights.png",
    button: {
      en: "/assets/home/services/buttons/en/button-flights-en.png",
      ar: "/assets/home/services/buttons/ar/button-flights-ar.png",
    },
  },
  {
    key: "hotels",
    image: "/assets/home/services/images/service-hotels.png",
    button: {
      en: "/assets/home/services/buttons/en/button-hotels-en.png",
      ar: "/assets/home/services/buttons/ar/button-hotels-ar.png",
    },
  },
  {
    key: "cars",
    image: "/assets/home/services/images/service-cars.png",
    button: {
      en: "/assets/home/services/buttons/en/button-cars-en.png",
      ar: "/assets/home/services/buttons/ar/button-cars-ar.png",
    },
  },
  {
    key: "activities",
    image: "/assets/home/services/images/service-activities.jpeg",
    button: {
      en: "/assets/home/services/buttons/en/button-activities-en.png",
      ar: "/assets/home/services/buttons/ar/button-activities-ar.png",
    },
  },
  {
    key: "insurance",
    image: "/assets/home/services/images/service-insurance.png",
    button: {
      en: "/assets/home/services/buttons/en/button-insurance-en.png",
      ar: "/assets/home/services/buttons/ar/button-insurance-ar.png",
    },
  },
  {
    key: "yachts",
    image: "/assets/home/services/images/service-yachts.png",
    button: {
      en: "/assets/home/services/buttons/en/button-yachts-en.png",
      ar: "/assets/home/services/buttons/ar/button-yachts-ar.png",
    },
  },
];

export default function Services({
  language,
}: ServicesProps) {
  const [activeService, setActiveService] =
    useState<ServiceKey>("flights");

  const content = homepageContent[language].services;

  const selectedService =
    services.find(
      (service) => service.key === activeService,
    ) ?? services[0];

  const selectedLabel = content[selectedService.key];

  return (
    <section
      className="relative bg-white"
      aria-labelledby="voylme-services-title"
    >
      <div className="relative isolate min-h-[570px] overflow-hidden sm:min-h-[650px] lg:min-h-[720px]">
        <Image
          key={selectedService.image}
          src={selectedService.image}
          alt={selectedLabel}
          fill
          priority={activeService === "flights"}
          sizes="100vw"
          className="object-cover transition-opacity duration-500"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/70"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[570px] max-w-7xl flex-col justify-between px-4 pb-7 pt-8 sm:min-h-[650px] sm:px-8 sm:pb-10 lg:min-h-[720px] lg:px-10">
          <div
            className={
              language === "ar"
                ? "ml-auto max-w-2xl text-right"
                : "max-w-2xl text-left"
            }
          >
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/90">
              {content.eyebrow}
            </p>

            <h1
              id="voylme-services-title"
              className="mt-3 text-3xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl"
            >
              {selectedLabel}
            </h1>

            <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/90 drop-shadow sm:text-base">
              {content.description}
            </p>
          </div>

          <div className="rounded-[26px] border border-white/25 bg-black/20 p-2.5 shadow-2xl backdrop-blur-md sm:p-3">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
              {services.map((service) => {
                const isActive =
                  service.key === activeService;

                const label = content[service.key];

                return (
                  <button
                    key={service.key}
                    type="button"
                    aria-label={label}
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveService(service.key)
                    }
                    className={`relative flex min-h-[62px] items-center justify-center overflow-hidden rounded-[18px] border px-2 py-2 transition duration-300 ${
                      isActive
                        ? "scale-[1.03] border-[#D4AF37] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                        : "border-white/30 bg-white/90 hover:-translate-y-0.5 hover:bg-white"
                    }`}
                  >
                    <div className="relative h-10 w-full max-w-[170px]">
                      <Image
                        src={service.button[language]}
                        alt={label}
                        fill
                        sizes="170px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

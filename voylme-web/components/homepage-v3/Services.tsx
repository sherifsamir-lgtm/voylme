"use client";

import {
  Binoculars,
  CarFront,
  Hotel,
  PlaneTakeoff,
  ShieldCheck,
  ShipWheel,
} from "lucide-react";

import { V3_COPY, type V3Language } from "./content";

type Props = {
  language: V3Language;
};

export default function Services({ language }: Props) {
  const copy = V3_COPY[language];

  const services = [
    {
      key: "flights",
      label: copy.services.flights,
      icon: PlaneTakeoff,
      href: "/search",
      active: true,
    },
    {
      key: "hotels",
      label: copy.services.hotels,
      icon: Hotel,
      href: "#",
      active: false,
    },
    {
      key: "cars",
      label: copy.services.cars,
      icon: CarFront,
      href: "#",
      active: false,
    },
    {
      key: "activities",
      label: copy.services.activities,
      icon: Binoculars,
      href: "#",
      active: false,
    },
    {
      key: "insurance",
      label: copy.services.insurance,
      icon: ShieldCheck,
      href: "#",
      active: false,
    },
    {
      key: "yachts",
      label: copy.services.yachts,
      icon: ShipWheel,
      href: "#",
      active: false,
    },
  ] as const;

  return (
    <section
      className="v3-services-section"
      dir={copy.direction}
      aria-label={
        language === "ar"
          ? "خدمات السفر"
          : "Travel services"
      }
    >
      <div className="v3-services-grid">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <a
              key={service.key}
              href={service.href}
              className={
                service.active
                  ? "v3-service-card v3-service-card-active"
                  : "v3-service-card"
              }
              aria-label={service.label}
              onClick={(event) => {
                if (!service.active) {
                  event.preventDefault();
                }
              }}
            >
              <span className="v3-service-icon">
                <Icon size={27} strokeWidth={2} />
              </span>

              <span className="v3-service-label">
                {service.label}
              </span>

              {!service.active && (
                <small className="v3-service-coming">
                  {language === "ar"
                    ? "قريبًا"
                    : "Soon"}
                </small>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}

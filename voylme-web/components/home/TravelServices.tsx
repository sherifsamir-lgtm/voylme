"use client";

import {
  Car,
  FileCheck2,
  Hotel,
  Plane,
  Ship,
  Ticket,
} from "lucide-react";

const services = [
  {
    label: "Flights",
    icon: Plane,
    active: true,
  },
  {
    label: "Hotels",
    icon: Hotel,
    active: false,
  },
  {
    label: "Cars",
    icon: Car,
    active: false,
  },
  {
    label: "Activities",
    icon: Ticket,
    active: false,
  },
  {
    label: "Yachts",
    icon: Ship,
    active: false,
  },
  {
    label: "Visa",
    icon: FileCheck2,
    active: false,
  },
];

export default function TravelServices() {
  return (
    <section
      aria-label="Travel services"
      className="home-services"
    >
      <div className="home-services-card">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.label}
              type="button"
              disabled={!service.active}
              aria-current={
                service.active
                  ? "page"
                  : undefined
              }
              className={
                service.active
                  ? "service-button service-button-active"
                  : "service-button"
              }
            >
              <Icon
                size={16}
                strokeWidth={2.2}
              />

              <span>{service.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

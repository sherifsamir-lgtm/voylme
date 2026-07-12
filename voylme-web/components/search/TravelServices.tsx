"use client";

import {
  BriefcaseBusiness,
  Car,
  Hotel,
  Plane,
  Ticket,
} from "lucide-react";

const services = [
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    active: true,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
    active: false,
  },
  {
    id: "packages",
    label: "Flight + Hotel",
    icon: BriefcaseBusiness,
    active: false,
  },
  {
    id: "cars",
    label: "Cars",
    icon: Car,
    active: false,
  },
  {
    id: "activities",
    label: "Activities",
    icon: Ticket,
    active: false,
  },
];

export default function TravelServices() {
  return (
    <nav
      aria-label="Travel services"
      className="relative z-30 mx-auto w-full max-w-[430px] px-3"
    >
      <div className="grid grid-cols-5 gap-1.5 rounded-[22px] bg-white p-2 shadow-[0_10px_30px_rgba(65,0,32,0.16)]">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.id}
              type="button"
              className={`flex h-[62px] min-w-0 flex-col items-center justify-center rounded-[15px] px-1 transition ${
                service.active
                  ? "bg-[#660033] text-white shadow-sm"
                  : "bg-[#f8f4f6] text-[#660033]"
              }`}
            >
              <Icon size={19} strokeWidth={2.2} />

              <span
                className={`mt-1 text-center font-extrabold ${
                  service.id === "packages"
                    ? "text-[9px] leading-[10px]"
                    : "text-[10px]"
                }`}
              >
                {service.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

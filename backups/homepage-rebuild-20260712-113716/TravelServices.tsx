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
  { label: "Flights", icon: Plane, active: true },
  { label: "Hotels", icon: Hotel, active: false },
  { label: "Cars", icon: Car, active: false },
  { label: "Activities", icon: Ticket, active: false },
  { label: "Yachts", icon: Ship, active: false },
  { label: "Visa", icon: FileCheck2, active: false },
];

export default function TravelServices() {
  return (
    <section
      aria-label="Travel services"
      className="voylme-services px-3 pt-1.5"
    >
      <div className="grid grid-cols-3 gap-1.5 rounded-[18px] border border-[#660033]/5 bg-white p-2 shadow-sm">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.label}
              type="button"
              disabled={!service.active}
              aria-current={
                service.active ? "page" : undefined
              }
              className={`flex items-center justify-center gap-1.5 rounded-[12px] border text-[10px] font-extrabold ${
                service.active
                  ? "border-[#660033] bg-[#660033] text-white"
                  : "cursor-default border-[#660033]/15 bg-[#fffafb] text-[#660033]/75"
              }`}
            >
              <Icon size={15} strokeWidth={2.2} />
              {service.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

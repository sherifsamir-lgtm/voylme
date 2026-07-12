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
  { label: "Hotels", icon: Hotel },
  { label: "Cars", icon: Car },
  { label: "Activities", icon: Ticket },
  { label: "Yachts", icon: Ship },
  { label: "Visa", icon: FileCheck2 },
];

export default function TravelServices() {
  return (
    <section className="px-3 pt-2">
      <div className="grid grid-cols-3 gap-1.5 rounded-[18px] bg-white p-2 shadow-sm">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.label}
              type="button"
              className={`flex h-[40px] items-center justify-center gap-1.5 rounded-[12px] border text-[10px] font-extrabold ${
                service.active
                  ? "border-[#660033] bg-[#660033] text-white"
                  : "border-[#660033]/20 bg-white text-[#660033]"
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

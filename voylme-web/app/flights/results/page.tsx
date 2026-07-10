"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  SlidersHorizontal,
  Plane,
  Clock3,
  Luggage,
  ChevronDown,
} from "lucide-react";

type SortOption = "best" | "cheapest" | "fastest";

type Flight = {
  id: number;
  airline: string;
  code: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  stops: string;
  baggage: string;
  price: number;
  recommended?: boolean;
};

const flights: Flight[] = [
  {
    id: 1,
    airline: "Emirates",
    code: "EK 927",
    departureTime: "08:15",
    arrivalTime: "10:25",
    from: "DXB",
    to: "CAI",
    duration: "4h 10m",
    stops: "Direct",
    baggage: "25 kg",
    price: 1245,
    recommended: true,
  },
  {
    id: 2,
    airline: "EgyptAir",
    code: "MS 911",
    departureTime: "11:30",
    arrivalTime: "13:50",
    from: "DXB",
    to: "CAI",
    duration: "4h 20m",
    stops: "Direct",
    baggage: "23 kg",
    price: 1095,
  },
  {
    id: 3,
    airline: "Qatar Airways",
    code: "QR 1007",
    departureTime: "14:10",
    arrivalTime: "18:45",
    from: "DXB",
    to: "CAI",
    duration: "6h 35m",
    stops: "1 stop",
    baggage: "25 kg",
    price: 1180,
  },
  {
    id: 4,
    airline: "Etihad Airways",
    code: "EY 655",
    departureTime: "18:25",
    arrivalTime: "20:40",
    from: "AUH",
    to: "CAI",
    duration: "4h 15m",
    stops: "Direct",
    baggage: "23 kg",
    price: 1320,
  },
];

export default function FlightResultsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("best");
  const [showFilters, setShowFilters] = useState(false);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "cheapest") {
      return a.price - b.price;
    }

    if (sortBy === "fastest") {
      return (
        Number.parseInt(a.duration) -
        Number.parseInt(b.duration)
      );
    }

    return Number(b.recommended) - Number(a.recommended);
  });

  return (
    <main className="min-h-screen bg-[#f7f5f6] pb-8">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[68px] w-full max-w-[430px] items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#660033]/20 text-[#660033]"
          >
            <ArrowLeft size={21} />
          </Link>

          <div className="text-center">
            <h1 className="text-[18px] font-extrabold text-[#660033]">
              Flight Results
            </h1>

            <p className="text-[11px] text-gray-500">
              Dubai to Cairo
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            aria-label="Open filters"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#660033] text-white"
          >
            <SlidersHorizontal size={19} />
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] px-4 pt-4">
        <section className="rounded-[22px] bg-[#660033] p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/75">
                Your search
              </p>

              <p className="mt-1 text-[16px] font-bold">
                DXB → CAI
              </p>

              <p className="mt-1 text-[11px] text-white/80">
                12 Aug · 1 passenger · Economy
              </p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-white/40 px-4 py-2 text-[12px] font-bold"
            >
              Edit
            </Link>
          </div>
        </section>

        {showFilters && (
          <section className="mt-3 rounded-[20px] border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#660033]">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="text-[12px] font-semibold text-gray-500"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-[14px] border border-[#660033]/25 px-3 py-3 text-left text-[12px] font-semibold text-[#660033]"
              >
                Direct flights
              </button>

              <button
                type="button"
                className="rounded-[14px] border border-[#660033]/25 px-3 py-3 text-left text-[12px] font-semibold text-[#660033]"
              >
                Baggage included
              </button>

              <button
                type="button"
                className="rounded-[14px] border border-[#660033]/25 px-3 py-3 text-left text-[12px] font-semibold text-[#660033]"
              >
                Morning flights
              </button>

              <button
                type="button"
                className="rounded-[14px] border border-[#660033]/25 px-3 py-3 text-left text-[12px] font-semibold text-[#660033]"
              >
                Under AED 1,300
              </button>
            </div>
          </section>
        )}

        <section className="mt-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSortBy("best")}
            className={[
              "rounded-[16px] border px-2 py-3 text-center transition",
              sortBy === "best"
                ? "border-[#660033] bg-[#660033] text-white"
                : "border-gray-200 bg-white text-[#660033]",
            ].join(" ")}
          >
            <span className="block text-[12px] font-bold">
              Best
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSortBy("cheapest")}
            className={[
              "rounded-[16px] border px-2 py-3 text-center transition",
              sortBy === "cheapest"
                ? "border-[#660033] bg-[#660033] text-white"
                : "border-gray-200 bg-white text-[#660033]",
            ].join(" ")}
          >
            <span className="block text-[12px] font-bold">
              Cheapest
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSortBy("fastest")}
            className={[
              "rounded-[16px] border px-2 py-3 text-center transition",
              sortBy === "fastest"
                ? "border-[#660033] bg-[#660033] text-white"
                : "border-gray-200 bg-white text-[#660033]",
            ].join(" ")}
          >
            <span className="block text-[12px] font-bold">
              Fastest
            </span>
          </button>
        </section>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[13px] font-bold text-slate-800">
            {sortedFlights.length} flights found
          </p>

          <button
            type="button"
            className="flex items-center gap-1 text-[12px] font-semibold text-[#660033]"
          >
            Recommended
            <ChevronDown size={15} />
          </button>
        </div>

        <section className="mt-3 space-y-3">
          {sortedFlights.map((flight) => (
            <article
              key={flight.id}
              className="overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-sm"
            >
              {flight.recommended && (
                <div className="bg-[#660033] px-4 py-1.5 text-[10px] font-bold text-white">
                  Recommended
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#660033]/10 text-[#660033]">
                      <Plane size={21} />
                    </div>

                    <div>
                      <h2 className="text-[14px] font-bold text-slate-900">
                        {flight.airline}
                      </h2>

                      <p className="text-[11px] text-gray-500">
                        {flight.code}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-500">
                      From
                    </p>

                    <p className="text-[20px] font-black text-[#660033]">
                      AED {flight.price}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div>
                    <p className="text-[22px] font-extrabold text-slate-900">
                      {flight.departureTime}
                    </p>

                    <p className="text-[12px] font-bold text-gray-500">
                      {flight.from}
                    </p>
                  </div>

                  <div className="min-w-[110px] text-center">
                    <p className="mb-1 text-[10px] text-gray-500">
                      {flight.duration}
                    </p>

                    <div className="relative h-[1px] bg-gray-300">
                      <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-[#660033]" />
                      <Plane
                        size={13}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#660033]"
                      />
                      <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-[#660033]" />
                    </div>

                    <p className="mt-1 text-[10px] font-semibold text-[#660033]">
                      {flight.stops}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[22px] font-extrabold text-slate-900">
                      {flight.arrivalTime}
                    </p>

                    <p className="text-[12px] font-bold text-gray-500">
                      {flight.to}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock3 size={14} className="text-[#660033]" />
                    {flight.duration}
                  </span>

                  <span className="flex items-center gap-1">
                    <Luggage size={14} className="text-[#660033]" />
                    {flight.baggage}
                  </span>
                </div>

                <Link
                  href={`/flights/results/${flight.id}`}
                  className="mt-4 flex h-[48px] w-full items-center justify-center rounded-full bg-[#660033] text-[14px] font-bold text-white"
                >
                  Select Flight
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

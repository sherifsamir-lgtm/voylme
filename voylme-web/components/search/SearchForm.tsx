"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Plane,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { airports, type Airport } from "./airports";

type TripType = "round-trip" | "one-way";

function dateAfter(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function label(airport: Airport | null) {
  return airport ? `${airport.city} (${airport.code})` : "";
}

export default function SearchForm() {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const [departureDate, setDepartureDate] = useState(dateAfter(7));
  const [returnDate, setReturnDate] = useState(dateAfter(14));
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("voylme-flight-search");

      if (!stored) return;

      const saved = JSON.parse(stored);

      if (saved.fromAirport) {
        setFromAirport(saved.fromAirport);
        setFromQuery(label(saved.fromAirport));
      }

      if (saved.toAirport) {
        setToAirport(saved.toAirport);
        setToQuery(label(saved.toAirport));
      }

      if (saved.tripType) setTripType(saved.tripType);
      if (saved.departureDate) setDepartureDate(saved.departureDate);
      if (saved.returnDate) setReturnDate(saved.returnDate);
      if (saved.passengers?.adults) setPassengers(saved.passengers.adults);
      if (saved.cabinClass) setCabinClass(saved.cabinClass);
    } catch {
      localStorage.removeItem("voylme-flight-search");
    }
  }, []);

  const filteredAirports = airports
    .filter((airport) => {
      const query =
        activeField === "from"
          ? fromQuery.toLowerCase()
          : toQuery.toLowerCase();

      return [
        airport.city,
        airport.code,
        airport.country,
        airport.airport,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .slice(0, 5);

  function swap() {
    setFromAirport(toAirport);
    setFromQuery(label(toAirport));
    setToAirport(fromAirport);
    setToQuery(label(fromAirport));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fromAirport || !toAirport) return;

    const params = new URLSearchParams({
      tripType,
      from: fromAirport.code,
      fromCity: fromAirport.city,
      to: toAirport.code,
      toCity: toAirport.city,
      departureDate,
      adults: String(passengers),
      children: "0",
      infants: "0",
      cabinClass,
    });

    if (tripType === "round-trip") {
      params.set("returnDate", returnDate);
    }

    router.push(`/flights/results?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[18px] bg-white p-2.5 shadow-sm"
    >
      <div className="grid grid-cols-2 rounded-[13px] bg-[#f4f0f2] p-1">
        <button
          type="button"
          onClick={() => setTripType("round-trip")}
          className={`h-8 rounded-[10px] text-[11px] font-extrabold ${
            tripType === "round-trip"
              ? "bg-[#660033] text-white"
              : "text-gray-600"
          }`}
        >
          Round Trip
        </button>

        <button
          type="button"
          onClick={() => setTripType("one-way")}
          className={`h-8 rounded-[10px] text-[11px] font-extrabold ${
            tripType === "one-way"
              ? "bg-[#660033] text-white"
              : "text-gray-600"
          }`}
        >
          One Way
        </button>
      </div>

      <div className="relative mt-2 grid grid-cols-2 gap-2">
        <div className="relative">
          <Plane
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
          />

          <input
            value={fromQuery}
            placeholder="From"
            onFocus={() => setActiveField("from")}
            onChange={(event) => {
              setFromQuery(event.target.value);
              setFromAirport(null);
              setActiveField("from");
            }}
            className="h-11 w-full rounded-[13px] border border-gray-200 pl-9 pr-7 text-[12px] font-bold outline-none focus:border-[#660033]"
          />

          {fromQuery && (
            <button
              type="button"
              onClick={() => {
                setFromQuery("");
                setFromAirport(null);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="relative">
          <MapPin
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
          />

          <input
            value={toQuery}
            placeholder="To"
            onFocus={() => setActiveField("to")}
            onChange={(event) => {
              setToQuery(event.target.value);
              setToAirport(null);
              setActiveField("to");
            }}
            className="h-11 w-full rounded-[13px] border border-gray-200 pl-9 pr-7 text-[12px] font-bold outline-none focus:border-[#660033]"
          />

          {toQuery && (
            <button
              type="button"
              onClick={() => {
                setToQuery("");
                setToAirport(null);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={swap}
          className="absolute left-1/2 top-1/2 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#660033] text-white shadow"
        >
          <ArrowLeftRight size={14} />
        </button>

        {activeField && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[175px] overflow-y-auto rounded-[14px] border border-gray-200 bg-white p-1.5 shadow-xl">
            {filteredAirports.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => {
                  if (activeField === "from") {
                    setFromAirport(airport);
                    setFromQuery(label(airport));
                  } else {
                    setToAirport(airport);
                    setToQuery(label(airport));
                  }

                  setActiveField(null);
                }}
                className="flex w-full items-center gap-2 rounded-[10px] px-2 py-2 text-left active:bg-gray-100"
              >
                <span className="text-base">{airport.flag}</span>

                <span className="flex h-7 w-10 items-center justify-center rounded-lg bg-[#fff0f6] text-[10px] font-black text-[#660033]">
                  {airport.code}
                </span>

                <span className="min-w-0 flex-1 truncate text-[11px] font-bold">
                  {airport.city}, {airport.country}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="relative flex h-11 items-center gap-2 rounded-[13px] border border-gray-200 px-3">
          <CalendarDays size={16} className="text-[#660033]" />

          <input
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[10px] font-bold outline-none"
          />
        </label>

        {tripType === "round-trip" ? (
          <label className="relative flex h-11 items-center gap-2 rounded-[13px] border border-gray-200 px-3">
            <CalendarDays size={16} className="text-[#660033]" />

            <input
              type="date"
              value={returnDate}
              min={departureDate}
              onChange={(event) => setReturnDate(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[10px] font-bold outline-none"
            />
          </label>
        ) : (
          <div className="flex h-11 items-center justify-center rounded-[13px] border border-dashed border-gray-200 text-[10px] text-gray-400">
            One-way flight
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="flex h-11 items-center gap-2 rounded-[13px] border border-gray-200 px-3">
          <UsersRound size={16} className="text-[#660033]" />

          <select
            value={passengers}
            onChange={(event) => setPassengers(Number(event.target.value))}
            className="min-w-0 flex-1 bg-transparent text-[11px] font-bold outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </label>

        <label className="flex h-11 items-center gap-2 rounded-[13px] border border-gray-200 px-3">
          <Plane size={16} className="text-[#660033]" />

          <select
            value={cabinClass}
            onChange={(event) => setCabinClass(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[11px] font-bold outline-none"
          >
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>

          <ChevronDown size={14} className="text-gray-400" />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-[#660033] text-[14px] font-extrabold text-white shadow"
      >
        <Search size={17} />
        Search Flights
      </button>
    </form>
  );
}

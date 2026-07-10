"use client";

import { useState } from "react";
import type {
  ComponentType,
  FormEvent,
  ReactNode,
} from "react";

import {
  PlaneTakeoff,
  Hotel,
  CarFront,
  Ticket,
  Sailboat,
} from "lucide-react";

type ServiceId =
  | "flights"
  | "hotels"
  | "cars"
  | "activities"
  | "yachts";

type TripType =
  | "round-trip"
  | "one-way"
  | "multi-city";

type IconType = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type Service = {
  id: ServiceId;
  label: string;
  icon: IconType;
};

const services: Service[] = [
  {
    id: "flights",
    label: "Flights",
    icon: PlaneTakeoff,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
  },
  {
    id: "cars",
    label: "Cars",
    icon: CarFront,
  },
  {
    id: "activities",
    label: "Activities",
    icon: Ticket,
  },
  {
    id: "yachts",
    label: "Yachts",
    icon: Sailboat,
  },
];

const inputClass =
  "h-[42px] w-full min-w-0 rounded-[14px] border border-[#660033]/65 bg-white px-4 text-[14px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10";

type FormShellProps = {
  children: ReactNode;
  buttonText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function FormShell({
  children,
  buttonText,
  onSubmit,
}: FormShellProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid h-full grid-rows-[repeat(4,42px)_46px] gap-1.5"
    >
      {children}

      <button
        type="submit"
        className="h-[46px] w-full rounded-full bg-[#660033] text-[15px] font-bold text-white shadow-md transition active:scale-[0.98]"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default function SearchForm() {
  const [activeService, setActiveService] =
    useState<ServiceId>("flights");

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const submitForm = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const renderServiceTab = (
    service: Service
  ) => {
    const Icon = service.icon;
    const isActive =
      activeService === service.id;

    return (
      <button
        key={service.id}
        type="button"
        onClick={() =>
          setActiveService(service.id)
        }
        aria-pressed={isActive}
        className={[
          "flex h-[44px] min-w-0 items-center justify-center gap-1.5 rounded-full border px-2 text-[13px] font-bold transition active:scale-[0.98]",
          isActive
            ? "border-[#660033] bg-[#660033] text-white shadow-sm"
            : "border-[#660033]/40 bg-white text-[#660033]",
        ].join(" ")}
      >
        <Icon
          size={19}
          strokeWidth={2.2}
          className="shrink-0"
        />

        <span className="truncate">
          {service.label}
        </span>
      </button>
    );
  };

  const tripButtonClass = (
    type: TripType
  ) =>
    [
      "h-[34px] rounded-[11px] px-1 text-[11px] font-bold transition",
      tripType === type
        ? "bg-[#660033] text-white shadow-sm"
        : "text-[#660033]",
    ].join(" ");

  return (
    <section className="mt-2 flex h-[354px] shrink-0 flex-col rounded-[23px] border border-gray-200 bg-white p-2 shadow-md">
      <div className="shrink-0">
        <div className="grid grid-cols-3 gap-1.5">
          {services
            .slice(0, 3)
            .map(renderServiceTab)}
        </div>

        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {services
            .slice(3)
            .map(renderServiceTab)}
        </div>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        {activeService === "flights" && (
          <FormShell
            buttonText="Search Flights"
            onSubmit={submitForm}
          >
            <div className="grid h-[42px] grid-cols-3 gap-1 rounded-[14px] bg-gray-50 p-1">
              <button
                type="button"
                onClick={() =>
                  setTripType("round-trip")
                }
                className={tripButtonClass(
                  "round-trip"
                )}
              >
                Round trip
              </button>

              <button
                type="button"
                onClick={() =>
                  setTripType("one-way")
                }
                className={tripButtonClass(
                  "one-way"
                )}
              >
                One way
              </button>

              <button
                type="button"
                onClick={() =>
                  setTripType("multi-city")
                }
                className={tripButtonClass(
                  "multi-city"
                )}
              >
                Multi-city
              </button>
            </div>

            {tripType !== "multi-city" ? (
              <>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="From"
                    aria-label="Departure airport"
                  />

                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Destination"
                    aria-label="Destination airport"
                  />
                </div>

                <div
                  className={
                    tripType === "round-trip"
                      ? "grid grid-cols-2 gap-1.5"
                      : "grid grid-cols-1 gap-1.5"
                  }
                >
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Departure"
                    aria-label="Departure date"
                  />

                  {tripType ===
                    "round-trip" && (
                    <input
                      className={inputClass}
                      type="text"
                      placeholder="Return"
                      aria-label="Return date"
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="From"
                  />

                  <input
                    className={inputClass}
                    type="text"
                    placeholder="To"
                  />

                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Date"
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="From"
                  />

                  <input
                    className={inputClass}
                    type="text"
                    placeholder="To"
                  />

                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Date"
                  />
                </div>
              </>
            )}

            <input
              className={inputClass}
              type="text"
              placeholder="Passengers, cabin class"
              aria-label="Passengers and cabin class"
            />
          </FormShell>
        )}

        {activeService === "hotels" && (
          <FormShell
            buttonText="Search Hotels"
            onSubmit={submitForm}
          >
            <input
              className={inputClass}
              type="text"
              placeholder="Destination"
              aria-label="Hotel destination"
            />

            <div className="grid grid-cols-2 gap-1.5">
              <input
                className={inputClass}
                type="text"
                placeholder="Check-in"
                aria-label="Check-in date"
              />

              <input
                className={inputClass}
                type="text"
                placeholder="Check-out"
                aria-label="Check-out date"
              />
            </div>

            <input
              className={inputClass}
              type="text"
              placeholder="Guests and rooms"
              aria-label="Guests and rooms"
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Hotel type"
              aria-label="Hotel type"
            />
          </FormShell>
        )}

        {activeService === "cars" && (
          <FormShell
            buttonText="Search Cars"
            onSubmit={submitForm}
          >
            <input
              className={inputClass}
              type="text"
              placeholder="Pick-up location"
              aria-label="Pick-up location"
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Drop-off location"
              aria-label="Drop-off location"
            />

            <div className="grid grid-cols-2 gap-1.5">
              <input
                className={inputClass}
                type="text"
                placeholder="Pick-up"
                aria-label="Pick-up date"
              />

              <input
                className={inputClass}
                type="text"
                placeholder="Drop-off"
                aria-label="Drop-off date"
              />
            </div>

            <input
              className={inputClass}
              type="text"
              placeholder="Driver age"
              aria-label="Driver age"
            />
          </FormShell>
        )}

        {activeService ===
          "activities" && (
          <FormShell
            buttonText="Search Activities"
            onSubmit={submitForm}
          >
            <input
              className={inputClass}
              type="text"
              placeholder="Destination"
              aria-label="Activity destination"
            />

            <div className="grid grid-cols-2 gap-1.5">
              <input
                className={inputClass}
                type="text"
                placeholder="Date"
                aria-label="Activity date"
              />

              <input
                className={inputClass}
                type="text"
                placeholder="Travelers"
                aria-label="Travelers"
              />
            </div>

            <input
              className={inputClass}
              type="text"
              placeholder="Activity category"
              aria-label="Activity category"
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Preferred time"
              aria-label="Preferred time"
            />
          </FormShell>
        )}

        {activeService === "yachts" && (
          <FormShell
            buttonText="Search Yachts"
            onSubmit={submitForm}
          >
            <input
              className={inputClass}
              type="text"
              placeholder="Marina or city"
              aria-label="Marina or city"
            />

            <div className="grid grid-cols-2 gap-1.5">
              <input
                className={inputClass}
                type="text"
                placeholder="Date"
                aria-label="Yacht date"
              />

              <input
                className={inputClass}
                type="text"
                placeholder="Hours"
                aria-label="Booking duration"
              />
            </div>

            <input
              className={inputClass}
              type="text"
              placeholder="Guests"
              aria-label="Guests"
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Yacht type"
              aria-label="Yacht type"
            />
          </FormShell>
        )}
      </div>
    </section>
  );
}

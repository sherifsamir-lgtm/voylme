"use client";

import { useMemo, useState } from "react";
import { MapPin, Plane, Search, X } from "lucide-react";
import { airports, type Airport } from "./airports";

type AirportAutocompleteProps = {
  id: string;
  label: string;
  placeholder: string;
  type: "departure" | "arrival";
  value: Airport | null;
  query: string;
  excludedAirportCode?: string;
  error?: string;
  onQueryChange: (value: string) => void;
  onSelect: (airport: Airport) => void;
  onClear: () => void;
};

export default function AirportAutocomplete({
  id,
  label,
  placeholder,
  type,
  value,
  query,
  excludedAirportCode,
  error,
  onQueryChange,
  onSelect,
  onClear,
}: AirportAutocompleteProps) {
  const [open, setOpen] = useState(false);

  const filteredAirports = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    return airports
      .filter((airport) => airport.code !== excludedAirportCode)
      .filter((airport) => {
        if (!searchValue) return true;

        const searchableText = [
          airport.code,
          airport.city,
          airport.airport,
          airport.country,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchValue);
      })
      .slice(0, 10);
  }, [query, excludedAirportCode]);

  const Icon = type === "departure" ? Plane : MapPin;

  function handleSelect(airport: Airport) {
    onSelect(airport);
    setOpen(false);
  }

  function handleClear() {
    onClear();
    setOpen(true);
  }

  return (
    <div className="relative min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
      >
        {label}
      </label>

      <div
        className={`flex h-[68px] w-full min-w-0 items-center gap-3 rounded-[20px] border bg-white px-4 transition ${
          error
            ? "border-red-500"
            : open
              ? "border-[#660033]"
              : "border-gray-200"
        }`}
      >
        <Icon
          size={23}
          className="shrink-0 text-[#660033]"
        />

        <input
          id={id}
          type="text"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setOpen(true);
          }}
          className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:font-normal placeholder:text-gray-400"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={`Clear ${label}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 active:bg-gray-100"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Close airport list"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[340px] overflow-y-auto rounded-[22px] border border-gray-200 bg-white p-2 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <Search size={17} className="text-[#660033]" />

                <p className="text-sm font-extrabold text-[#660033]">
                  Select airport
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport) => {
                const selected = value?.code === airport.code;

                return (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSelect(airport)}
                    className={`flex w-full min-w-0 items-center gap-3 rounded-[17px] px-3 py-3 text-left transition ${
                      selected
                        ? "bg-[#fff2f8]"
                        : "active:bg-gray-100"
                    }`}
                  >
                    <span className="text-[24px]">
                      {airport.flag}
                    </span>

                    <span className="flex h-11 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#f7eaf0] text-sm font-black text-[#660033]">
                      {airport.code}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-extrabold">
                        {airport.city}, {airport.country}
                      </span>

                      <span className="mt-1 block truncate text-xs text-gray-500">
                        {airport.airport}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="font-bold text-gray-700">
                  No airport found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Search by city, airport name, or IATA code.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

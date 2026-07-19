"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type SearchFormProps = {
  language: V3Language;
};

type TripType = "round-trip" | "one-way";

export default function SearchForm({
  language,
}: SearchFormProps) {
  const router = useRouter();
  const content = homepageContent[language].search;
  const isArabic = language === "ar";

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [cabin, setCabin] = useState("Economy");
  const [error, setError] = useState("");

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!from.trim() || !to.trim() || !departure) {
      setError(
        isArabic
          ? "يرجى إدخال نقطة المغادرة والوجهة وتاريخ السفر."
          : "Please enter your origin, destination and departure date.",
      );
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      setError(
        isArabic
          ? "يرجى اختيار تاريخ العودة."
          : "Please select a return date.",
      );
      return;
    }

    setError("");

    const params = new URLSearchParams({
      tripType,
      from: from.trim(),
      to: to.trim(),
      departure,
      travellers,
      cabin,
    });

    if (tripType === "round-trip") {
      params.set("return", returnDate);
    }

    window.localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify({
        tripType,
        from: from.trim(),
        to: to.trim(),
        departure,
        returnDate:
          tripType === "round-trip" ? returnDate : "",
        travellers,
        cabin,
      }),
    );

    router.push(`/flights/results?${params.toString()}`);
  }

  return (
    <section
      className="relative z-20 bg-[#660033] px-4 py-8 sm:px-8"
      aria-labelledby="voylme-flight-search-title"
    >
      <div className="mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-[26px] bg-white p-4 shadow-[0_18px_50px_rgba(35,0,18,0.24)] sm:p-6"
        >
          <h2
            id="voylme-flight-search-title"
            className="sr-only"
          >
            {content.searchButton}
          </h2>

          <div className="mb-5 flex gap-2">
            <button
              type="button"
              onClick={() => setTripType("round-trip")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                tripType === "round-trip"
                  ? "bg-[#660033] text-white"
                  : "bg-[#660033]/8 text-[#660033]"
              }`}
            >
              {content.roundTrip}
            </button>

            <button
              type="button"
              onClick={() => {
                setTripType("one-way");
                setReturnDate("");
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                tripType === "one-way"
                  ? "bg-[#660033] text-white"
                  : "bg-[#660033]/8 text-[#660033]"
              }`}
            >
              {content.oneWay}
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_1fr_1fr]">
            <label className="relative block">
              <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                {content.from}
              </span>

              <span className="relative block">
                <Image
                  src="/assets/icons/search/icon-location.png"
                  alt=""
                  width={20}
                  height={20}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isArabic ? "right-4" : "left-4"
                  }`}
                />

                <input
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  placeholder={isArabic ? "مدينة أو مطار" : "City or airport"}
                  className={`h-14 w-full rounded-2xl border border-[#660033]/25 bg-white text-sm font-semibold text-gray-900 outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10 ${
                    isArabic ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </span>
            </label>

            <div className="flex items-end justify-center">
              <button
                type="button"
                onClick={swapAirports}
                aria-label={isArabic ? "تبديل الوجهات" : "Swap airports"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#660033]/20 bg-white shadow-sm transition hover:bg-[#660033]/5"
              >
                <Image
                  src="/assets/icons/booking/icon-swap.png"
                  alt=""
                  width={22}
                  height={22}
                />
              </button>
            </div>

            <label className="relative block">
              <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                {content.to}
              </span>

              <span className="relative block">
                <Image
                  src="/assets/icons/search/icon-location.png"
                  alt=""
                  width={20}
                  height={20}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isArabic ? "right-4" : "left-4"
                  }`}
                />

                <input
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder={isArabic ? "مدينة أو مطار" : "City or airport"}
                  className={`h-14 w-full rounded-2xl border border-[#660033]/25 bg-white text-sm font-semibold text-gray-900 outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10 ${
                    isArabic ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                {content.departure}
              </span>

              <input
                type="date"
                value={departure}
                onChange={(event) =>
                  setDeparture(event.target.value)
                }
                className="h-14 w-full rounded-2xl border border-[#660033]/25 px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
              />
            </label>

            {tripType === "round-trip" && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                  {content.return}
                </span>

                <input
                  type="date"
                  value={returnDate}
                  min={departure || undefined}
                  onChange={(event) =>
                    setReturnDate(event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-[#660033]/25 px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
                />
              </label>
            )}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                {content.travellers}
              </span>

              <select
                value={travellers}
                onChange={(event) =>
                  setTravellers(event.target.value)
                }
                className="h-14 w-full rounded-2xl border border-[#660033]/25 bg-white px-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#660033]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                  (number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#660033]">
                {content.cabin}
              </span>

              <select
                value={cabin}
                onChange={(event) =>
                  setCabin(event.target.value)
                }
                className="h-14 w-full rounded-2xl border border-[#660033]/25 bg-white px-4 text-sm font-semibold text-gray-900 outline-none focus:border-[#660033]"
              >
                <option value="Economy">
                  {isArabic ? "الدرجة السياحية" : "Economy"}
                </option>
                <option value="Premium Economy">
                  {isArabic
                    ? "السياحية الممتازة"
                    : "Premium Economy"}
                </option>
                <option value="Business">
                  {isArabic ? "درجة الأعمال" : "Business"}
                </option>
                <option value="First">
                  {isArabic ? "الدرجة الأولى" : "First"}
                </option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                className="flex h-14 w-full min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-[#660033] px-6 text-base font-extrabold text-white shadow-[0_10px_25px_rgba(102,0,51,0.24)] transition hover:bg-[#520029]"
              >
                <Image
                  src="/assets/icons/search/icon-search.png"
                  alt=""
                  width={21}
                  height={21}
                />
                {content.searchButton}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

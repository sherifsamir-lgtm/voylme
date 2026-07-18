"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Minus,
  Plane,
  Plus,
  Search,
  UsersRound,
  X,
} from "lucide-react";

import {
  airports,
  type Airport,
} from "@/components/search/airports";
import {
  V3_COPY,
  type V3Language,
} from "./content";

type Props = {
  language: V3Language;
};

type TripType = "round-trip" | "one-way";

type Passengers = {
  adults: number;
  children: number;
  infants: number;
};

type StoredFlightSearch = {
  tripType: TripType;
  fromAirport: Airport | null;
  toAirport: Airport | null;
  departureDate: string;
  returnDate: string;
  passengers: Passengers;
  cabinClass: string;
};

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(date.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

function dateAfter(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return formatLocalDate(date);
}

function airportLabel(
  airport: Airport | null,
) {
  if (!airport) return "";

  return `${airport.city} (${airport.code})`;
}

export default function SearchForm({
  language,
}: Props) {
  const router = useRouter();
  const copy = V3_COPY[language];
  const isArabic = language === "ar";
  const formRef = useRef<HTMLFormElement>(null);
  const hydratedRef = useRef(false);

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const [fromAirport, setFromAirport] =
    useState<Airport | null>(null);

  const [toAirport, setToAirport] =
    useState<Airport | null>(null);

  const [fromQuery, setFromQuery] =
    useState("");

  const [toQuery, setToQuery] =
    useState("");

  const [activeAirport, setActiveAirport] =
    useState<"from" | "to" | null>(null);

  const [departureDate, setDepartureDate] =
    useState(dateAfter(7));

  const [returnDate, setReturnDate] =
    useState(dateAfter(14));

  const [passengers, setPassengers] =
    useState<Passengers>({
      adults: 1,
      children: 0,
      infants: 0,
    });

  const [cabinClass, setCabinClass] =
    useState("Economy");

  const [openPicker, setOpenPicker] =
    useState<"passengers" | "cabin" | null>(
      null,
    );

  const [error, setError] = useState("");

  const today = useMemo(() => dateAfter(0), []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(
        "voylme-flight-search",
      );

      if (!stored) return;

      const saved = JSON.parse(
        stored,
      ) as Partial<StoredFlightSearch>;

      if (
        saved.tripType === "round-trip" ||
        saved.tripType === "one-way"
      ) {
        setTripType(saved.tripType);
      }

      if (saved.fromAirport) {
        setFromAirport(saved.fromAirport);
        setFromQuery(
          airportLabel(saved.fromAirport),
        );
      }

      if (saved.toAirport) {
        setToAirport(saved.toAirport);
        setToQuery(
          airportLabel(saved.toAirport),
        );
      }

      if (
        saved.departureDate &&
        saved.departureDate >= today
      ) {
        setDepartureDate(saved.departureDate);
      }

      if (saved.returnDate) {
        setReturnDate(saved.returnDate);
      }

      if (saved.passengers) {
        setPassengers({
          adults: Math.max(
            1,
            saved.passengers.adults || 1,
          ),
          children: Math.max(
            0,
            saved.passengers.children || 0,
          ),
          infants: Math.max(
            0,
            saved.passengers.infants || 0,
          ),
        });
      }

      if (saved.cabinClass) {
        setCabinClass(saved.cabinClass);
      }
    } catch {
      window.localStorage.removeItem(
        "voylme-flight-search",
      );
    } finally {
      hydratedRef.current = true;
    }
  }, [today]);

  useEffect(() => {
    if (!hydratedRef.current) return;

    const data: StoredFlightSearch = {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
    };

    window.localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify(data),
    );
  }, [
    tripType,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
  ]);

  useEffect(() => {
    if (
      tripType === "round-trip" &&
      returnDate < departureDate
    ) {
      setReturnDate(departureDate);
    }
  }, [
    departureDate,
    returnDate,
    tripType,
  ]);

  useEffect(() => {
    function closeOutside(event: MouseEvent) {
      if (
        formRef.current &&
        !formRef.current.contains(
          event.target as Node,
        )
      ) {
        setActiveAirport(null);
        setOpenPicker(null);
      }
    }

    document.addEventListener(
      "mousedown",
      closeOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeOutside,
      );
    };
  }, []);

  const filteredAirports = useMemo(() => {
    if (!activeAirport) return [];

    const query =
      activeAirport === "from"
        ? fromQuery.trim().toLowerCase()
        : toQuery.trim().toLowerCase();

    const excludedCode =
      activeAirport === "from"
        ? toAirport?.code
        : fromAirport?.code;

    return airports
      .filter((airport) => {
        if (airport.code === excludedCode) {
          return false;
        }

        if (!query) return true;

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
      .slice(0, 8);
  }, [
    activeAirport,
    fromAirport,
    fromQuery,
    toAirport,
    toQuery,
  ]);

  const passengerTotal =
    passengers.adults +
    passengers.children +
    passengers.infants;

  function selectAirport(airport: Airport) {
    if (activeAirport === "from") {
      setFromAirport(airport);
      setFromQuery(airportLabel(airport));
    } else {
      setToAirport(airport);
      setToQuery(airportLabel(airport));
    }

    setActiveAirport(null);
    setError("");
  }

  function swapAirports() {
    setFromAirport(toAirport);
    setToAirport(fromAirport);
    setFromQuery(airportLabel(toAirport));
    setToQuery(airportLabel(fromAirport));
    setError("");
  }

  function changePassenger(
    key: keyof Passengers,
    amount: number,
  ) {
    setPassengers((current) => {
      const minimum = key === "adults" ? 1 : 0;
      const next = Math.max(
        minimum,
        current[key] + amount,
      );

      if (
        key === "infants" &&
        next > current.adults
      ) {
        return current;
      }

      return {
        ...current,
        [key]: next,
      };
    });
  }

  function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (!fromAirport || !toAirport) {
      setError(copy.search.requiredRoute);
      return;
    }

    if (
      fromAirport.code === toAirport.code
    ) {
      setError(copy.search.sameRoute);
      return;
    }

    if (
      tripType === "round-trip" &&
      returnDate < departureDate
    ) {
      setError(copy.search.invalidReturn);
      return;
    }

    const data: StoredFlightSearch = {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
    };

    window.localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify(data),
    );

    const params = new URLSearchParams({
      tripType,
      from: fromAirport.code,
      fromCity: fromAirport.city,
      to: toAirport.code,
      toCity: toAirport.city,
      departureDate,
      adults: String(passengers.adults),
      children: String(passengers.children),
      infants: String(passengers.infants),
      cabinClass,
    });

    if (tripType === "round-trip") {
      params.set("returnDate", returnDate);
    }

    router.push(
      `/flights/results?${params.toString()}`,
    );
  }

  const cabinOptions = [
    {
      value: "Economy",
      label: copy.search.economy,
    },
    {
      value: "Premium Economy",
      label: copy.search.premiumEconomy,
    },
    {
      value: "Business",
      label: copy.search.business,
    },
    {
      value: "First",
      label: copy.search.first,
    },
  ];

  return (
    <section
      className="v3-search-section relative z-20 px-4 pb-7 pt-4"
      dir={copy.direction}
      aria-label={
        isArabic
          ? "البحث عن الرحلات"
          : "Flight search"
      }
    >
      <form
        ref={formRef}
        onSubmit={submit}
        noValidate
        className="v3-search-form mx-auto w-full max-w-[1180px] rounded-[28px] border border-[#660033]/10 bg-white p-4 shadow-[0_18px_48px_rgba(62,14,39,0.11)] md:p-6"
      >
        <div className="grid grid-cols-2 rounded-[16px] bg-[#f5eff2] p-1">
          <button
            type="button"
            onClick={() => {
              setTripType("round-trip");
              setError("");
            }}
            className={`min-h-11 rounded-[13px] text-sm font-extrabold transition ${
              tripType === "round-trip"
                ? "bg-[#660033] text-white shadow-sm"
                : "text-[#675763]"
            }`}
          >
            {copy.search.roundTrip}
          </button>

          <button
            type="button"
            onClick={() => {
              setTripType("one-way");
              setError("");
            }}
            className={`min-h-11 rounded-[13px] text-sm font-extrabold transition ${
              tripType === "one-way"
                ? "bg-[#660033] text-white shadow-sm"
                : "text-[#675763]"
            }`}
          >
            {copy.search.oneWay}
          </button>
        </div>

        <div className="relative mt-4 grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Plane
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#660033]"
            />

            <input
              value={fromQuery}
              placeholder={copy.search.fromPlaceholder}
              autoComplete="off"
              onFocus={() => {
                setActiveAirport("from");
                setOpenPicker(null);
              }}
              onChange={(event) => {
                setFromQuery(event.target.value);
                setFromAirport(null);
                setActiveAirport("from");
                setError("");
              }}
              className="h-16 w-full rounded-[16px] border border-[#d9cbd2] bg-white ps-12 pe-10 text-base font-bold outline-none transition placeholder:font-medium placeholder:text-gray-400 focus:border-[#660033] focus:ring-4 focus:ring-[#660033]/10"
            />

            {fromQuery && (
              <button
                type="button"
                aria-label="Clear"
                onClick={() => {
                  setFromQuery("");
                  setFromAirport(null);
                  setActiveAirport("from");
                }}
                className="absolute end-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-400"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <MapPin
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#660033]"
            />

            <input
              value={toQuery}
              placeholder={copy.search.toPlaceholder}
              autoComplete="off"
              onFocus={() => {
                setActiveAirport("to");
                setOpenPicker(null);
              }}
              onChange={(event) => {
                setToQuery(event.target.value);
                setToAirport(null);
                setActiveAirport("to");
                setError("");
              }}
              className="h-16 w-full rounded-[16px] border border-[#d9cbd2] bg-white ps-12 pe-10 text-base font-bold outline-none transition placeholder:font-medium placeholder:text-gray-400 focus:border-[#660033] focus:ring-4 focus:ring-[#660033]/10"
            />

            {toQuery && (
              <button
                type="button"
                aria-label="Clear"
                onClick={() => {
                  setToQuery("");
                  setToAirport(null);
                  setActiveAirport("to");
                }}
                className="absolute end-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-400"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={swapAirports}
            aria-label="Swap airports"
            className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-white bg-[#660033] text-white shadow-[0_8px_20px_rgba(102,0,51,0.28)] transition active:scale-95 md:top-1/2"
          >
            <ArrowLeftRight size={17} />
          </button>

          {activeAirport && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[310px] overflow-y-auto rounded-[18px] border border-gray-200 bg-white p-2 shadow-2xl">
              {filteredAirports.map((airport) => (
                <button
                  key={`${activeAirport}-${airport.code}`}
                  type="button"
                  onClick={() =>
                    selectAirport(airport)
                  }
                  className="flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-start hover:bg-[#faf5f7]"
                >
                  <span className="text-xl">
                    {airport.flag}
                  </span>

                  <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fff0f6] text-xs font-black text-[#660033]">
                    {airport.code}
                  </span>

                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm text-slate-800">
                      {airport.city},{" "}
                      {airport.country}
                    </strong>

                    <small className="block truncate text-xs text-gray-500">
                      {airport.airport}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="min-h-16 rounded-[16px] border border-[#d9cbd2] px-4 py-2.5 focus-within:border-[#660033] focus-within:ring-4 focus-within:ring-[#660033]/10">
            <span className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">
              {copy.search.departure}
            </span>

            <span className="mt-1 flex items-center gap-3">
              <CalendarDays
                size={18}
                className="text-[#660033]"
              />

              <input
                type="date"
                value={departureDate}
                min={today}
                onChange={(event) => {
                  setDepartureDate(
                    event.target.value,
                  );
                  setError("");
                }}
                className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
              />
            </span>
          </label>

          {tripType === "round-trip" ? (
            <label className="min-h-16 rounded-[16px] border border-[#d9cbd2] px-4 py-2.5 focus-within:border-[#660033] focus-within:ring-4 focus-within:ring-[#660033]/10">
              <span className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500">
                {copy.search.return}
              </span>

              <span className="mt-1 flex items-center gap-3">
                <CalendarDays
                  size={18}
                  className="text-[#660033]"
                />

                <input
                  type="date"
                  value={returnDate}
                  min={departureDate || today}
                  onChange={(event) => {
                    setReturnDate(
                      event.target.value,
                    );
                    setError("");
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                />
              </span>
            </label>
          ) : (
            <div className="flex min-h-[62px] items-center justify-center rounded-[16px] border border-dashed border-[#d9cbd2] bg-[#fcfafb] text-sm font-semibold text-gray-400">
              {isArabic
                ? "لا يوجد تاريخ عودة"
                : "No return date"}
            </div>
          )}
        </div>

        <div className="relative mt-3 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setOpenPicker(
                openPicker === "passengers"
                  ? null
                  : "passengers",
              );
              setActiveAirport(null);
            }}
            className="flex min-h-16 items-center gap-3 rounded-[16px] border border-[#d9cbd2] px-4 text-start transition hover:border-[#660033]/45 focus:border-[#660033] focus:ring-4 focus:ring-[#660033]/10"
          >
            <UsersRound
              size={19}
              className="text-[#660033]"
            />

            <span className="min-w-0 flex-1">
              <small className="block text-[10px] font-extrabold uppercase text-gray-500">
                {copy.search.passengers}
              </small>

              <strong className="block truncate text-sm">
                {passengerTotal}{" "}
                {isArabic ? "مسافر" : "passenger"}
              </strong>
            </span>

            <ChevronDown size={17} />
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenPicker(
                openPicker === "cabin"
                  ? null
                  : "cabin",
              );
              setActiveAirport(null);
            }}
            className="flex min-h-16 items-center gap-3 rounded-[16px] border border-[#d9cbd2] px-4 text-start transition hover:border-[#660033]/45 focus:border-[#660033] focus:ring-4 focus:ring-[#660033]/10"
          >
            <Plane
              size={19}
              className="text-[#660033]"
            />

            <span className="min-w-0 flex-1">
              <small className="block text-[10px] font-extrabold uppercase text-gray-500">
                {copy.search.cabin}
              </small>

              <strong className="block truncate text-sm">
                {
                  cabinOptions.find(
                    (item) =>
                      item.value === cabinClass,
                  )?.label
                }
              </strong>
            </span>

            <ChevronDown size={17} />
          </button>

          {openPicker === "passengers" && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-[18px] border border-gray-200 bg-white p-4 shadow-2xl md:right-auto md:w-[360px]">
              {[
                {
                  key: "adults" as const,
                  label: isArabic
                    ? "البالغون"
                    : "Adults",
                  value: passengers.adults,
                },
                {
                  key: "children" as const,
                  label: isArabic
                    ? "الأطفال"
                    : "Children",
                  value: passengers.children,
                },
                {
                  key: "infants" as const,
                  label: isArabic
                    ? "الرضع"
                    : "Infants",
                  value: passengers.infants,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                >
                  <strong>{item.label}</strong>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        changePassenger(
                          item.key,
                          -1,
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9cbd2] text-[#660033]"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-5 text-center font-black">
                      {item.value}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        changePassenger(
                          item.key,
                          1,
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#660033] text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {openPicker === "cabin" && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-[18px] border border-gray-200 bg-white p-2 shadow-2xl md:left-auto md:w-[360px]">
              {cabinOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setCabinClass(option.value);
                    setOpenPicker(null);
                  }}
                  className={`w-full rounded-[13px] px-4 py-3 text-start text-sm font-bold ${
                    cabinClass === option.value
                      ? "bg-[#660033] text-white"
                      : "hover:bg-[#faf5f7]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 rounded-[13px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 flex min-h-16 w-full items-center justify-center gap-3 rounded-[17px] bg-[#660033] px-6 text-lg font-extrabold text-white shadow-[0_12px_28px_rgba(102,0,51,0.22)] transition hover:bg-[#57002b] active:scale-[0.99]"
        >
          <Search size={20} />
          {copy.search.searchButton}
        </button>
      </form>
    </section>
  );
}

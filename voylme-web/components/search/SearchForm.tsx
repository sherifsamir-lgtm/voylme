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
  Check,
  ChevronDown,
  Minus,
  Plus,
  MapPin,
  Plane,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { airports, type Airport } from "./airports";

type TripType = "round-trip" | "one-way";

type StoredFlightSearch = {
  tripType: TripType;
  fromAirport: Airport | null;
  toAirport: Airport | null;
  departureDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: string;
};

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateAfter(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

function airportLabel(airport: Airport | null) {
  return airport ? `${airport.city} (${airport.code})` : "";
}

export default function SearchForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const hydratedRef = useRef(false);

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const [fromAirport, setFromAirport] =
    useState<Airport | null>(null);

  const [toAirport, setToAirport] =
    useState<Airport | null>(null);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const [activeField, setActiveField] =
    useState<"from" | "to" | null>(null);

  const [departureDate, setDepartureDate] =
    useState(dateAfter(7));

  const [returnDate, setReturnDate] =
    useState(dateAfter(14));

  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] =
    useState("Economy");

  const [homePicker, setHomePicker] = useState<
    "travellers" | "cabin" | null
  >(null);

  const [error, setError] = useState("");

  const today = useMemo(() => dateAfter(0), []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        "voylme-flight-search",
      );

      if (stored) {
        const saved = JSON.parse(
          stored,
        ) as Partial<StoredFlightSearch>;

        if (saved.fromAirport) {
          setFromAirport(saved.fromAirport);
          setFromQuery(
            airportLabel(saved.fromAirport),
          );
        }

        if (saved.toAirport) {
          setToAirport(saved.toAirport);
          setToQuery(airportLabel(saved.toAirport));
        }

        if (
          saved.tripType === "round-trip" ||
          saved.tripType === "one-way"
        ) {
          setTripType(saved.tripType);
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

        if (
          saved.passengers?.adults &&
          saved.passengers.adults >= 1
        ) {
          setPassengers(saved.passengers.adults);
        }

        if (saved.cabinClass) {
          setCabinClass(saved.cabinClass);
        }
      }
    } catch {
      localStorage.removeItem(
        "voylme-flight-search",
      );
    } finally {
      hydratedRef.current = true;
    }
  }, [today]);

  useEffect(() => {
    if (!hydratedRef.current) return;

    const searchData: StoredFlightSearch = {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers: {
        adults: passengers,
        children: 0,
        infants: 0,
      },
      cabinClass,
    };

    localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify(searchData),
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
  }, [departureDate, returnDate, tripType]);

  useEffect(() => {
    function closeAirportList(event: MouseEvent) {
      if (
        formRef.current &&
        !formRef.current.contains(
          event.target as Node,
        )
      ) {
        setActiveField(null);
      }
    }

    document.addEventListener(
      "mousedown",
      closeAirportList,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeAirportList,
      );
    };
  }, []);

  const filteredAirports = useMemo(() => {
    if (!activeField) return [];

    const query =
      activeField === "from"
        ? fromQuery.trim().toLowerCase()
        : toQuery.trim().toLowerCase();

    const excludedCode =
      activeField === "from"
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
    activeField,
    fromAirport,
    fromQuery,
    toAirport,
    toQuery,
  ]);

  function selectAirport(airport: Airport) {
    if (activeField === "from") {
      setFromAirport(airport);
      setFromQuery(airportLabel(airport));
    } else {
      setToAirport(airport);
      setToQuery(airportLabel(airport));
    }

    setActiveField(null);
    setError("");
  }

  function swapAirports() {
    setFromAirport(toAirport);
    setToAirport(fromAirport);
    setFromQuery(airportLabel(toAirport));
    setToQuery(airportLabel(fromAirport));
    setError("");
  }

  function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (!fromAirport) {
      setError(
        "Please select a departure airport.",
      );
      setActiveField("from");
      return;
    }

    if (!toAirport) {
      setError(
        "Please select a destination airport.",
      );
      setActiveField("to");
      return;
    }

    if (fromAirport.code === toAirport.code) {
      setError(
        "Departure and destination must be different.",
      );
      return;
    }

    if (!departureDate) {
      setError("Please select a departure date.");
      return;
    }

    if (
      tripType === "round-trip" &&
      (!returnDate ||
        returnDate < departureDate)
    ) {
      setError(
        "Return date must be on or after the departure date.",
      );
      return;
    }

    const searchData: StoredFlightSearch = {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers: {
        adults: passengers,
        children: 0,
        infants: 0,
      },
      cabinClass,
    };

    localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify(searchData),
    );

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

    router.push(
      `/flights/results?${params.toString()}`,
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="rounded-[20px] border border-[#660033]/5 bg-white p-2.5 shadow-[0_5px_18px_rgba(69,0,34,0.07)]"
      noValidate
    >
      <div className="grid grid-cols-2 rounded-[13px] bg-[#f3eef1] p-1">
        <button
          type="button"
          onClick={() => {
            setTripType("round-trip");
            setError("");
          }}
          className={`h-9 rounded-[10px] text-[11px] font-extrabold transition ${
            tripType === "round-trip"
              ? "bg-[#660033] text-white shadow-sm"
              : "text-[#5f5360]"
          }`}
        >
          Round Trip
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType("one-way");
            setError("");
          }}
          className={`h-9 rounded-[10px] text-[11px] font-extrabold transition ${
            tripType === "one-way"
              ? "bg-[#660033] text-white shadow-sm"
              : "text-[#5f5360]"
          }`}
        >
          One Way
        </button>
      </div>

      <div className="relative mt-2 grid grid-cols-2 gap-2">
        <div className="relative">
          <label
            htmlFor="flight-from"
            className="sr-only"
          >
            Departure airport
          </label>

          <Plane
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
          />

          <input
            id="flight-from"
            value={fromQuery}
            placeholder="From"
            autoComplete="off"
            onFocus={() => setActiveField("from")}
            onChange={(event) => {
              setFromQuery(event.target.value);
              setFromAirport(null);
              setActiveField("from");
              setError("");
            }}
            className="h-12 w-full rounded-[13px] border border-[#d9cbd2] bg-white pl-9 pr-7 text-[12px] font-bold text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
          />

          {fromQuery && (
            <button
              type="button"
              aria-label="Clear departure airport"
              onClick={() => {
                setFromQuery("");
                setFromAirport(null);
                setActiveField("from");
              }}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-400"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="flight-to"
            className="sr-only"
          >
            Destination airport
          </label>

          <MapPin
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
          />

          <input
            id="flight-to"
            value={toQuery}
            placeholder="To"
            autoComplete="off"
            onFocus={() => setActiveField("to")}
            onChange={(event) => {
              setToQuery(event.target.value);
              setToAirport(null);
              setActiveField("to");
              setError("");
            }}
            className="h-12 w-full rounded-[13px] border border-[#d9cbd2] bg-white pl-9 pr-7 text-[12px] font-bold text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
          />

          {toQuery && (
            <button
              type="button"
              aria-label="Clear destination airport"
              onClick={() => {
                setToQuery("");
                setToAirport(null);
                setActiveField("to");
              }}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-400"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap departure and destination"
          className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#660033] text-white shadow-md active:scale-95"
        >
          <ArrowLeftRight size={14} />
        </button>

        {activeField && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[220px] overflow-y-auto rounded-[15px] border border-gray-200 bg-white p-1.5 shadow-xl">
            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport) => (
                <button
                  key={`${activeField}-${airport.code}`}
                  type="button"
                  onClick={() =>
                    selectAirport(airport)
                  }
                  className="flex w-full items-center gap-2 rounded-[11px] px-2 py-2.5 text-left hover:bg-[#faf5f7] active:bg-[#f4e9ee]"
                >
                  <span className="text-base">
                    {airport.flag}
                  </span>

                  <span className="flex h-8 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0f6] text-[10px] font-black text-[#660033]">
                    {airport.code}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-extrabold text-slate-800">
                      {airport.city},{" "}
                      {airport.country}
                    </span>

                    <span className="block truncate text-[9px] text-gray-500">
                      {airport.airport}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-center text-[11px] font-semibold text-gray-500">
                No matching airports found.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="rounded-[13px] border border-[#d9cbd2] bg-white px-3 py-1.5 focus-within:border-[#660033] focus-within:ring-2 focus-within:ring-[#660033]/10">
          <span className="mb-0.5 block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
            Departure
          </span>

          <span className="flex items-center gap-2">
            <CalendarDays
              size={16}
              className="shrink-0 text-[#660033]"
            />

            <input
              aria-label="Departure date"
              type="date"
              value={departureDate}
              min={today}
              onChange={(event) => {
                setDepartureDate(
                  event.target.value,
                );
                setError("");
              }}
              className="min-w-0 flex-1 bg-transparent text-[10px] font-bold text-slate-800 outline-none"
            />
          </span>
        </label>

        {tripType === "round-trip" ? (
          <label className="rounded-[13px] border border-[#d9cbd2] bg-white px-3 py-1.5 focus-within:border-[#660033] focus-within:ring-2 focus-within:ring-[#660033]/10">
            <span className="mb-0.5 block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
              Return
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays
                size={16}
                className="shrink-0 text-[#660033]"
              />

              <input
                aria-label="Return date"
                type="date"
                value={returnDate}
                min={departureDate || today}
                onChange={(event) => {
                  setReturnDate(
                    event.target.value,
                  );
                  setError("");
                }}
                className="min-w-0 flex-1 bg-transparent text-[10px] font-bold text-slate-800 outline-none"
              />
            </span>
          </label>
        ) : (
          <div className="flex min-h-[52px] items-center justify-center rounded-[13px] border border-dashed border-[#d9cbd2] bg-[#fcfafb] px-2 text-center text-[10px] font-semibold text-gray-400">
            No return date
          </div>
        )}
      </div>

      <div className="relative mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setHomePicker(
              homePicker === "travellers"
                ? null
                : "travellers",
            );
            setActiveField(null);
          }}
          className="rounded-[13px] border border-[#d9cbd2] bg-white px-3 py-1.5 text-left focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
        >
          <span className="mb-0.5 block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
            Travellers
          </span>

          <span className="flex items-center gap-2">
            <UsersRound
              size={16}
              className="shrink-0 text-[#660033]"
            />

            <span className="min-w-0 flex-1 truncate text-[10px] font-bold text-slate-800">
              {passengers}{" "}
              {passengers === 1
                ? "Traveller"
                : "Travellers"}
            </span>

            <ChevronDown
              size={13}
              className="shrink-0 text-gray-400"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setHomePicker(
              homePicker === "cabin"
                ? null
                : "cabin",
            );
            setActiveField(null);
          }}
          className="rounded-[13px] border border-[#d9cbd2] bg-white px-3 py-1.5 text-left focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
        >
          <span className="mb-0.5 block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
            Cabin class
          </span>

          <span className="flex items-center gap-2">
            <Plane
              size={16}
              className="shrink-0 text-[#660033]"
            />

            <span className="min-w-0 flex-1 truncate text-[10px] font-bold text-slate-800">
              {cabinClass}
            </span>

            <ChevronDown
              size={13}
              className="shrink-0 text-gray-400"
            />
          </span>
        </button>

        {homePicker === "travellers" && (
          <div className="absolute left-0 right-0 top-full z-[100] mt-1 rounded-[16px] border border-gray-200 bg-white p-3 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-extrabold text-slate-900">
                  Adult travellers
                </p>

                <p className="text-[9px] text-gray-500">
                  Select 1 to 9 travellers
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Remove traveller"
                  disabled={passengers <= 1}
                  onClick={() =>
                    setPassengers((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#660033]/25 text-[#660033] disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>

                <span className="w-5 text-center text-[15px] font-black">
                  {passengers}
                </span>

                <button
                  type="button"
                  aria-label="Add traveller"
                  disabled={passengers >= 9}
                  onClick={() =>
                    setPassengers((current) =>
                      Math.min(9, current + 1),
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#660033] text-white disabled:opacity-30"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHomePicker(null)}
              className="mt-3 h-10 w-full rounded-[12px] bg-[#660033] text-[11px] font-extrabold text-white"
            >
              Done
            </button>
          </div>
        )}

        {homePicker === "cabin" && (
          <div className="absolute left-0 right-0 top-full z-[100] mt-1 rounded-[16px] border border-gray-200 bg-white p-2 shadow-xl">
            {[
              "Economy",
              "Premium Economy",
              "Business",
              "First",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCabinClass(item);
                  setHomePicker(null);
                }}
                className={`flex h-11 w-full items-center justify-between rounded-[11px] px-3 text-left text-[11px] font-extrabold ${
                  cabinClass === item
                    ? "bg-[#fff0f6] text-[#660033]"
                    : "text-slate-800"
                }`}
              >
                {item}

                {cabinClass === item && (
                  <Check size={16} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-2 rounded-[10px] bg-red-50 px-3 py-2 text-center text-[10px] font-bold text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#660033] text-[14px] font-extrabold text-white shadow-[0_5px_14px_rgba(102,0,51,0.25)] transition active:scale-[0.99]"
      >
        <Search size={18} />
        Search Flights
      </button>
    </form>
  );
}

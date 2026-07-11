"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  ChevronDown,
  Globe2,
  MapPin,
  Minus,
  Plane,
  Plus,
  Search,
  UsersRound,
  X,
} from "lucide-react";

type TripType = "round-trip" | "one-way";
type AirportField = "from" | "to";
type CabinClass =
  | "Economy"
  | "Premium Economy"
  | "Business"
  | "First";

type Airport = {
  code: string;
  city: string;
  airport: string;
  country: string;
};

type Passengers = {
  adults: number;
  children: number;
  infants: number;
};

type Errors = {
  from?: string;
  to?: string;
  departure?: string;
  return?: string;
  passengers?: string;
};

const airports: Airport[] = [
  {
    code: "CAI",
    city: "Cairo",
    airport: "Cairo International Airport",
    country: "Egypt",
  },
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "DWC",
    city: "Dubai",
    airport: "Al Maktoum International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "AUH",
    city: "Abu Dhabi",
    airport: "Zayed International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "SHJ",
    city: "Sharjah",
    airport: "Sharjah International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "JED",
    city: "Jeddah",
    airport: "King Abdulaziz International Airport",
    country: "Saudi Arabia",
  },
  {
    code: "RUH",
    city: "Riyadh",
    airport: "King Khalid International Airport",
    country: "Saudi Arabia",
  },
  {
    code: "DOH",
    city: "Doha",
    airport: "Hamad International Airport",
    country: "Qatar",
  },
  {
    code: "KWI",
    city: "Kuwait City",
    airport: "Kuwait International Airport",
    country: "Kuwait",
  },
  {
    code: "BAH",
    city: "Manama",
    airport: "Bahrain International Airport",
    country: "Bahrain",
  },
  {
    code: "MCT",
    city: "Muscat",
    airport: "Muscat International Airport",
    country: "Oman",
  },
  {
    code: "AMM",
    city: "Amman",
    airport: "Queen Alia International Airport",
    country: "Jordan",
  },
  {
    code: "BEY",
    city: "Beirut",
    airport: "Beirut International Airport",
    country: "Lebanon",
  },
  {
    code: "IST",
    city: "Istanbul",
    airport: "Istanbul Airport",
    country: "Türkiye",
  },
  {
    code: "LHR",
    city: "London",
    airport: "Heathrow Airport",
    country: "United Kingdom",
  },
  {
    code: "CDG",
    city: "Paris",
    airport: "Charles de Gaulle Airport",
    country: "France",
  },
  {
    code: "FRA",
    city: "Frankfurt",
    airport: "Frankfurt Airport",
    country: "Germany",
  },
  {
    code: "FCO",
    city: "Rome",
    airport: "Fiumicino Airport",
    country: "Italy",
  },
  {
    code: "JFK",
    city: "New York",
    airport: "John F. Kennedy International Airport",
    country: "United States",
  },
  {
    code: "YYZ",
    city: "Toronto",
    airport: "Toronto Pearson International Airport",
    country: "Canada",
  },
];

const cabinClasses: CabinClass[] = [
  "Economy",
  "Premium Economy",
  "Business",
  "First",
];

function dateValue(daysFromToday: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split("T")[0];
}

function formatDate(value: string) {
  if (!value) return "Select date";

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function airportLabel(airport: Airport | null) {
  if (!airport) return "";
  return `${airport.city} (${airport.code})`;
}

export default function SearchPage() {
  const router = useRouter();

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const [fromAirport, setFromAirport] =
    useState<Airport | null>(null);

  const [toAirport, setToAirport] =
    useState<Airport | null>(null);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const [activeAirport, setActiveAirport] =
    useState<AirportField | null>(null);

  const [departureDate, setDepartureDate] =
    useState(dateValue(7));

  const [returnDate, setReturnDate] =
    useState(dateValue(14));

  const [passengers, setPassengers] =
    useState<Passengers>({
      adults: 1,
      children: 0,
      infants: 0,
    });

  const [cabinClass, setCabinClass] =
    useState<CabinClass>("Economy");

  const [passengersOpen, setPassengersOpen] =
    useState(false);

  const [classOpen, setClassOpen] =
    useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voylme-flight-search");

      if (saved) {
        const data = JSON.parse(saved);

        if (data.tripType) {
          setTripType(data.tripType);
        }

        if (data.fromAirport) {
          setFromAirport(data.fromAirport);
          setFromQuery(airportLabel(data.fromAirport));
        }

        if (data.toAirport) {
          setToAirport(data.toAirport);
          setToQuery(airportLabel(data.toAirport));
        }

        if (data.departureDate) {
          setDepartureDate(data.departureDate);
        }

        if (data.returnDate) {
          setReturnDate(data.returnDate);
        }

        if (data.passengers) {
          setPassengers(data.passengers);
        }

        if (data.cabinClass) {
          setCabinClass(data.cabinClass);
        }
      }
    } catch {
      localStorage.removeItem("voylme-flight-search");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify({
        tripType,
        fromAirport,
        toAirport,
        departureDate,
        returnDate,
        passengers,
        cabinClass,
      })
    );
  }, [
    ready,
    tripType,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
  ]);

  const currentQuery =
    activeAirport === "from" ? fromQuery : toQuery;

  const filteredAirports = useMemo(() => {
    const query = currentQuery.trim().toLowerCase();

    if (!query) {
      return airports.slice(0, 10);
    }

    return airports
      .filter((item) => {
        const searchable = [
          item.code,
          item.city,
          item.airport,
          item.country,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(query);
      })
      .slice(0, 12);
  }, [currentQuery]);

  function chooseAirport(airport: Airport) {
    if (activeAirport === "from") {
      setFromAirport(airport);
      setFromQuery(airportLabel(airport));

      setErrors((current) => ({
        ...current,
        from: undefined,
      }));
    }

    if (activeAirport === "to") {
      setToAirport(airport);
      setToQuery(airportLabel(airport));

      setErrors((current) => ({
        ...current,
        to: undefined,
      }));
    }

    setActiveAirport(null);
  }

  function swapAirports() {
    const oldFromAirport = fromAirport;
    const oldFromQuery = fromQuery;

    setFromAirport(toAirport);
    setFromQuery(toQuery);

    setToAirport(oldFromAirport);
    setToQuery(oldFromQuery);

    setErrors((current) => ({
      ...current,
      from: undefined,
      to: undefined,
    }));
  }

  function changePassenger(
    type: keyof Passengers,
    action: "plus" | "minus"
  ) {
    setPassengers((current) => {
      const next = { ...current };

      if (action === "plus") {
        const total =
          current.adults +
          current.children +
          current.infants;

        if (total >= 9) {
          return current;
        }

        if (
          type === "infants" &&
          current.infants >= current.adults
        ) {
          return current;
        }

        next[type] += 1;
      }

      if (action === "minus") {
        if (type === "adults") {
          if (current.adults <= 1) {
            return current;
          }

          next.adults -= 1;

          if (next.infants > next.adults) {
            next.infants = next.adults;
          }
        } else {
          if (current[type] <= 0) {
            return current;
          }

          next[type] -= 1;
        }
      }

      return next;
    });

    setErrors((current) => ({
      ...current,
      passengers: undefined,
    }));
  }

  function passengerTotal() {
    return (
      passengers.adults +
      passengers.children +
      passengers.infants
    );
  }

  function passengerDetails() {
    const details = [
      `${passengers.adults} Adult${
        passengers.adults === 1 ? "" : "s"
      }`,
    ];

    if (passengers.children > 0) {
      details.push(
        `${passengers.children} Child${
          passengers.children === 1 ? "" : "ren"
        }`
      );
    }

    if (passengers.infants > 0) {
      details.push(
        `${passengers.infants} Infant${
          passengers.infants === 1 ? "" : "s"
        }`
      );
    }

    return details.join(" · ");
  }

  function validateForm() {
    const nextErrors: Errors = {};

    if (!fromAirport) {
      nextErrors.from =
        "Please select your departure airport.";
    }

    if (!toAirport) {
      nextErrors.to =
        "Please select your arrival airport.";
    }

    if (
      fromAirport &&
      toAirport &&
      fromAirport.code === toAirport.code
    ) {
      nextErrors.to =
        "Departure and arrival airports cannot be the same.";
    }

    if (!departureDate) {
      nextErrors.departure =
        "Please select your departure date.";
    } else if (departureDate < today) {
      nextErrors.departure =
        "Departure date cannot be in the past.";
    }

    if (tripType === "round-trip") {
      if (!returnDate) {
        nextErrors.return =
          "Please select your return date.";
      } else if (returnDate <= departureDate) {
        nextErrors.return =
          "Return date must be after the departure date.";
      }
    }

    if (passengers.adults < 1) {
      nextErrors.passengers =
        "At least one adult passenger is required.";
    }

    if (passengers.infants > passengers.adults) {
      nextErrors.passengers =
        "Each infant must travel with an adult.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!fromAirport || !toAirport) {
      return;
    }

    const params = new URLSearchParams({
      tripType,
      from: fromAirport.code,
      fromCity: fromAirport.city,
      fromAirport: fromAirport.airport,
      to: toAirport.code,
      toCity: toAirport.city,
      toAirport: toAirport.airport,
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
      `/flights/results?${params.toString()}`
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f5f6] text-[#171522]">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[74px] w-full max-w-[430px] items-center justify-between px-4">
          <div>
            <p className="text-[25px] font-black tracking-tight text-[#660033]">
              Voylme
            </p>

            <p className="-mt-1 text-[10px] font-semibold tracking-[0.17em] text-gray-400">
              TRAVEL SMARTER
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-sm font-bold text-[#660033]"
            >
              <Globe2 size={17} />
              EN
            </button>

            <button
              type="button"
              className="h-10 rounded-full border border-gray-200 bg-white px-3 text-sm font-bold text-[#660033]"
            >
              AED
            </button>
          </div>
        </div>
      </header>

      <section
        className="relative mx-auto min-h-[245px] w-full max-w-[430px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(35,0,18,0.20), rgba(35,0,18,0.72)), url('/images/hero-bg.png')",
        }}
      >
        <div className="absolute inset-0 flex items-end px-5 pb-8">
          <div className="text-white">
            <p className="text-sm font-bold text-white/85">
              Discover your next journey
            </p>

            <h1 className="mt-2 max-w-[340px] text-[31px] font-black leading-tight">
              Search, compare and travel for less
            </h1>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-4 w-full max-w-[430px] px-4 pb-28">
        <form
          onSubmit={handleSearch}
          noValidate
          className="w-full rounded-[30px] bg-white p-4 shadow-[0_12px_35px_rgba(65,0,32,0.12)]"
        >
          <div className="grid grid-cols-2 rounded-[18px] bg-[#f5f1f3] p-1">
            <button
              type="button"
              onClick={() => {
                setTripType("round-trip");

                setErrors((current) => ({
                  ...current,
                  return: undefined,
                }));
              }}
              className={`h-12 rounded-[15px] text-sm font-extrabold transition ${
                tripType === "round-trip"
                  ? "bg-[#660033] text-white shadow"
                  : "text-gray-600"
              }`}
            >
              Round Trip
            </button>

            <button
              type="button"
              onClick={() => {
                setTripType("one-way");

                setErrors((current) => ({
                  ...current,
                  return: undefined,
                }));
              }}
              className={`h-12 rounded-[15px] text-sm font-extrabold transition ${
                tripType === "one-way"
                  ? "bg-[#660033] text-white shadow"
                  : "text-gray-600"
              }`}
            >
              One Way
            </button>
          </div>

          <div className="relative mt-5 space-y-3">
            <div>
              <label
                htmlFor="from-airport"
                className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
              >
                From
              </label>

              <div
                className={`flex h-[68px] items-center gap-3 rounded-[20px] border bg-white px-4 ${
                  errors.from
                    ? "border-red-500"
                    : activeAirport === "from"
                      ? "border-[#660033]"
                      : "border-gray-200"
                }`}
              >
                <Plane
                  size={23}
                  className="shrink-0 text-[#660033]"
                />

                <input
                  id="from-airport"
                  type="text"
                  value={fromQuery}
                  onFocus={() =>
                    setActiveAirport("from")
                  }
                  onChange={(event) => {
                    setFromQuery(event.target.value);
                    setFromAirport(null);
                    setActiveAirport("from");

                    setErrors((current) => ({
                      ...current,
                      from: undefined,
                    }));
                  }}
                  placeholder="City or airport"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:font-normal placeholder:text-gray-400"
                />

                {fromQuery && (
                  <button
                    type="button"
                    aria-label="Clear departure airport"
                    onClick={() => {
                      setFromQuery("");
                      setFromAirport(null);
                      setActiveAirport("from");
                    }}
                    className="shrink-0 text-gray-400"
                  >
                    <X size={19} />
                  </button>
                )}
              </div>

              {errors.from && (
                <p className="mt-1.5 text-sm font-semibold text-red-600">
                  {errors.from}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={swapAirports}
              aria-label="Swap airports"
              className="absolute right-5 top-[62px] z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#660033] text-white shadow-md"
            >
              <ArrowLeftRight size={19} />
            </button>

            <div>
              <label
                htmlFor="to-airport"
                className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
              >
                To
              </label>

              <div
                className={`flex h-[68px] items-center gap-3 rounded-[20px] border bg-white px-4 ${
                  errors.to
                    ? "border-red-500"
                    : activeAirport === "to"
                      ? "border-[#660033]"
                      : "border-gray-200"
                }`}
              >
                <MapPin
                  size={23}
                  className="shrink-0 text-[#660033]"
                />

                <input
                  id="to-airport"
                  type="text"
                  value={toQuery}
                  onFocus={() =>
                    setActiveAirport("to")
                  }
                  onChange={(event) => {
                    setToQuery(event.target.value);
                    setToAirport(null);
                    setActiveAirport("to");

                    setErrors((current) => ({
                      ...current,
                      to: undefined,
                    }));
                  }}
                  placeholder="City or airport"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:font-normal placeholder:text-gray-400"
                />

                {toQuery && (
                  <button
                    type="button"
                    aria-label="Clear arrival airport"
                    onClick={() => {
                      setToQuery("");
                      setToAirport(null);
                      setActiveAirport("to");
                    }}
                    className="shrink-0 text-gray-400"
                  >
                    <X size={19} />
                  </button>
                )}
              </div>

              {errors.to && (
                <p className="mt-1.5 text-sm font-semibold text-red-600">
                  {errors.to}
                </p>
              )}
            </div>

            {activeAirport && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[335px] overflow-y-auto rounded-[22px] border border-gray-200 bg-white p-2 shadow-2xl">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-sm font-extrabold text-[#660033]">
                    Select airport
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveAirport(null)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                  >
                    <X size={17} />
                  </button>
                </div>

                {filteredAirports.length > 0 ? (
                  filteredAirports.map((airport) => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() =>
                        chooseAirport(airport)
                      }
                      className="flex w-full items-center gap-3 rounded-[17px] px-3 py-3 text-left hover:bg-[#fbf5f8]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f7eaf0] text-sm font-black text-[#660033]">
                        {airport.code}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-extrabold">
                          {airport.city},{" "}
                          {airport.country}
                        </span>

                        <span className="mt-1 block truncate text-xs text-gray-500">
                          {airport.airport}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">
                    No matching airport found.
                  </p>
                )}
              </div>
            )}
          </div>

          <div
            className={`mt-5 grid gap-3 ${
              tripType === "round-trip"
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            <div className="min-w-0">
              <label
                htmlFor="departure-date"
                className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
              >
                Departure
              </label>

              <label
                htmlFor="departure-date"
                className={`relative flex min-h-[78px] cursor-pointer items-center gap-3 overflow-hidden rounded-[20px] border bg-white px-3 ${
                  errors.departure
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <CalendarDays
                  size={21}
                  className="shrink-0 text-[#660033]"
                />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold">
                    {formatDate(departureDate)}
                  </span>
                </span>

                <input
                  id="departure-date"
                  type="date"
                  min={today}
                  value={departureDate}
                  onChange={(event) => {
                    const nextDeparture =
                      event.target.value;

                    setDepartureDate(nextDeparture);

                    if (
                      tripType === "round-trip" &&
                      returnDate &&
                      nextDeparture >= returnDate
                    ) {
                      const nextReturnDate = new Date(
                        `${nextDeparture}T12:00:00`
                      );

                      nextReturnDate.setDate(
                        nextReturnDate.getDate() + 1
                      );

                      setReturnDate(
                        nextReturnDate
                          .toISOString()
                          .split("T")[0]
                      );
                    }

                    setErrors((current) => ({
                      ...current,
                      departure: undefined,
                      return: undefined,
                    }));
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>

              {errors.departure && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {errors.departure}
                </p>
              )}
            </div>

            {tripType === "round-trip" && (
              <div className="min-w-0">
                <label
                  htmlFor="return-date"
                  className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
                >
                  Return
                </label>

                <label
                  htmlFor="return-date"
                  className={`relative flex min-h-[78px] cursor-pointer items-center gap-3 overflow-hidden rounded-[20px] border bg-white px-3 ${
                    errors.return
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <CalendarDays
                    size={21}
                    className="shrink-0 text-[#660033]"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold">
                      {formatDate(returnDate)}
                    </span>
                  </span>

                  <input
                    id="return-date"
                    type="date"
                    min={departureDate || today}
                    value={returnDate}
                    onChange={(event) => {
                      setReturnDate(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        return: undefined,
                      }));
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>

                {errors.return && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {errors.return}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500">
                Passengers
              </label>

              <button
                type="button"
                onClick={() => setPassengersOpen(true)}
                className={`flex min-h-[76px] w-full min-w-0 items-center gap-3 rounded-[20px] border bg-white px-3 text-left ${
                  errors.passengers
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <UsersRound
                  size={22}
                  className="shrink-0 text-[#660033]"
                />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold">
                    {passengerTotal()}{" "}
                    {passengerTotal() === 1
                      ? "Passenger"
                      : "Passengers"}
                  </span>

                  <span className="mt-1 block truncate text-xs text-gray-500">
                    {passengerDetails()}
                  </span>
                </span>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-gray-400"
                />
              </button>

              {errors.passengers && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {errors.passengers}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500">
                Cabin Class
              </label>

              <button
                type="button"
                onClick={() => setClassOpen(true)}
                className="flex min-h-[76px] w-full min-w-0 items-center gap-3 rounded-[20px] border border-gray-200 bg-white px-3 text-left"
              >
                <Plane
                  size={22}
                  className="shrink-0 text-[#660033]"
                />

                <span className="min-w-0 flex-1 truncate text-sm font-extrabold">
                  {cabinClass}
                </span>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-gray-400"
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex h-16 w-full items-center justify-center gap-2 rounded-[22px] bg-[#660033] text-[18px] font-extrabold text-white shadow-lg active:scale-[0.99]"
          >
            <Search size={21} />
            Search Flights
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-gray-500">
            Compare flight prices from trusted travel partners.
          </p>
        </form>
      </section>

      {passengersOpen && (
        <div className="fixed inset-0 z-[100] flex items-end bg-black/45">
          <button
            type="button"
            aria-label="Close passenger selector"
            onClick={() => setPassengersOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative z-10 mx-auto w-full max-w-[430px] rounded-t-[30px] bg-white px-5 pb-7 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-extrabold">
                  Passengers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Maximum 9 passengers
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPassengersOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 divide-y divide-gray-100">
              {[
                {
                  key: "adults" as const,
                  title: "Adults",
                  subtitle: "12 years and above",
                },
                {
                  key: "children" as const,
                  title: "Children",
                  subtitle: "2–11 years",
                },
                {
                  key: "infants" as const,
                  title: "Infants",
                  subtitle: "Under 2 years",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-5"
                >
                  <div>
                    <p className="font-extrabold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        changePassenger(
                          item.key,
                          "minus"
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#660033]"
                    >
                      <Minus size={19} />
                    </button>

                    <span className="w-5 text-center text-lg font-extrabold">
                      {passengers[item.key]}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        changePassenger(
                          item.key,
                          "plus"
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#660033] text-white"
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-2 rounded-[17px] bg-[#fff6fa] px-4 py-3 text-xs leading-5 text-[#660033]">
              The number of infants cannot exceed the
              number of adults.
            </p>

            <button
              type="button"
              onClick={() => setPassengersOpen(false)}
              className="mt-5 min-h-[60px] w-full rounded-[20px] bg-[#660033] text-base font-extrabold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {classOpen && (
        <div className="fixed inset-0 z-[100] flex items-end bg-black/45">
          <button
            type="button"
            aria-label="Close cabin class selector"
            onClick={() => setClassOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative z-10 mx-auto w-full max-w-[430px] rounded-t-[30px] bg-white px-5 pb-7 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-extrabold">
                  Cabin Class
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select your preferred class
                </p>
              </div>

              <button
                type="button"
                onClick={() => setClassOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {cabinClasses.map((item) => {
                const selected =
                  cabinClass === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCabinClass(item);
                      setClassOpen(false);
                    }}
                    className={`flex min-h-[66px] w-full items-center justify-between rounded-[20px] border px-4 text-left font-extrabold ${
                      selected
                        ? "border-[#660033] bg-[#fff6fa] text-[#660033]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {item}

                    {selected && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#660033] text-white">
                        <Check
                          size={17}
                          strokeWidth={3}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Search } from "lucide-react";

import AirportAutocomplete from "./AirportAutocomplete";
import DateSelector from "./DateSelector";
import PassengerSelector, {
  type PassengerState,
} from "./PassengerSelector";
import CabinClassSelector, {
  type CabinClass,
} from "./CabinClassSelector";
import type { Airport } from "./airports";

type TripType = "round-trip" | "one-way";

type SearchErrors = {
  from?: string;
  to?: string;
  departure?: string;
  return?: string;
  passengers?: string;
  cabinClass?: string;
};

type SavedSearch = {
  tripType: TripType;
  fromAirport: Airport | null;
  toAirport: Airport | null;
  departureDate: string;
  returnDate: string;
  passengers: PassengerState;
  cabinClass: CabinClass;
};

function getDateAfter(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
}

function airportLabel(airport: Airport | null) {
  if (!airport) return "";

  return `${airport.city} (${airport.code})`;
}

export default function SearchForm() {
  const router = useRouter();

  const [tripType, setTripType] =
    useState<TripType>("round-trip");

  const [fromAirport, setFromAirport] =
    useState<Airport | null>(null);

  const [toAirport, setToAirport] =
    useState<Airport | null>(null);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const [departureDate, setDepartureDate] = useState(
    getDateAfter(7)
  );

  const [returnDate, setReturnDate] = useState(
    getDateAfter(14)
  );

  const [passengers, setPassengers] =
    useState<PassengerState>({
      adults: 1,
      children: 0,
      infants: 0,
    });

  const [cabinClass, setCabinClass] =
    useState<CabinClass>("Economy");

  const [passengersOpen, setPassengersOpen] =
    useState(false);

  const [cabinClassOpen, setCabinClassOpen] =
    useState(false);

  const [errors, setErrors] =
    useState<SearchErrors>({});

  const [loaded, setLoaded] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    try {
      const savedSearch = localStorage.getItem(
        "voylme-flight-search"
      );

      if (!savedSearch) {
        setLoaded(true);
        return;
      }

      const saved = JSON.parse(
        savedSearch
      ) as Partial<SavedSearch>;

      if (saved.tripType) {
        setTripType(saved.tripType);
      }

      if (saved.fromAirport) {
        setFromAirport(saved.fromAirport);
        setFromQuery(airportLabel(saved.fromAirport));
      }

      if (saved.toAirport) {
        setToAirport(saved.toAirport);
        setToQuery(airportLabel(saved.toAirport));
      }

      if (saved.departureDate) {
        setDepartureDate(saved.departureDate);
      }

      if (saved.returnDate) {
        setReturnDate(saved.returnDate);
      }

      if (saved.passengers) {
        setPassengers(saved.passengers);
      }

      if (saved.cabinClass) {
        setCabinClass(saved.cabinClass);
      }
    } catch {
      localStorage.removeItem("voylme-flight-search");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const searchData: SavedSearch = {
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
    };

    localStorage.setItem(
      "voylme-flight-search",
      JSON.stringify(searchData)
    );
  }, [
    loaded,
    tripType,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
  ]);

  function selectFromAirport(airport: Airport) {
    setFromAirport(airport);
    setFromQuery(airportLabel(airport));

    setErrors((current) => ({
      ...current,
      from: undefined,
      to:
        airport.code === toAirport?.code
          ? "Departure and arrival airports cannot be the same."
          : current.to,
    }));
  }

  function selectToAirport(airport: Airport) {
    setToAirport(airport);
    setToQuery(airportLabel(airport));

    setErrors((current) => ({
      ...current,
      to:
        airport.code === fromAirport?.code
          ? "Departure and arrival airports cannot be the same."
          : undefined,
    }));
  }

  function clearFromAirport() {
    setFromAirport(null);
    setFromQuery("");

    setErrors((current) => ({
      ...current,
      from: undefined,
    }));
  }

  function clearToAirport() {
    setToAirport(null);
    setToQuery("");

    setErrors((current) => ({
      ...current,
      to: undefined,
    }));
  }

  function swapAirports() {
    const previousFromAirport = fromAirport;
    const previousFromQuery = fromQuery;

    setFromAirport(toAirport);
    setFromQuery(toQuery);

    setToAirport(previousFromAirport);
    setToQuery(previousFromQuery);

    setErrors((current) => ({
      ...current,
      from: undefined,
      to: undefined,
    }));
  }

  function changeDepartureDate(value: string) {
    setDepartureDate(value);

    if (
      tripType === "round-trip" &&
      returnDate &&
      value >= returnDate
    ) {
      const nextReturnDate = new Date(
        `${value}T12:00:00`
      );

      nextReturnDate.setDate(
        nextReturnDate.getDate() + 1
      );

      setReturnDate(
        nextReturnDate.toISOString().split("T")[0]
      );
    }

    setErrors((current) => ({
      ...current,
      departure: undefined,
      return: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: SearchErrors = {};

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

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;
    if (!fromAirport || !toAirport) return;

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

    router.push(`/flights/results?${params.toString()}`);
  }

  return (
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
        <AirportAutocomplete
          id="from-airport"
          label="From"
          placeholder="City or airport"
          type="departure"
          value={fromAirport}
          query={fromQuery}
          excludedAirportCode={toAirport?.code}
          error={errors.from}
          onQueryChange={(value) => {
            setFromQuery(value);
            setFromAirport(null);

            setErrors((current) => ({
              ...current,
              from: undefined,
            }));
          }}
          onSelect={selectFromAirport}
          onClear={clearFromAirport}
        />

        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap airports"
          className="absolute right-5 top-[62px] z-30 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#660033] text-white shadow-md"
        >
          <ArrowLeftRight size={19} />
        </button>

        <AirportAutocomplete
          id="to-airport"
          label="To"
          placeholder="City or airport"
          type="arrival"
          value={toAirport}
          query={toQuery}
          excludedAirportCode={fromAirport?.code}
          error={errors.to}
          onQueryChange={(value) => {
            setToQuery(value);
            setToAirport(null);

            setErrors((current) => ({
              ...current,
              to: undefined,
            }));
          }}
          onSelect={selectToAirport}
          onClear={clearToAirport}
        />
      </div>

      <div
        className={`mt-5 grid gap-3 ${
          tripType === "round-trip"
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        <DateSelector
          id="departure-date"
          label="Departure"
          value={departureDate}
          min={today}
          error={errors.departure}
          onChange={changeDepartureDate}
        />

        {tripType === "round-trip" && (
          <DateSelector
            id="return-date"
            label="Return"
            value={returnDate}
            min={departureDate || today}
            error={errors.return}
            onChange={(value) => {
              setReturnDate(value);

              setErrors((current) => ({
                ...current,
                return: undefined,
              }));
            }}
          />
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <PassengerSelector
          value={passengers}
          open={passengersOpen}
          error={errors.passengers}
          onOpen={() => setPassengersOpen(true)}
          onClose={() => setPassengersOpen(false)}
          onChange={(value) => {
            setPassengers(value);

            setErrors((current) => ({
              ...current,
              passengers: undefined,
            }));
          }}
        />

        <CabinClassSelector
          value={cabinClass}
          open={cabinClassOpen}
          error={errors.cabinClass}
          onOpen={() => setCabinClassOpen(true)}
          onClose={() => setCabinClassOpen(false)}
          onChange={(value) => {
            setCabinClass(value);

            setErrors((current) => ({
              ...current,
              cabinClass: undefined,
            }));
          }}
        />
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
  );
}

export type BookingSearchParams = {
  flight: string;
  tripType: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  airline: string;
  flightCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  baggage: string;
  baseFare: number;
  taxes: number;
  serviceFee: number;
  flightTotal: number;
  extras: number;
  paymentTotal: number;
  method: string;
};

type SearchParamsReader = {
  get(name: string): string | null;
};

const defaultFlights: Record<
  string,
  {
    airline: string;
    flightCode: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: string;
    baggage: string;
    baseFare: number;
    taxes: number;
    serviceFee: number;
  }
> = {
  "1": {
    airline: "Emirates",
    flightCode: "EK 927",
    departureTime: "08:15",
    arrivalTime: "10:25",
    duration: "4h 10m",
    stops: "Direct",
    baggage: "25 kg",
    baseFare: 995,
    taxes: 200,
    serviceFee: 50,
  },
  "2": {
    airline: "EgyptAir",
    flightCode: "MS 911",
    departureTime: "11:30",
    arrivalTime: "13:50",
    duration: "4h 20m",
    stops: "Direct",
    baggage: "23 kg",
    baseFare: 880,
    taxes: 165,
    serviceFee: 50,
  },
  "3": {
    airline: "Qatar Airways",
    flightCode: "QR 1007",
    departureTime: "14:10",
    arrivalTime: "18:45",
    duration: "6h 35m",
    stops: "1 stop",
    baggage: "25 kg",
    baseFare: 930,
    taxes: 200,
    serviceFee: 50,
  },
  "4": {
    airline: "Etihad Airways",
    flightCode: "EY 655",
    departureTime: "18:25",
    arrivalTime: "20:40",
    duration: "4h 15m",
    stops: "Direct",
    baggage: "23 kg",
    baseFare: 1050,
    taxes: 220,
    serviceFee: 50,
  },
};

function safeNumber(
  value: string | null,
  fallback: number,
  minimum = 0
) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(minimum, parsed);
}

export function readBookingParams(
  searchParams: SearchParamsReader,
  routeFlightId?: string
): BookingSearchParams {
  const flight =
    routeFlightId ||
    searchParams.get("flight") ||
    "1";

  const fallbackFlight =
    defaultFlights[flight] || defaultFlights["1"];

  const adults = safeNumber(
    searchParams.get("adults"),
    1,
    1
  );

  const children = safeNumber(
    searchParams.get("children"),
    0
  );

  const infants = safeNumber(
    searchParams.get("infants"),
    0
  );

  const baseFare = safeNumber(
    searchParams.get("baseFare"),
    fallbackFlight.baseFare
  );

  const taxes = safeNumber(
    searchParams.get("taxes"),
    fallbackFlight.taxes
  );

  const serviceFee = safeNumber(
    searchParams.get("serviceFee"),
    fallbackFlight.serviceFee
  );

  const suppliedFlightTotal = safeNumber(
    searchParams.get("flightTotal") ||
      searchParams.get("total") ||
      searchParams.get("flightPrice"),
    0
  );

  const flightTotal =
    suppliedFlightTotal > 0
      ? suppliedFlightTotal
      : baseFare + taxes + serviceFee;

  const extras = safeNumber(
    searchParams.get("extras"),
    0
  );

  const suppliedPaymentTotal = safeNumber(
    searchParams.get("paymentTotal"),
    0
  );

  return {
    flight,
    tripType:
      searchParams.get("tripType") || "one-way",
    from:
      searchParams.get("from")?.toUpperCase() ||
      "DXB",
    fromCity:
      searchParams.get("fromCity") ||
      searchParams.get("from")?.toUpperCase() ||
      "Dubai",
    to:
      searchParams.get("to")?.toUpperCase() ||
      "CAI",
    toCity:
      searchParams.get("toCity") ||
      searchParams.get("to")?.toUpperCase() ||
      "Cairo",
    departureDate:
      searchParams.get("departureDate") || "",
    returnDate:
      searchParams.get("returnDate") || "",
    adults,
    children,
    infants,
    cabinClass:
      searchParams.get("cabinClass") || "Economy",
    airline:
      searchParams.get("airline") ||
      fallbackFlight.airline,
    flightCode:
      searchParams.get("flightCode") ||
      fallbackFlight.flightCode,
    departureTime:
      searchParams.get("departureTime") ||
      fallbackFlight.departureTime,
    arrivalTime:
      searchParams.get("arrivalTime") ||
      fallbackFlight.arrivalTime,
    duration:
      searchParams.get("duration") ||
      fallbackFlight.duration,
    stops:
      searchParams.get("stops") ||
      fallbackFlight.stops,
    baggage:
      searchParams.get("baggage") ||
      fallbackFlight.baggage,
    baseFare,
    taxes,
    serviceFee,
    flightTotal,
    extras,
    paymentTotal:
      suppliedPaymentTotal > 0
        ? suppliedPaymentTotal
        : flightTotal + extras,
    method:
      searchParams.get("method") || "",
  };
}

export function bookingParamsToUrl(
  booking: BookingSearchParams,
  additions: Record<string, string | number> = {}
) {
  const params = new URLSearchParams({
    flight: booking.flight,
    tripType: booking.tripType,
    from: booking.from,
    fromCity: booking.fromCity,
    to: booking.to,
    toCity: booking.toCity,
    departureDate: booking.departureDate,
    adults: String(booking.adults),
    children: String(booking.children),
    infants: String(booking.infants),
    cabinClass: booking.cabinClass,
    airline: booking.airline,
    flightCode: booking.flightCode,
    departureTime: booking.departureTime,
    arrivalTime: booking.arrivalTime,
    duration: booking.duration,
    stops: booking.stops,
    baggage: booking.baggage,
    baseFare: String(booking.baseFare),
    taxes: String(booking.taxes),
    serviceFee: String(booking.serviceFee),
    flightTotal: String(booking.flightTotal),
    extras: String(booking.extras),
    paymentTotal: String(booking.paymentTotal),
  });

  if (
    booking.tripType === "round-trip" &&
    booking.returnDate
  ) {
    params.set("returnDate", booking.returnDate);
  }

  if (booking.method) {
    params.set("method", booking.method);
  }

  Object.entries(additions).forEach(
    ([key, value]) => {
      params.set(key, String(value));
    }
  );

  return params.toString();
}

export function getPassengerCount(
  booking: BookingSearchParams
) {
  return (
    booking.adults +
    booking.children +
    booking.infants
  );
}

export function formatBookingDate(value: string) {
  if (!value) {
    return "Date not selected";
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

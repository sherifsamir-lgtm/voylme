"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Plane,
  Clock3,
  Luggage,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  ShieldCheck,
  Utensils,
} from "lucide-react";

import {
  bookingParamsToUrl,
  getPassengerCount,
  readBookingParams,
} from "@/lib/voylme/booking/query";

type FlightDetails = {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  duration: string;
  stops: string;
  aircraft: string;
  price: number;
  checkedBaggage: string;
  cabinBaggage: string;
};

const flights: Record<string, FlightDetails> = {
  "1": {
    id: "1",
    airline: "Emirates",
    flightNumber: "EK 927",
    departureTime: "08:15",
    arrivalTime: "10:25",
    departureAirport: "DXB",
    departureCity: "Dubai",
    arrivalAirport: "CAI",
    arrivalCity: "Cairo",
    duration: "4h 10m",
    stops: "Direct",
    aircraft: "Boeing 777-300ER",
    price: 1245,
    checkedBaggage: "25 kg",
    cabinBaggage: "7 kg",
  },
  "2": {
    id: "2",
    airline: "EgyptAir",
    flightNumber: "MS 911",
    departureTime: "11:30",
    arrivalTime: "13:50",
    departureAirport: "DXB",
    departureCity: "Dubai",
    arrivalAirport: "CAI",
    arrivalCity: "Cairo",
    duration: "4h 20m",
    stops: "Direct",
    aircraft: "Airbus A320neo",
    price: 1095,
    checkedBaggage: "23 kg",
    cabinBaggage: "8 kg",
  },
  "3": {
    id: "3",
    airline: "Qatar Airways",
    flightNumber: "QR 1007",
    departureTime: "14:10",
    arrivalTime: "18:45",
    departureAirport: "DXB",
    departureCity: "Dubai",
    arrivalAirport: "CAI",
    arrivalCity: "Cairo",
    duration: "6h 35m",
    stops: "1 stop",
    aircraft: "Airbus A350",
    price: 1180,
    checkedBaggage: "25 kg",
    cabinBaggage: "7 kg",
  },
  "4": {
    id: "4",
    airline: "Etihad Airways",
    flightNumber: "EY 655",
    departureTime: "18:25",
    arrivalTime: "20:40",
    departureAirport: "AUH",
    departureCity: "Abu Dhabi",
    arrivalAirport: "CAI",
    arrivalCity: "Cairo",
    duration: "4h 15m",
    stops: "Direct",
    aircraft: "Boeing 787-9",
    price: 1320,
    checkedBaggage: "23 kg",
    cabinBaggage: "7 kg",
  },
};

function FlightDetailsPageContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const flight = flights[params.id] ?? flights["1"];
  const booking = readBookingParams(
    searchParams,
    params.id
  );

  const passengerCount =
    getPassengerCount(booking);

  const totalPrice =
    booking.flightTotal * passengerCount;

  const bookingQuery =
    bookingParamsToUrl(booking, {
      paymentTotal: totalPrice,
    });

  return (
    <main className="min-h-screen bg-[#f7f5f6] pb-[116px]">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[68px] w-full max-w-[430px] items-center justify-between px-4">
          <Link
            href={`/flights/results?${bookingQuery}`}
            aria-label="Back to flight results"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#660033]/20 text-[#660033]"
          >
            <ArrowLeft size={21} />
          </Link>

          <div className="text-center">
            <h1 className="text-[18px] font-extrabold text-[#660033]">
              Flight Details
            </h1>

            <p className="text-[11px] text-gray-500">
              Review before continuing
            </p>
          </div>

          <div className="h-10 w-10" aria-hidden="true" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] px-4 pt-4">
        <section className="overflow-hidden rounded-[24px] bg-white shadow-sm">
          <div className="bg-[#660033] px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-white/75">
                  Outbound flight
                </p>

                <p className="mt-1 text-[15px] font-bold">
                  {booking.fromCity} to {booking.toCity}
                </p>
              </div>

              <div className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold">
                {booking.cabinClass}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#660033]/10 text-[#660033]">
                  <Plane size={23} />
                </div>

                <div>
                  <h2 className="text-[15px] font-extrabold text-slate-900">
                    {booking.airline}
                  </h2>

                  <p className="text-[11px] text-gray-500">
                    {booking.flightCode} · {flight.aircraft}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-700">
                Confirmed
              </span>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-[24px] font-black text-slate-900">
                  {booking.departureTime}
                </p>

                <p className="text-[14px] font-extrabold text-[#660033]">
                  {booking.from}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {booking.fromCity}
                </p>
              </div>

              <div className="min-w-[118px] text-center">
                <p className="mb-2 text-[10px] text-gray-500">
                  {booking.duration}
                </p>

                <div className="relative h-[1px] bg-gray-300">
                  <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full bg-[#660033]" />

                  <Plane
                    size={14}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-[1px] text-[#660033]"
                  />

                  <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-[#660033]" />
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#660033]">
                  {booking.stops}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[24px] font-black text-slate-900">
                  {booking.arrivalTime}
                </p>

                <p className="text-[14px] font-extrabold text-[#660033]">
                  {booking.to}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {booking.toCity}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 rounded-[16px] bg-gray-50 p-3">
                <Clock3 size={17} className="shrink-0 text-[#660033]" />

                <div>
                  <p className="text-[10px] text-gray-500">
                    Duration
                  </p>

                  <p className="text-[12px] font-bold text-slate-800">
                    {booking.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-[16px] bg-gray-50 p-3">
                <Plane size={17} className="shrink-0 text-[#660033]" />

                <div>
                  <p className="text-[10px] text-gray-500">
                    Journey
                  </p>

                  <p className="text-[12px] font-bold text-slate-800">
                    {booking.stops}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <h2 className="text-[15px] font-extrabold text-slate-900">
            Baggage allowance
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-[16px] bg-[#660033]/5 p-3">
              <div className="flex items-center gap-3">
                <Luggage size={20} className="text-[#660033]" />

                <div>
                  <p className="text-[12px] font-bold text-slate-800">
                    Checked baggage
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Included in your fare
                  </p>
                </div>
              </div>

              <p className="text-[13px] font-extrabold text-[#660033]">
                {booking.baggage}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-[16px] bg-[#660033]/5 p-3">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness size={20} className="text-[#660033]" />

                <div>
                  <p className="text-[12px] font-bold text-slate-800">
                    Cabin baggage
                  </p>

                  <p className="text-[10px] text-gray-500">
                    One cabin bag
                  </p>
                </div>
              </div>

              <p className="text-[13px] font-extrabold text-[#660033]">
                {flight.cabinBaggage}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <h2 className="text-[15px] font-extrabold text-slate-900">
            Included in this fare
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <Check
                size={17}
                className="shrink-0 rounded-full bg-green-100 p-[2px] text-green-700"
              />
              Standard seat
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <Utensils
                size={17}
                className="shrink-0 text-[#660033]"
              />
              Meal included
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <ShieldCheck
                size={17}
                className="shrink-0 text-[#660033]"
              />
              Secure booking
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <Check
                size={17}
                className="shrink-0 rounded-full bg-green-100 p-[2px] text-green-700"
              />
              Taxes included
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">
                Total for {passengerCount} passenger
              {passengerCount === 1 ? "" : "s"}
              </p>

              <p className="mt-1 text-[24px] font-black text-[#660033]">
                AED {totalPrice}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-500">
                Includes taxes
              </p>

              <p className="mt-1 text-[10px] font-semibold text-green-700">
                No hidden fees
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[430px] items-center gap-3">
          <div className="shrink-0">
            <p className="text-[9px] text-gray-500">
              Total
            </p>

            <p className="text-[18px] font-black text-[#660033]">
              AED {totalPrice}
            </p>
          </div>

          <Link
            href={`/flights/passengers?${bookingQuery}`}
            className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-[#660033] text-[14px] font-bold text-white shadow-md"
          >
            Continue
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function FlightDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f5f6]">
          <p className="font-bold text-[#660033]">
            Loading flight details...
          </p>
        </main>
      }
    >
      <FlightDetailsPageContent />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Download,
  Home,
  Mail,
  MapPin,
  Plane,
  Ticket,
} from "lucide-react";

export default function BookingConfirmationPage() {
  const bookingReference = "VYL-9X4A7P";

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f5f6] pb-8 text-[#171522]">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="relative mx-auto flex h-[82px] w-full max-w-[430px] items-center justify-center px-4">
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#eadce3] bg-white text-[#660033]"
          >
            <ArrowLeft size={24} />
          </Link>

          <div className="text-center">
            <h1 className="text-[21px] font-extrabold text-[#660033]">
              Booking Confirmed
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Your trip is ready
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] space-y-5 px-4 py-5">
        <section className="w-full overflow-hidden rounded-[30px] bg-[#660033] px-5 py-7 text-center text-white shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <Check
              size={42}
              strokeWidth={3}
              className="text-[#660033]"
            />
          </div>

          <h2 className="mt-5 text-[28px] font-extrabold">
            Booking Confirmed
          </h2>

          <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-white/80">
            Your flight has been successfully booked. A confirmation has
            been sent to your email.
          </p>

          <div className="mt-6 rounded-[22px] bg-white/10 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Booking Reference
            </p>

            <p className="mt-2 text-[26px] font-extrabold tracking-[0.12em]">
              {bookingReference}
            </p>
          </div>
        </section>

        <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Plane size={24} className="text-[#660033]" />

            <div>
              <p className="text-sm text-gray-500">Your flight</p>
              <h3 className="text-[20px] font-extrabold">
                Dubai to Cairo
              </h3>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <p className="text-[28px] font-extrabold text-[#660033]">
                DXB
              </p>
              <p className="mt-1 text-sm text-gray-500">Dubai</p>
              <p className="mt-2 text-sm font-bold">10:30 AM</p>
            </div>

            <div className="flex min-w-0 items-center">
              <span className="h-px w-5 bg-gray-300" />
              <Plane
                size={20}
                className="mx-2 shrink-0 rotate-90 text-[#660033]"
              />
              <span className="h-px w-5 bg-gray-300" />
            </div>

            <div className="text-right">
              <p className="text-[28px] font-extrabold text-[#660033]">
                CAI
              </p>
              <p className="mt-1 text-sm text-gray-500">Cairo</p>
              <p className="mt-2 text-sm font-bold">12:50 PM</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
            <div className="flex items-start gap-3">
              <CalendarDays
                size={21}
                className="mt-0.5 shrink-0 text-[#660033]"
              />

              <div>
                <p className="text-xs text-gray-500">Departure date</p>
                <p className="mt-1 font-bold">Tuesday, 21 July 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                size={21}
                className="mt-0.5 shrink-0 text-[#660033]"
              />

              <div>
                <p className="text-xs text-gray-500">Airport</p>
                <p className="mt-1 font-bold">
                  Dubai International Airport
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Terminal 1
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ticket
                size={21}
                className="mt-0.5 shrink-0 text-[#660033]"
              />

              <div>
                <p className="text-xs text-gray-500">Airline</p>
                <p className="mt-1 font-bold">EgyptAir · MS 911</p>
                <p className="mt-1 text-sm text-gray-500">
                  Economy Class
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
          <h3 className="text-[20px] font-extrabold">
            Passenger Details
          </h3>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-extrabold">
                Sherif Samir Sayed
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Adult · Economy
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#f7eaf0] px-3 py-2 text-xs font-extrabold text-[#660033]">
              Confirmed
            </span>
          </div>
        </section>

        <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Amount paid</p>
              <p className="mt-1 text-[26px] font-extrabold text-[#660033]">
                AED 1,245
              </p>
            </div>

            <span className="rounded-full bg-[#eafff3] px-3 py-2 text-xs font-extrabold text-[#087746]">
              Paid
            </span>
          </div>
        </section>

        <section className="grid w-full grid-cols-2 gap-3">
          <button
            type="button"
            className="flex min-h-[74px] min-w-0 items-center justify-center gap-2 rounded-[22px] border border-[#660033] bg-white px-3 text-sm font-extrabold text-[#660033]"
          >
            <Download size={20} />
            <span>Download Ticket</span>
          </button>

          <button
            type="button"
            className="flex min-h-[74px] min-w-0 items-center justify-center gap-2 rounded-[22px] border border-[#660033] bg-white px-3 text-sm font-extrabold text-[#660033]"
          >
            <Mail size={20} />
            <span>Email Ticket</span>
          </button>
        </section>

        <Link
          href="/my-trips"
          className="flex h-16 w-full items-center justify-center rounded-[22px] bg-[#660033] text-[17px] font-extrabold text-white shadow-md"
        >
          View My Trips
        </Link>

        <Link
          href="/"
          className="flex h-16 w-full items-center justify-center gap-2 rounded-[22px] border border-[#660033] bg-white text-[17px] font-extrabold text-[#660033]"
        >
          <Home size={21} />
          Back to Home
        </Link>

        <p className="px-4 text-center text-xs leading-5 text-gray-500">
          Keep your booking reference safe. You may need it to manage your
          trip or contact support.
        </p>
      </div>
    </main>
  );
}

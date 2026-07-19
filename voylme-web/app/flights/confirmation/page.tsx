"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Home,
  Mail,
  Plane,
  Printer,
  Share2,
} from "lucide-react";

import {
  formatBookingDate,
  readBookingParams,
} from "@/lib/voylme/booking/query";

type DetailProps = {
  label: string;
  value: string;
  align?: "left" | "right";
  strong?: boolean;
};

function Detail({
  label,
  value,
  align = "left",
  strong = false,
}: DetailProps) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8a7c82] sm:text-[9px]">
        {label}
      </p>

      <p
        className={[
          "mt-1 truncate text-[#241a1f]",
          strong
            ? "text-[14px] font-black sm:text-[16px]"
            : "text-[11px] font-extrabold sm:text-[12px]",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function DestinationWatermark({
  destination,
}: {
  destination: string;
}) {
  const code = destination.toUpperCase();

  if (code === "CAI") {
    return (
      <svg
        viewBox="0 0 320 150"
        aria-hidden="true"
        className="h-full w-full"
      >
        <path
          d="M28 126 88 34l60 92H28Zm82 0 56-72 56 72H110Zm91 0 42-53 49 53h-91Z"
          fill="currentColor"
        />
        <circle cx="248" cy="47" r="15" fill="currentColor" />
        <path
          d="M230 92c8-15 23-24 41-24 14 0 25 5 33 13l-5 11h-20l-7 14h-57l15-14Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (code === "DXB") {
    return (
      <svg
        viewBox="0 0 320 150"
        aria-hidden="true"
        className="h-full w-full"
      >
        <path
          d="M150 130h30l-7-87-8-26-8 26-7 87Zm-36 0h26V70h-26v60Zm76 0h31V84h-31v46Zm42 0h48V96h-48v34ZM44 130h56V105H44v25Z"
          fill="currentColor"
        />
        <path
          d="M31 130h262"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (code === "CDG" || code === "ORY") {
    return (
      <svg
        viewBox="0 0 320 150"
        aria-hidden="true"
        className="h-full w-full"
      >
        <path
          d="m160 18-18 34h11l-22 69h-25v10h108v-10h-25l-22-69h11l-18-34Zm0 42 12 42h-24l12-42Zm-38 61 17-55h8l-14 55h-11Zm65 0-14-55h8l17 55h-11Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (code === "JFK" || code === "LGA" || code === "EWR") {
    return (
      <svg
        viewBox="0 0 320 150"
        aria-hidden="true"
        className="h-full w-full"
      >
        <path
          d="M150 28h20l5 26 14 10-8 12v54h-42V76l-8-12 14-10 5-26Zm10-17 7 13h-14l7-13Zm-45 119h90v8h-90v-8Z"
          fill="currentColor"
        />
        <path
          d="M55 130h42V83H55v47Zm164 0h45V70h-45v60Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 150"
      aria-hidden="true"
      className="h-full w-full"
    >
      <circle
        cx="160"
        cy="75"
        r="54"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
      />
      <path
        d="M106 75h108M160 21c19 18 29 36 29 54s-10 36-29 54c-19-18-29-36-29-54s10-36 29-54Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
    </svg>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const booking = readBookingParams(searchParams);

  const passenger =
    searchParams.get("passenger") ||
    searchParams.get("passengerName") ||
    "Sherif Samir Sayed";

  const gate = searchParams.get("gate") || "B12";
  const seat = searchParams.get("seat") || "18A";
  const terminal = searchParams.get("terminal") || "1";
  const zone = searchParams.get("zone") || "3";

  const bookingReference = useMemo(() => {
    const source =
      `${booking.flightCode}${booking.from}${booking.to}${booking.departureDate}`
        .replace(/[^A-Z0-9]/gi, "")
        .toUpperCase();

    let hash = 0;

    for (let index = 0; index < source.length; index += 1) {
      hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
    }

    return `VYL-${hash.toString(36).toUpperCase().slice(0, 6).padEnd(6, "0")}`;
  }, [
    booking.departureDate,
    booking.flightCode,
    booking.from,
    booking.to,
  ]);

  const ticketNumber = useMemo(() => {
    const raw = `${booking.flight}${booking.departureDate.replace(/\D/g, "")}${booking.paymentTotal}`;
    return `176-${raw.padEnd(10, "0").slice(0, 10)}`;
  }, [
    booking.departureDate,
    booking.flight,
    booking.paymentTotal,
  ]);

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt("Copy this value:", value);
    }
  };

  const handleShare = async () => {
    const shareText = [
      "VOYLME Boarding Pass",
      `${booking.from} → ${booking.to}`,
      `${booking.flightCode} · ${formatBookingDate(
        booking.departureDate
      )}`,
      `Booking reference: ${bookingReference}`,
    ].join("\n");

    if (navigator.share) {
      await navigator.share({
        title: "VOYLME Boarding Pass",
        text: shareText,
      });

      return;
    }

    await copyText(shareText);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `VOYLME Boarding Pass ${bookingReference}`
    );

    const body = encodeURIComponent(
      [
        `Passenger: ${passenger}`,
        `Route: ${booking.from} to ${booking.to}`,
        `Flight: ${booking.flightCode}`,
        `Date: ${formatBookingDate(booking.departureDate)}`,
        `Departure: ${booking.departureTime}`,
        `Arrival: ${booking.arrivalTime}`,
        `Booking reference: ${bookingReference}`,
        `E-ticket: ${ticketNumber}`,
      ].join("\n")
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0f1] pb-10 text-[#21171c] print:bg-white print:pb-0">
      <header className="sticky top-0 z-40 border-b border-[#e8dde1] bg-white/95 backdrop-blur print:hidden">
        <div className="relative mx-auto flex h-[82px] max-w-[430px] items-center justify-center px-4">
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#eadce3] bg-white text-[#660033]"
          >
            <ArrowLeft size={24} />
          </Link>

          <div className="text-center">
            <h1 className="text-[21px] font-black text-[#660033]">
              Boarding Pass
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Your trip is confirmed
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[980px] px-4 py-5 print:max-w-none print:p-0">
        <section className="mb-5 rounded-[24px] bg-[#660033] px-5 py-5 text-white shadow-lg print:hidden">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
              <Check
                size={30}
                strokeWidth={3}
                className="text-[#660033]"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-[20px] font-black">
                Booking confirmed
              </h2>

              <p className="mt-1 text-sm leading-5 text-white/75">
                Your dynamic boarding pass is ready.
              </p>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto pb-3 print:overflow-visible print:pb-0">
          <article
            id="voylme-boarding-pass"
            className="relative mx-auto grid min-h-[312px] w-[768px] grid-cols-[106px_1fr_214px] overflow-hidden rounded-[26px] border border-[#eadfe3] bg-[#fffdf8] shadow-[0_20px_55px_rgba(55,17,35,0.16)] print:h-[8.25cm] print:min-h-0 print:w-[20.3cm] print:rounded-[18px] print:shadow-none"
          >
            <aside className="relative flex flex-col items-center justify-between overflow-hidden bg-[#660033] px-3 py-6 text-center text-white">
              <div className="relative z-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10">
                  <Plane
                    size={29}
                    strokeWidth={1.8}
                    className="-rotate-12"
                  />
                </div>

                <p className="mt-3 text-[17px] font-black tracking-[0.16em]">
                  VOYLME
                </p>

                <p className="mt-2 text-[7px] font-semibold uppercase leading-3 tracking-[0.14em] text-white/75">
                  Your Personal
                  <br />
                  Travel Assistant
                </p>
              </div>

              <p className="relative z-10 text-[8px] font-bold uppercase tracking-[0.15em] text-white/75 [writing-mode:vertical-rl]">
                Travel made simple
              </p>

              <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full border-[24px] border-white/5" />
            </aside>

            <section className="relative overflow-hidden px-6 py-5">
              <div className="pointer-events-none absolute bottom-1 right-4 h-[142px] w-[300px] text-[#660033]/[0.055]">
                <DestinationWatermark
                  destination={booking.to}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#660033]">
                      Boarding Pass
                    </p>

                    <p className="mt-1 text-[12px] font-black text-[#241a1f]">
                      {booking.airline}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8a7c82]">
                      Status
                    </p>

                    <span className="mt-1 inline-flex rounded-full bg-[#e9f8ef] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#087746]">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_90px_1fr] items-center gap-3">
                  <div>
                    <p className="text-[37px] font-black leading-none tracking-[-0.04em] text-[#660033]">
                      {booking.from}
                    </p>

                    <p className="mt-2 max-w-[130px] truncate text-[11px] font-bold text-[#574a50]">
                      {booking.fromCity}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className="h-px flex-1 bg-[#cebfc5]" />

                    <div className="mx-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#decfd5] bg-white text-[#660033]">
                      <Plane
                        size={18}
                        className="rotate-90"
                      />
                    </div>

                    <span className="h-px flex-1 bg-[#cebfc5]" />
                  </div>

                  <div className="text-right">
                    <p className="text-[37px] font-black leading-none tracking-[-0.04em] text-[#660033]">
                      {booking.to}
                    </p>

                    <p className="mt-2 truncate text-[11px] font-bold text-[#574a50]">
                      {booking.toCity}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-4 border-t border-[#eadfe3] pt-4">
                  <Detail
                    label="Passenger"
                    value={passenger}
                    strong
                  />

                  <Detail
                    label="Flight"
                    value={booking.flightCode}
                  />

                  <Detail
                    label="Date"
                    value={formatBookingDate(
                      booking.departureDate
                    )}
                    align="right"
                  />

                  <Detail
                    label="Departure"
                    value={booking.departureTime}
                    strong
                  />

                  <Detail
                    label="Arrival"
                    value={booking.arrivalTime}
                    strong
                  />

                  <Detail
                    label="Cabin"
                    value={booking.cabinClass}
                    align="right"
                  />

                  <Detail
                    label="Gate"
                    value={gate}
                  />

                  <Detail
                    label="Seat"
                    value={seat}
                  />

                  <Detail
                    label="Terminal · Zone"
                    value={`${terminal} · ${zone}`}
                    align="right"
                  />

                  <Detail
                    label="Baggage"
                    value={booking.baggage}
                  />

                  <Detail
                    label="Duration"
                    value={booking.duration}
                  />

                  <Detail
                    label="Stops"
                    value={booking.stops}
                    align="right"
                  />
                </div>
              </div>
            </section>

            <aside className="relative border-l-2 border-dashed border-[#d8c8ce] bg-white/80 px-5 py-5">
              <span className="absolute -left-[13px] -top-[13px] h-6 w-6 rounded-full bg-[#f4f0f1] print:bg-white" />
              <span className="absolute -bottom-[13px] -left-[13px] h-6 w-6 rounded-full bg-[#f4f0f1] print:bg-white" />

              <div className="flex h-full flex-col">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#660033]">
                    VOYLME
                  </p>

                  <p className="mt-2 text-[19px] font-black leading-none text-[#241a1f]">
                    {booking.from}
                    <span className="mx-2 text-[#b59da7]">→</span>
                    {booking.to}
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8a7c82]">
                      Booking Ref
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(bookingReference)
                      }
                      className="mt-1 flex items-center gap-2 text-left text-[17px] font-black tracking-[0.08em] text-[#660033] print:pointer-events-none"
                    >
                      {bookingReference}
                      <Copy
                        size={13}
                        className="print:hidden"
                      />
                    </button>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8a7c82]">
                      E-ticket
                    </p>

                    <button
                      type="button"
                      onClick={() => copyText(ticketNumber)}
                      className="mt-1 flex items-center gap-2 text-left text-[12px] font-black tracking-[0.06em] text-[#241a1f] print:pointer-events-none"
                    >
                      {ticketNumber}
                      <Copy
                        size={12}
                        className="print:hidden"
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3">
                  <div className="grid h-[88px] w-[88px] shrink-0 grid-cols-7 gap-[2px] border-[5px] border-white bg-white p-[2px] shadow-[0_0_0_1px_#d8c8ce]">
                    {Array.from({ length: 49 }).map(
                      (_, index) => {
                        const active =
                          ((index * 7 +
                            bookingReference.charCodeAt(
                              index %
                                bookingReference.length
                            )) %
                            5) <
                          3;

                        return (
                          <span
                            key={index}
                            className={
                              active
                                ? "bg-[#21171c]"
                                : "bg-transparent"
                            }
                          />
                        );
                      }
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <Detail
                      label="Gate"
                      value={gate}
                    />

                    <div className="mt-3">
                      <Detail
                        label="Seat"
                        value={seat}
                      />
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-4 h-9 w-full bg-[repeating-linear-gradient(90deg,#241a1f_0px,#241a1f_2px,transparent_2px,transparent_4px,#241a1f_4px,#241a1f_7px,transparent_7px,transparent_9px)]"
                />
              </div>
            </aside>
          </article>
        </div>

        <p className="mt-2 text-center text-xs text-[#786a70] print:hidden">
          Swipe horizontally to view the full boarding pass.
        </p>

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[62px] items-center justify-center gap-2 rounded-[20px] border border-[#660033] bg-white px-3 text-sm font-black text-[#660033]"
          >
            <Printer size={19} />
            Print / PDF
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[62px] items-center justify-center gap-2 rounded-[20px] border border-[#660033] bg-white px-3 text-sm font-black text-[#660033]"
          >
            <Download size={19} />
            Download
          </button>

          <button
            type="button"
            onClick={handleEmail}
            className="flex min-h-[62px] items-center justify-center gap-2 rounded-[20px] border border-[#660033] bg-white px-3 text-sm font-black text-[#660033]"
          >
            <Mail size={19} />
            Email
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex min-h-[62px] items-center justify-center gap-2 rounded-[20px] bg-[#660033] px-3 text-sm font-black text-white"
          >
            <Share2 size={19} />
            Share
          </button>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 print:hidden">
          <Link
            href="/"
            className="flex h-15 items-center justify-center rounded-[20px] bg-[#660033] px-5 text-[16px] font-black text-white"
          >
            View My Trips
          </Link>

          <Link
            href="/"
            className="flex h-15 items-center justify-center gap-2 rounded-[20px] border border-[#660033] bg-white px-5 text-[16px] font-black text-[#660033]"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        <p className="mt-5 px-4 text-center text-xs leading-5 text-gray-500 print:hidden">
          Gate, seat, terminal and zone are currently sample values until
          live airline booking data is connected.
        </p>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: 20.3cm 8.25cm;
            margin: 0;
          }

          html,
          body {
            width: 20.3cm;
            height: 8.25cm;
            margin: 0;
            padding: 0;
            background: white;
          }

          body * {
            visibility: hidden;
          }

          #voylme-boarding-pass,
          #voylme-boarding-pass * {
            visibility: visible;
          }

          #voylme-boarding-pass {
            position: fixed;
            inset: 0;
          }
        }
      `}</style>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f4f0f1]">
          <p className="font-bold text-[#660033]">
            Preparing your boarding pass...
          </p>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

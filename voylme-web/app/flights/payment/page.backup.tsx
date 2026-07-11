"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const paymentMethods = [
  "Card",
  "Apple Pay",
  "Google Pay",
  "PayPal",
  "Voylme Wallet",
  "Tabby",
  "Tamara",
];

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const flightId = searchParams.get("flight") ?? "1";
  const extras = Number(searchParams.get("extras") ?? "0");

  const flightPrice = 1245;
  const total = flightPrice + extras;

  return (
    <main className="min-h-screen bg-[#f7f5f6] pb-28">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-[68px] max-w-[430px] items-center px-4">
          <Link
            href={`/flights/extras?flight=${flightId}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border text-[#660033]"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className="flex-1 text-center text-lg font-extrabold text-[#660033]">
            Secure Payment
          </h1>

          <div className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-[430px] space-y-4 p-4">
        <section className="rounded-[22px] bg-[#660033] p-4 text-white">
          <p className="text-xs opacity-75">
            Total amount
          </p>

          <p className="mt-1 text-3xl font-black">
            AED {total}
          </p>

          <p className="mt-1 text-xs opacity-80">
            Flight AED {flightPrice} · Extras AED {extras}
          </p>
        </section>

        <section className="rounded-[22px] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-[#660033]" />

            <h2 className="font-extrabold text-slate-900">
              Choose payment method
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method}
                type="button"
                className="h-14 rounded-2xl border border-[#660033]/20 bg-white text-sm font-bold text-[#660033]"
              >
                {method}
              </button>
            ))}
          </div>
        </section>

        <section className="flex items-center gap-3 rounded-[20px] bg-green-50 p-4">
          <ShieldCheck size={22} className="text-green-700" />

          <div>
            <p className="text-xs font-bold text-green-800">
              Secure encrypted payment
            </p>

            <p className="text-[10px] text-green-700">
              Voylme does not store full card details.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


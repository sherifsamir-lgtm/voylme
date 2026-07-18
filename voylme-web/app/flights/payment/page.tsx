"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CreditCard,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import {
  bookingParamsToUrl,
  readBookingParams,
} from "@/lib/voylme/booking/query";

type PaymentMethodId =
  | "card"
  | "apple-pay"
  | "google-pay"
  | "paypal"
  | "wallet"
  | "tabby"
  | "tamara";

type PaymentMethod = {
  id: PaymentMethodId;
  name: string;
  subtitle: string;
  status?: "available" | "coming-soon";
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Visa · Mastercard · Amex",
    subtitle: "Credit or Debit Card",
    status: "available",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    subtitle: "Apple Pay",
    status: "available",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    subtitle: "Google Pay",
    status: "available",
  },
  {
    id: "paypal",
    name: "PayPal",
    subtitle: "PayPal",
    status: "available",
  },
  {
    id: "wallet",
    name: "Voylme Wallet",
    subtitle: "Use your wallet balance",
    status: "available",
  },
  {
    id: "tabby",
    name: "Pay in installments",
    subtitle: "Tabby",
    status: "coming-soon",
  },
  {
    id: "tamara",
    name: "Pay in installments",
    subtitle: "Tamara",
    status: "coming-soon",
  },
];

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking = readBookingParams(searchParams);

  const flightPrice =
    booking.paymentTotal - booking.extras;

  const extrasPrice = booking.extras;
  const total = booking.paymentTotal;
  const flightId = booking.flight;

  const bookingQuery =
    bookingParamsToUrl(booking);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodId>("card");

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPayment = useMemo(
    () =>
      paymentMethods.find((method) => method.id === selectedMethod) ??
      paymentMethods[0],
    [selectedMethod]
  );

  const selectPaymentMethod = (method: PaymentMethod) => {
    if (method.status === "coming-soon") return;
    setSelectedMethod(method.id);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);
    return numbers.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 4);

    if (numbers.length <= 2) return numbers;

    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  };

  const handlePayment = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    setTimeout(() => {
      router.push(
        `/flights/confirmation?${bookingParamsToUrl(
          booking,
          {
            paymentTotal: total,
            method: selectedMethod,
          }
        )}`
      );
    }, 900);
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f5f6] pb-40 text-[#151827]">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="relative mx-auto flex h-[82px] w-full max-w-[430px] items-center justify-center px-4">
          <Link
            href={`/flights/extras?${bookingQuery}`}
            aria-label="Back to extras"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#e5d9df] bg-white text-[#80003f]"
          >
            <ArrowLeft size={25} />
          </Link>

          <div className="min-w-0 text-center">
            <h1 className="truncate text-[21px] font-extrabold text-[#80003f]">
              Secure Payment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Complete your booking
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] space-y-5 px-4 py-5">
        <section className="w-full overflow-hidden rounded-[28px] bg-[#80003f] px-5 py-6 text-white shadow-lg">
          <p className="text-sm text-white/75">
            Total amount
          </p>

          <p className="mt-3 text-[38px] font-extrabold leading-none">
            AED {total}
          </p>

          <div className="mt-5 space-y-3 rounded-[20px] bg-white/10 p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-white/75">
                Base fare
              </span>

              <span className="font-bold">
                AED {booking.baseFare}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-white/75">
                Taxes
              </span>

              <span className="font-bold">
                AED {booking.taxes}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-white/75">
                Service fee
              </span>

              <span className="font-bold">
                AED {booking.serviceFee}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-white/75">
                Extras
              </span>

              <span className="font-bold">
                AED {extrasPrice}
              </span>
            </div>

            <div className="border-t border-white/20 pt-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-extrabold">
                  Total
                </span>

                <span className="text-lg font-extrabold">
                  AED {total}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <CreditCard
              size={24}
              className="shrink-0 text-[#80003f]"
            />

            <h2 className="min-w-0 text-[20px] font-extrabold">
              Choose payment method
            </h2>
          </div>

          <div className="mt-5 grid w-full grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const selected = method.id === selectedMethod;
              const comingSoon = method.status === "coming-soon";

              return (
                <button
                  key={method.id}
                  type="button"
                  disabled={comingSoon}
                  onClick={() => selectPaymentMethod(method)}
                  className={[
                    "relative min-h-[124px] min-w-0 overflow-hidden rounded-[22px] border p-4 text-left transition",
                    selected
                      ? "border-2 border-[#80003f] bg-[#fff8fb]"
                      : "border-gray-200 bg-white",
                    comingSoon
                      ? "cursor-not-allowed opacity-45"
                      : "active:scale-[0.98]",
                  ].join(" ")}
                >
                  {selected && !comingSoon && (
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#80003f] text-white">
                      <Check size={18} strokeWidth={3} />
                    </span>
                  )}

                  {method.id === "wallet" && (
                    <WalletCards
                      size={29}
                      className="mb-3 text-[#80003f]"
                    />
                  )}

                  <p className="max-w-[90%] break-words text-[17px] font-extrabold leading-snug text-[#80003f]">
                    {method.name}
                  </p>

                  <p className="mt-2 break-words text-[13px] font-semibold leading-snug text-gray-700">
                    {method.subtitle}
                  </p>

                  {comingSoon && (
                    <p className="mt-2 text-[11px] font-semibold text-gray-500">
                      Coming soon
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {selectedMethod === "card" ? (
          <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
            <h2 className="text-[20px] font-extrabold">
              Card details
            </h2>

            <div className="mt-5 space-y-3">
              <input
                type="text"
                value={cardholderName}
                onChange={(event) =>
                  setCardholderName(event.target.value)
                }
                placeholder="Cardholder name"
                autoComplete="cc-name"
                className="h-16 w-full min-w-0 rounded-[20px] border border-gray-200 bg-white px-5 text-base outline-none focus:border-[#80003f]"
              />

              <input
                type="tel"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(formatCardNumber(event.target.value))
                }
                placeholder="Card number"
                autoComplete="cc-number"
                className="h-16 w-full min-w-0 rounded-[20px] border border-gray-200 bg-white px-5 text-base outline-none focus:border-[#80003f]"
              />

              <div className="grid w-full grid-cols-2 gap-3">
                <input
                  type="tel"
                  inputMode="numeric"
                  value={expiry}
                  onChange={(event) =>
                    setExpiry(formatExpiry(event.target.value))
                  }
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  className="h-16 min-w-0 rounded-[20px] border border-gray-200 bg-white px-5 text-base outline-none focus:border-[#80003f]"
                />

                <input
                  type="tel"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    )
                  }
                  placeholder="CVV"
                  autoComplete="cc-csc"
                  className="h-16 min-w-0 rounded-[20px] border border-gray-200 bg-white px-5 text-base outline-none focus:border-[#80003f]"
                />
              </div>
            </div>
          </section>
        ) : (
          <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
            <h2 className="break-words text-[20px] font-extrabold">
              Pay with {selectedPayment.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You will be securely redirected to complete your payment.
            </p>
          </section>
        )}

        <section className="w-full overflow-hidden rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[20px] font-extrabold">
            Promo Code
          </h2>

          <div className="mt-5 flex w-full min-w-0 gap-3">
            <input
              type="text"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="Enter promo code"
              className="h-16 min-w-0 flex-1 rounded-[20px] border border-gray-200 bg-white px-4 text-base outline-none focus:border-[#80003f]"
            />

            <button
              type="button"
              className="h-16 shrink-0 rounded-[20px] bg-[#80003f] px-4 text-[16px] font-extrabold text-white active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        </section>

        <section className="flex w-full min-w-0 items-start gap-3 overflow-hidden rounded-[24px] bg-[#edfff5] p-5">
          <ShieldCheck
            size={28}
            className="mt-0.5 shrink-0 text-[#069957]"
          />

          <div className="min-w-0">
            <p className="break-words font-extrabold text-[#087746]">
              Secure encrypted payment
            </p>

            <p className="mt-1 break-words text-sm leading-5 text-[#087746]">
              Voylme never stores your full card details.
            </p>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full overflow-hidden border-t border-gray-200 bg-white px-4 pb-4 pt-3">
        <div className="mx-auto w-full max-w-[430px]">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePayment}
            className="h-16 w-full rounded-[22px] bg-[#80003f] text-[19px] font-extrabold text-white shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isProcessing
              ? "Processing Payment..."
              : `Pay AED ${total}`}
          </button>

          <p className="mt-2 truncate text-center text-xs text-gray-500">
            Paying with {selectedPayment.name}
          </p>
        </div>
      </div>
    </main>
  );
}
export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f5f6]">
          <p className="font-bold text-[#660033]">
            Loading payment...
          </p>
        </main>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}

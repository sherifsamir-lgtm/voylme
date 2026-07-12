"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import PassengerCard, {
  type PassengerType,
} from "@/components/passenger/PassengerCard";

import PassengerFields, {
  type PassengerFormData,
} from "@/components/passenger/PassengerFields";

type PassengerRecord = {
  id: string;
  type: PassengerType;
  index: number;
  data: PassengerFormData;
};

const flightPrices: Record<string, number> = {
  "1": 1245,
  "2": 1095,
  "3": 1180,
  "4": 1320,
};

function createEmptyPassenger(
  type: PassengerType
): PassengerFormData {
  return {
    title: type === "adult" ? "Mr" : "Master",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportCountry: "",
    passportIssue: "",
    passportExpiry: "",
    email: "",
    phoneCode: "AE",
    phone: "",
  };
}

function createPassengers(
  adults: number,
  children: number,
  infants: number
): PassengerRecord[] {
  const result: PassengerRecord[] = [];

  for (let index = 0; index < adults; index += 1) {
    result.push({
      id: `adult-${index + 1}`,
      type: "adult",
      index,
      data: createEmptyPassenger("adult"),
    });
  }

  for (let index = 0; index < children; index += 1) {
    result.push({
      id: `child-${index + 1}`,
      type: "child",
      index,
      data: createEmptyPassenger("child"),
    });
  }

  for (let index = 0; index < infants; index += 1) {
    result.push({
      id: `infant-${index + 1}`,
      type: "infant",
      index,
      data: createEmptyPassenger("infant"),
    });
  }

  return result;
}
function isPassengerComplete(
  passenger: PassengerRecord
) {
  const data = passenger.data;

  return (
    data.firstName.trim() !== "" &&
    data.lastName.trim() !== "" &&
    data.dateOfBirth !== "" &&
    data.nationality !== "" &&
    data.passportNumber.trim() !== "" &&
    data.passportCountry !== "" &&
    data.passportIssue !== "" &&
    data.passportExpiry !== "" &&
    data.passportExpiry > data.passportIssue &&
    data.email.trim() !== "" &&
    data.phoneCode !== "" &&
    data.phone.trim() !== ""
  );
}

function PassengerDetailsPageContent() {
  const searchParams = useSearchParams();

  const flightId =
    searchParams.get("flight") ?? "1";

  const adults = Math.max(
    1,
    Number(searchParams.get("adults") ?? "1")
  );

  const children = Math.max(
    0,
    Number(searchParams.get("children") ?? "0")
  );

  const infants = Math.max(
    0,
    Number(searchParams.get("infants") ?? "0")
  );

  const passengersCount =
    adults + children + infants;

  const basePrice =
    flightPrices[flightId] ?? flightPrices["1"];

  const totalPrice =
    basePrice * passengersCount;

  const [passengers, setPassengers] =
    useState<PassengerRecord[]>(
      createPassengers(
        adults,
        children,
        infants
      )
    );

  const [expandedPassenger, setExpandedPassenger] =
    useState(
      passengers[0]?.id ?? ""
    );

  const [agree, setAgree] =
    useState(false);

  const updatePassenger = (
    passengerId: string,
    field: keyof PassengerFormData,
    value: string
  ) => {
    setPassengers((current) =>
      current.map((passenger) =>
        passenger.id === passengerId
          ? {
              ...passenger,
              data: {
                ...passenger.data,
                [field]: value,
              },
            }
          : passenger
      )
    );
  };

  const completedPassengers =
    passengers.filter(
      isPassengerComplete
    ).length;

  const canContinue =
    completedPassengers ===
      passengers.length &&
    agree;
  return (
    <main className="min-h-screen bg-[#f7f5f6] pb-[116px]">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[430px] items-center justify-between px-4">
          <Link
            href={`/flights/results/${flightId}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#660033]/20 text-[#660033]"
          >
            <ArrowLeft size={20} />
          </Link>

          <div className="text-center">
            <h1 className="text-lg font-bold text-[#660033]">
              Passenger Details
            </h1>

            <p className="text-xs text-gray-500">
              {passengers.length} Passenger
              {passengers.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-[430px] px-4 py-4">

        <div className="mb-4 rounded-2xl bg-[#660033] p-4 text-white">
          <p className="text-xs opacity-80">
            Booking Summary
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                Dubai → Cairo
              </h2>

              <p className="text-xs opacity-80">
                Flight #{flightId}
              </p>
            </div>

            <div className="text-xl font-black">
              AED {totalPrice}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {passengers.map((passenger) => (
            <PassengerCard
              key={passenger.id}
              index={passenger.index}
              type={passenger.type}
              expanded={
                expandedPassenger ===
                passenger.id
              }
              completed={isPassengerComplete(passenger)}
              onToggle={() =>
                setExpandedPassenger(
                  expandedPassenger === passenger.id
                    ? ""
                    : passenger.id
                )
              }
            >
              <PassengerFields
                value={passenger.data}
                onChange={(field, value) =>
                  updatePassenger(
                    passenger.id,
                    field,
                    value
                  )
                }
              />
            </PassengerCard>
          ))}
        </div>
        <section className="mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(event) =>
                setAgree(event.target.checked)
              }
              className="mt-0.5 h-5 w-5 accent-[#660033]"
            />

            <span className="text-[11px] leading-5 text-gray-600">
              I confirm that all passenger and passport
              details match the travel documents and agree
              to the booking terms and privacy policy.
            </span>
          </label>
        </section>

        <section className="mt-4 flex items-center gap-3 rounded-[20px] bg-green-50 p-4">
          <ShieldCheck
            size={22}
            className="shrink-0 text-green-700"
          />

          <div>
            <p className="text-[12px] font-bold text-green-800">
              Your information is protected
            </p>

            <p className="text-[10px] text-green-700">
              Voylme securely protects passenger data.
            </p>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[430px] items-center gap-3">
          <div className="shrink-0">
            <p className="text-[9px] text-gray-500">
              Total
            </p>

            <p className="text-[18px] font-black text-[#660033]">
              AED {totalPrice}
            </p>
          </div>

          {canContinue ? (
            <Link
              href={`/flights/extras?flight=${flightId}`}
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-[#660033] text-[14px] font-bold text-white"
            >
              Continue
              <ChevronRight size={18} />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="flex h-[52px] flex-1 items-center justify-center rounded-full bg-gray-300 text-[13px] font-bold text-gray-500"
            >
              Complete all passengers
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
export default function PassengerDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f5f6]">
          <p className="font-bold text-[#660033]">
            Loading passenger details...
          </p>
        </main>
      }
    >
      <PassengerDetailsPageContent />
    </Suspense>
  );
}

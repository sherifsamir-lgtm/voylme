"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import NationalitySelect from "@/components/forms/NationalitySelect";
import CountrySelect from "@/components/forms/CountrySelect";
import PhoneCodeSelect from "@/components/forms/PhoneCodeSelect";

export type PassengerFormData = {
  title: "Mr" | "Mrs" | "Ms" | "Miss" | "Master";
  firstName: string;
  middleName: string;
  lastName: string;
  gender: "Male" | "Female" | "";
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportCountry: string;
  passportIssue: string;
  passportExpiry: string;
  email: string;
  phoneCode: string;
  phone: string;
};

type Props = {
  value: PassengerFormData;
  onChange: (
    field: keyof PassengerFormData,
    value: string,
  ) => void;
};

const titles: PassengerFormData["title"][] = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "Master",
];

function formatDate(value: string) {
  if (!value) return "Select date";

  const [year, month, day] = value.split("-");
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function todayValue() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function sixMonthsFromToday() {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function PassengerFields({
  value,
  onChange,
}: Props) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleOpen, setTitleOpen] = useState(false);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (
        titleRef.current &&
        !titleRef.current.contains(
          event.target as Node,
        )
      ) {
        setTitleOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener(
        "mousedown",
        close,
      );
  }, []);

  const expiryTooSoon =
    value.passportExpiry !== "" &&
    value.passportExpiry <
      sixMonthsFromToday();

  const expiryBeforeIssue =
    value.passportIssue !== "" &&
    value.passportExpiry !== "" &&
    value.passportExpiry <=
      value.passportIssue;

  const fieldClass =
    "h-[52px] w-full rounded-[16px] border border-gray-200 bg-white px-4 text-[13px] font-semibold text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10";

  return (
    <div className="space-y-5">
      <section>
        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div
            ref={titleRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setTitleOpen(
                  (current) => !current,
                )
              }
              className="flex h-[52px] w-full items-center justify-between rounded-[16px] border border-gray-200 bg-white px-4 text-left text-[13px] font-semibold text-slate-800 outline-none focus:border-[#660033]"
            >
              {value.title}

              <ChevronDown
                size={15}
                className="text-gray-400"
              />
            </button>

            {titleOpen && (
              <div className="absolute left-0 right-0 top-full z-[250] mt-1 rounded-[16px] border border-gray-200 bg-white p-1.5 shadow-xl">
                {titles.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => {
                      onChange("title", title);
                      setTitleOpen(false);
                    }}
                    className={`flex h-10 w-full items-center justify-between rounded-[10px] px-3 text-left text-[12px] font-bold ${
                      value.title === title
                        ? "bg-[#fff0f6] text-[#660033]"
                        : "text-slate-800"
                    }`}
                  >
                    {title}

                    {value.title === title && (
                      <Check size={15} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-[16px] bg-[#f4f0f2] p-1">
            {(["Male", "Female"] as const).map(
              (gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() =>
                    onChange("gender", gender)
                  }
                  className={`h-11 rounded-[12px] text-[11px] font-extrabold ${
                    value.gender === gender
                      ? "bg-[#660033] text-white"
                      : "text-gray-600"
                  }`}
                >
                  {gender}
                </button>
              ),
            )}
          </div>

          <input
            placeholder="First Name"
            autoComplete="given-name"
            value={value.firstName}
            onChange={(event) =>
              onChange(
                "firstName",
                event.target.value.toUpperCase(),
              )
            }
            className={fieldClass}
          />

          <input
            placeholder="Middle Name"
            autoComplete="additional-name"
            value={value.middleName}
            onChange={(event) =>
              onChange(
                "middleName",
                event.target.value.toUpperCase(),
              )
            }
            className={fieldClass}
          />

          <input
            placeholder="Last Name"
            autoComplete="family-name"
            value={value.lastName}
            onChange={(event) =>
              onChange(
                "lastName",
                event.target.value.toUpperCase(),
              )
            }
            className={fieldClass}
          />

          <label className="relative block h-[52px] overflow-hidden rounded-[16px] border border-gray-200 bg-white px-4 py-2">
            <span className="block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
              Date of birth
            </span>

            <span className="mt-1 flex items-center gap-2">
              <CalendarDays
                size={15}
                className="text-[#660033]"
              />

              <span className="truncate text-[10px] font-bold text-slate-800">
                {formatDate(value.dateOfBirth)}
              </span>
            </span>

            <input
              type="date"
              max={todayValue()}
              value={value.dateOfBirth}
              onChange={(event) =>
                onChange(
                  "dateOfBirth",
                  event.target.value,
                )
              }
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>

        <div className="mt-3">
          <NationalitySelect
            value={value.nationality}
            onChange={(selected) =>
              onChange(
                "nationality",
                selected,
              )
            }
          />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Passport Information
        </h3>

        <div className="space-y-3">
          <input
            placeholder="Passport Number"
            autoComplete="off"
            value={value.passportNumber}
            onChange={(event) =>
              onChange(
                "passportNumber",
                event.target.value
                  .replace(/\s/g, "")
                  .toUpperCase(),
              )
            }
            className={fieldClass}
          />

          <CountrySelect
            value={value.passportCountry}
            onChange={(selected) =>
              onChange(
                "passportCountry",
                selected,
              )
            }
            placeholder="Country of Issue"
          />

          <div className="grid grid-cols-2 gap-3">
            <label className="relative block h-[56px] overflow-hidden rounded-[16px] border border-gray-200 bg-white px-3 py-2">
              <span className="block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
                Passport issue date
              </span>

              <span className="mt-1 flex items-center gap-2">
                <CalendarDays
                  size={15}
                  className="text-[#660033]"
                />

                <span className="truncate text-[9px] font-bold text-slate-800">
                  {formatDate(
                    value.passportIssue,
                  )}
                </span>
              </span>

              <input
                type="date"
                max={todayValue()}
                value={value.passportIssue}
                onChange={(event) =>
                  onChange(
                    "passportIssue",
                    event.target.value,
                  )
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>

            <label
              className={`relative block h-[56px] overflow-hidden rounded-[16px] border bg-white px-3 py-2 ${
                expiryTooSoon ||
                expiryBeforeIssue
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            >
              <span className="block text-[8px] font-extrabold uppercase tracking-wide text-gray-500">
                Passport expiry date
              </span>

              <span className="mt-1 flex items-center gap-2">
                <CalendarDays
                  size={15}
                  className="text-[#660033]"
                />

                <span className="truncate text-[9px] font-bold text-slate-800">
                  {formatDate(
                    value.passportExpiry,
                  )}
                </span>
              </span>

              <input
                type="date"
                min={
                  value.passportIssue ||
                  todayValue()
                }
                value={value.passportExpiry}
                onChange={(event) =>
                  onChange(
                    "passportExpiry",
                    event.target.value,
                  )
                }
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>

          {expiryBeforeIssue && (
            <p className="rounded-[12px] bg-red-50 px-3 py-2 text-[10px] font-bold text-red-700">
              Passport expiry must be after the
              passport issue date.
            </p>
          )}

          {!expiryBeforeIssue &&
            expiryTooSoon && (
              <p className="rounded-[12px] bg-amber-50 px-3 py-2 text-[10px] font-bold text-amber-800">
                Passport should remain valid for at
                least 6 months from today.
              </p>
            )}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Contact Information
        </h3>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            value={value.email}
            onChange={(event) =>
              onChange(
                "email",
                event.target.value,
              )
            }
            className={fieldClass}
          />

          <div className="grid grid-cols-[116px_minmax(0,1fr)] gap-3">
            <PhoneCodeSelect
              value={value.phoneCode}
              onChange={(selected) =>
                onChange(
                  "phoneCode",
                  selected,
                )
              }
            />

            <input
              type="tel"
              inputMode="tel"
              placeholder="Mobile Number"
              autoComplete="tel-national"
              value={value.phone}
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value.replace(
                    /[^0-9]/g,
                    "",
                  ),
                )
              }
              className={fieldClass}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

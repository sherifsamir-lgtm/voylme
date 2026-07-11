"use client";

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
  passportExpiry: string;

  email: string;
  phoneCode: string;
  phone: string;
};

type Props = {
  value: PassengerFormData;
  onChange: (
    field: keyof PassengerFormData,
    value: string
  ) => void;
};

export default function PassengerFields({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-5">

      {/* Personal Information */}

      <div>
        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <input
            placeholder="First Name"
            value={value.firstName}
            onChange={(e)=>
              onChange("firstName",e.target.value.toUpperCase())
            }
            className="h-12 rounded-xl border px-4"
          />

          <input
            placeholder="Middle Name"
            value={value.middleName}
            onChange={(e)=>
              onChange("middleName",e.target.value.toUpperCase())
            }
            className="h-12 rounded-xl border px-4"
          />

          <input
            placeholder="Last Name"
            value={value.lastName}
            onChange={(e)=>
              onChange("lastName",e.target.value.toUpperCase())
            }
            className="h-12 rounded-xl border px-4"
          />

          <input
            type="date"
            value={value.dateOfBirth}
            onChange={(e)=>
              onChange("dateOfBirth",e.target.value)
            }
            className="h-12 rounded-xl border px-4"
          />

        </div>

        <div className="mt-3">
          <NationalitySelect
            value={value.nationality}
            onChange={(v)=>onChange("nationality",v)}
          />
        </div>

      </div>

      {/* Passport */}

      <div>

        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Passport Information
        </h3>

        <div className="space-y-3">

          <input
            placeholder="Passport Number"
            value={value.passportNumber}
            onChange={(e)=>
              onChange(
                "passportNumber",
                e.target.value.toUpperCase()
              )
            }
            className="h-12 w-full rounded-xl border px-4"
          />

          <CountrySelect
            value={value.passportCountry}
            onChange={(v)=>
              onChange("passportCountry",v)
            }
            placeholder="Country of Issue"
          />

          <input
            type="date"
            value={value.passportExpiry}
            onChange={(e)=>
              onChange(
                "passportExpiry",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border px-4"
          />

        </div>

      </div>

      {/* Contact */}

      <div>

        <h3 className="mb-3 text-sm font-bold text-[#660033]">
          Contact Information
        </h3>

        <div className="space-y-3">

          <input
            type="email"
            placeholder="Email"
            value={value.email}
            onChange={(e)=>
              onChange("email",e.target.value)
            }
            className="h-12 w-full rounded-xl border px-4"
          />

          <div className="grid grid-cols-[130px_1fr] gap-3">

            <PhoneCodeSelect
              value={value.phoneCode}
              onChange={(v)=>
                onChange("phoneCode",v)
              }
            />

            <input
              placeholder="Mobile Number"
              value={value.phone}
              onChange={(e)=>
                onChange("phone",e.target.value)
              }
              className="h-12 rounded-xl border px-4"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

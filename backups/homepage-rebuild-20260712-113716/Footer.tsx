import {
  CircleHelp,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const paymentMethods = [
  { src: "/payments/visa.svg", alt: "Visa" },
  {
    src: "/payments/mastercard.svg",
    alt: "Mastercard",
  },
  {
    src: "/payments/paypal.svg",
    alt: "PayPal",
  },
  {
    src: "/payments/apple-pay.svg",
    alt: "Apple Pay",
  },
  {
    src: "/payments/google-pay.svg",
    alt: "Google Pay",
  },
];

export default function Footer() {
  return (
    <footer className="shrink-0 px-4 pb-3 pt-2">
      <div className="rounded-[22px] border border-[#660033]/10 bg-white px-4 py-3.5 shadow-[0_5px_18px_rgba(69,0,34,0.07)]">
        <div className="flex items-center justify-center gap-6 text-[#660033]">
          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <ShieldCheck size={18} />
            Secure
          </span>

          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <LockKeyhole size={18} />
            Protected
          </span>

          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <CircleHelp size={18} />
            Support
          </span>
        </div>

        <p className="mt-2 text-center text-[10px] font-medium leading-4 text-gray-600">
          Secure comparisons, transparent pricing and
          trusted travel partners.
        </p>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {paymentMethods.map((method) => (
            <div
              key={method.alt}
              className="flex h-[34px] min-w-0 items-center justify-center"
            >
              <img
                src={method.src}
                alt={method.alt}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        <a
          href="mailto:support@voylme.com"
          className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-[#660033]"
        >
          <Mail size={14} />
          support@voylme.com
        </a>

        <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[9px] font-semibold text-gray-500">
          <span>About</span>
          <span>Help Centre</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </nav>

        <p className="mt-2 text-center text-[8px] text-gray-400">
          © 2026 Voylme. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

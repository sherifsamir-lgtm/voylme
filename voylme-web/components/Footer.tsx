import {
  CreditCard,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const socials = ["♪", "f", "◎", "𝕏", "in"];

export default function Footer() {
  return (
    <footer className="mt-auto px-3 pb-2 pt-2">
      <div className="rounded-[16px] border border-gray-200 bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center justify-center gap-5 text-[#660033]">
          <ShieldCheck size={14} />
          <LockKeyhole size={14} />
          <CreditCard size={14} />
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          {socials.map((social) => (
            <button
              key={social}
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#660033]/20 text-[8px] font-black text-[#660033]"
            >
              {social}
            </button>
          ))}
        </div>

        <a
          href="mailto:support@voylme.com"
          className="mt-1.5 flex items-center justify-center gap-1 text-[9px] font-bold text-[#660033]"
        >
          <Mail size={11} />
          support@voylme.com
        </a>

        <div className="mt-1.5 flex justify-center gap-1">
          {["VISA", "MC", "Apple Pay", "G Pay"].map((item) => (
            <span
              key={item}
              className="rounded border border-gray-200 px-1.5 py-0.5 text-[6px] font-black text-gray-500"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-1 text-center text-[7px] text-gray-400">
          © 2026 Voylme • Privacy • Terms • Contact • v0.1 Beta
        </p>
      </div>
    </footer>
  );
}

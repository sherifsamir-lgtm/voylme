"use client";

import { MessageCircle } from "lucide-react";

export default function AIHelpButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.open(
          "https://wa.me/?text=Hello%20Voylme%2C%20I%20need%20help",
          "_blank",
          "noopener,noreferrer",
        )
      }
      aria-label="Open Voylme support chat"
      title="Voylme support"
      className="fixed bottom-3 right-3 z-[7000] flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#660033] text-white shadow-[0_7px_20px_rgba(69,0,34,0.35)] active:scale-95"
    >
      <MessageCircle size={18} />
    </button>
  );
}

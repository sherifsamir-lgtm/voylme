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
          "noopener,noreferrer"
        )
      }
      aria-label="Open support chat"
      className="fixed bottom-[58px] right-3 z-[9999] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#660033] text-white shadow-lg active:scale-95"
    >
      <MessageCircle size={18} />
    </button>
  );
}

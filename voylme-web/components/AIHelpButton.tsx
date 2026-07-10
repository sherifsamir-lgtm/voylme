"use client";

import { MessageCircle } from "lucide-react";

export default function AIHelpButton() {
  const openChat = () => {
    window.open(
      "https://wa.me/?text=Hello%20Voylme%2C%20I%20need%20help",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={openChat}
      aria-label="Open Voylme support chat"
      title="Voylme Support"
      className="absolute bottom-[8px] right-[4px] z-20 flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white bg-[#660033] text-white shadow-[0_5px_16px_rgba(50,0,25,0.28)] active:scale-95"
    >
      <MessageCircle size={24} strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}

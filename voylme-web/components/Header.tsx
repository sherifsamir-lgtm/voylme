export default function Header() {
  return (
    <header className="flex h-[74px] w-full shrink-0 items-center justify-between border-b border-gray-100 bg-white px-2">
      <h1 className="shrink-0 text-[32px] font-black leading-none text-[#660033]">
        Voylme
      </h1>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="flex h-[42px] items-center gap-1.5 rounded-full border border-[#660033] px-3 text-xs font-bold text-[#660033]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M3 12h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 3c3 3 3 15 0 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 3c-3 3-3 15 0 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <span>EN</span>
        </button>

        <button
          type="button"
          className="h-[42px] rounded-full border border-[#660033] px-4 text-xs font-bold text-[#660033]"
        >
          AED
        </button>
      </div>
    </header>
  );
}

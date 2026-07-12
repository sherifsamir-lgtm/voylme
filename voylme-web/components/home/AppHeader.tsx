"use client";

import worldCountries from "world-countries";
import {
  Bell,
  Bookmark,
  Check,
  ChevronRight,
  CircleHelp,
  LogIn,
  LogOut,
  Menu,
  PlaneTakeoff,
  Search,
  Settings,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type VoylmeUser = {
  name: string;
  email?: string;
  photo?: string;
  membership?: string;
};

type LanguageOption = {
  code: string;
  name: string;
  flag: string;
  country: string;
};

type CurrencyOption = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
};

type OpenSelector = "language" | "currency" | null;

const preferredCountryOrder = [
  "AE",
  "EG",
  "SA",
  "QA",
  "KW",
  "BH",
  "OM",
  "GB",
  "US",
  "FR",
  "DE",
  "ES",
  "IT",
  "TR",
  "RU",
  "CN",
  "IN",
  "PK",
  "PH",
];

const preferredLanguageFlags: Record<string, string> = {
  eng: "GB",
  ara: "AE",
  fra: "FR",
  deu: "DE",
  spa: "ES",
  ita: "IT",
  tur: "TR",
  rus: "RU",
  zho: "CN",
  hin: "IN",
  urd: "PK",
  por: "PT",
  nld: "NL",
  jpn: "JP",
  kor: "KR",
};

function createFlagEmoji(code: string) {
  return code
    .toUpperCase()
    .split("")
    .map((character) =>
      String.fromCodePoint(
        character.charCodeAt(0) + 127397,
      ),
    )
    .join("");
}

function priority(code: string) {
  const position = preferredCountryOrder.indexOf(code);
  return position === -1 ? 999 : position;
}

function buildLanguages(): LanguageOption[] {
  const collected: LanguageOption[] = [];

  for (const country of worldCountries) {
    if (
      !country.cca2 ||
      !country.name?.common ||
      !country.languages
    ) {
      continue;
    }

    for (const [code, name] of Object.entries(
      country.languages,
    )) {
      const preferredCode =
        preferredLanguageFlags[code];

      const preferredCountry = preferredCode
        ? worldCountries.find(
            (item) => item.cca2 === preferredCode,
          )
        : undefined;

      collected.push({
        code: code.toUpperCase(),
        name,
        flag:
          preferredCountry?.flag ||
          country.flag ||
          createFlagEmoji(country.cca2),
        country:
          preferredCountry?.name?.common ||
          country.name.common,
      });
    }
  }

  const unique = Array.from(
    new Map(
      collected.map((item) => [
        item.code.toLowerCase(),
        item,
      ]),
    ).values(),
  );

  return unique.sort((first, second) => {
    const order = [
      "ENG",
      "ARA",
      "FRA",
      "DEU",
      "SPA",
      "ITA",
      "TUR",
      "RUS",
      "ZHO",
    ];

    const firstIndex = order.indexOf(first.code);
    const secondIndex = order.indexOf(second.code);

    if (firstIndex !== -1 || secondIndex !== -1) {
      return (
        (firstIndex === -1 ? 999 : firstIndex) -
        (secondIndex === -1 ? 999 : secondIndex)
      );
    }

    return first.name.localeCompare(second.name);
  });
}

function buildCurrencies(): CurrencyOption[] {
  const collected: CurrencyOption[] = [];

  for (const country of worldCountries) {
    if (
      !country.cca2 ||
      !country.name?.common ||
      !country.currencies
    ) {
      continue;
    }

    for (const [code, currency] of Object.entries(
      country.currencies,
    )) {
      collected.push({
        code,
        name: currency.name,
        symbol: currency.symbol || code,
        flag:
          country.flag ||
          createFlagEmoji(country.cca2),
        country: country.name.common,
      });
    }
  }

  const ordered = collected.sort(
    (first, second) => {
      const firstCountry = worldCountries.find(
        (item) =>
          item.name.common === first.country,
      );

      const secondCountry = worldCountries.find(
        (item) =>
          item.name.common === second.country,
      );

      return (
        priority(firstCountry?.cca2 || "") -
        priority(secondCountry?.cca2 || "")
      );
    },
  );

  const unique = Array.from(
    new Map(
      ordered.map((item) => [item.code, item]),
    ).values(),
  );

  const leadingCurrencies = [
    "AED",
    "USD",
    "EUR",
    "GBP",
    "SAR",
    "QAR",
    "KWD",
    "BHD",
    "OMR",
    "EGP",
  ];

  return unique.sort((first, second) => {
    const firstIndex = leadingCurrencies.indexOf(
      first.code,
    );

    const secondIndex = leadingCurrencies.indexOf(
      second.code,
    );

    if (firstIndex !== -1 || secondIndex !== -1) {
      return (
        (firstIndex === -1 ? 999 : firstIndex) -
        (secondIndex === -1 ? 999 : secondIndex)
      );
    }

    return first.code.localeCompare(second.code);
  });
}

const languageOptions = buildLanguages();
const currencyOptions = buildCurrencies();

const menuItems = [
  { label: "My Account", icon: UserRound },
  { label: "My Trips", icon: PlaneTakeoff },
  { label: "Saved Trips", icon: Bookmark },
  {
    label: "Rewards & Wallet",
    icon: WalletCards,
  },
  { label: "Notifications", icon: Bell },
  { label: "Help Centre", icon: CircleHelp },
  { label: "Settings", icon: Settings },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function AppHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSelector, setOpenSelector] =
    useState<OpenSelector>(null);
  const [query, setQuery] = useState("");
  const [user, setUser] =
    useState<VoylmeUser | null>(null);

  const [language, setLanguage] =
    useState<LanguageOption>(
      languageOptions.find(
        (item) => item.code === "ENG",
      ) || languageOptions[0],
    );

  const [currency, setCurrency] =
    useState<CurrencyOption>(
      currencyOptions.find(
        (item) => item.code === "AED",
      ) || currencyOptions[0],
    );

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("voylme-user");

      const storedLanguage =
        localStorage.getItem(
          "voylme-language",
        );

      const storedCurrency =
        localStorage.getItem(
          "voylme-currency",
        );

      if (storedUser) {
        setUser(
          JSON.parse(storedUser) as VoylmeUser,
        );
      }

      const languageMatch = languageOptions.find(
        (item) =>
          item.code === storedLanguage ||
          item.name === storedLanguage,
      );

      const currencyMatch = currencyOptions.find(
        (item) => item.code === storedCurrency,
      );

      if (languageMatch) {
        setLanguage(languageMatch);
      }

      if (currencyMatch) {
        setCurrency(currencyMatch);
      }
    } catch {
      localStorage.removeItem("voylme-user");
    }
  }, []);

  useEffect(() => {
    function closeSelector(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenSelector(null);
        setQuery("");
      }
    }

    document.addEventListener(
      "mousedown",
      closeSelector,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeSelector,
      );
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  const normalizedQuery =
    query.trim().toLowerCase();

  const filteredLanguages = useMemo(() => {
    if (!normalizedQuery) return languageOptions;

    return languageOptions.filter((item) =>
      `${item.name} ${item.code} ${item.country}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredCurrencies = useMemo(() => {
    if (!normalizedQuery) return currencyOptions;

    return currencyOptions.filter((item) =>
      `${item.name} ${item.code} ${item.country} ${item.symbol}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  function selectLanguage(item: LanguageOption) {
    setLanguage(item);

    localStorage.setItem(
      "voylme-language",
      item.code,
    );

    window.dispatchEvent(
      new CustomEvent("voylme-language-change", {
        detail: item.code,
      }),
    );

    setOpenSelector(null);
    setQuery("");
  }

  function selectCurrency(item: CurrencyOption) {
    setCurrency(item);

    localStorage.setItem(
      "voylme-currency",
      item.code,
    );

    window.dispatchEvent(
      new CustomEvent("voylme-currency-change", {
        detail: item.code,
      }),
    );

    setOpenSelector(null);
    setQuery("");
  }

  const displayName =
    user?.name || "Guest User";

  const membership =
    user?.membership ||
    (user
      ? "Voylme Explorer"
      : "Welcome to Voylme");

  const languageLabel =
    language.code === "ENG"
      ? "EN"
      : language.code === "ARA"
        ? "AR"
        : language.code.slice(0, 2);

  return (
    <>
      <header className="relative z-[600] shrink-0 border-b border-[#660033]/10 bg-white">
        <div
          ref={headerRef}
          className="relative mx-auto flex h-[76px] w-full max-w-[430px] items-center justify-between gap-2 px-4"
          dir="ltr"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[35px] font-black leading-none tracking-[-0.045em] text-[#660033]">
              Voylme
            </p>

            <p className="mt-1.5 whitespace-nowrap text-[10px] font-bold tracking-[0.01em] text-gray-600">
              Your Personal Travel Assistant
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                aria-label="Choose language"
                aria-expanded={
                  openSelector === "language"
                }
                onClick={() => {
                  setOpenSelector(
                    openSelector === "language"
                      ? null
                      : "language",
                  );
                  setQuery("");
                }}
                className="flex h-10 items-center gap-1.5 rounded-full border border-[#660033]/20 bg-white px-2.5 text-[12px] font-extrabold text-[#660033] shadow-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-[17px] leading-none">
                  {language.flag}
                </span>

                <span>{languageLabel}</span>
              </button>

              {openSelector === "language" && (
                <div
                  className="absolute right-0 top-[46px] z-[4000] w-[270px] overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-2xl"
                  dir="ltr"
                >
                  <div className="border-b border-gray-100 p-2.5">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
                      />

                      <input
                        autoFocus
                        value={query}
                        onChange={(event) =>
                          setQuery(
                            event.target.value,
                          )
                        }
                        placeholder="Search language or country"
                        className="h-10 w-full rounded-[10px] border border-gray-200 bg-[#faf8f9] pl-9 pr-3 text-[12px] font-semibold outline-none focus:border-[#660033]"
                      />
                    </div>
                  </div>

                  <div className="max-h-[310px] overflow-y-auto p-1.5">
                    {filteredLanguages.map(
                      (item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() =>
                            selectLanguage(item)
                          }
                          className="flex h-[48px] w-full items-center gap-3 rounded-[9px] px-2.5 text-left active:bg-[#fff0f6]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-[20px] leading-none">
                            {item.flag}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12px] font-bold text-slate-900">
                              {item.name}
                            </span>

                            <span className="block truncate text-[9px] text-gray-500">
                              {item.country}
                            </span>
                          </span>

                          {language.code ===
                            item.code && (
                            <Check
                              size={17}
                              className="shrink-0 text-[#660033]"
                            />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Choose currency"
                aria-expanded={
                  openSelector === "currency"
                }
                onClick={() => {
                  setOpenSelector(
                    openSelector === "currency"
                      ? null
                      : "currency",
                  );
                  setQuery("");
                }}
                className="flex h-10 items-center gap-1.5 rounded-full border border-[#660033]/20 bg-white px-2.5 text-[12px] font-extrabold text-[#660033] shadow-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-[17px] leading-none">
                  {currency.flag}
                </span>

                <span>{currency.code}</span>
              </button>

              {openSelector === "currency" && (
                <div
                  className="absolute right-0 top-[46px] z-[4000] w-[290px] overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-2xl"
                  dir="ltr"
                >
                  <div className="border-b border-gray-100 p-2.5">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
                      />

                      <input
                        autoFocus
                        value={query}
                        onChange={(event) =>
                          setQuery(
                            event.target.value,
                          )
                        }
                        placeholder="Search currency or country"
                        className="h-10 w-full rounded-[10px] border border-gray-200 bg-[#faf8f9] pl-9 pr-3 text-[12px] font-semibold outline-none focus:border-[#660033]"
                      />
                    </div>
                  </div>

                  <div className="max-h-[310px] overflow-y-auto p-1.5">
                    {filteredCurrencies.map(
                      (item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() =>
                            selectCurrency(item)
                          }
                          className="flex h-[48px] w-full items-center gap-3 rounded-[9px] px-2.5 text-left active:bg-[#fff0f6]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-[20px] leading-none">
                            {item.flag}
                          </span>

                          <span className="w-[42px] shrink-0 text-[12px] font-black text-[#660033]">
                            {item.code}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[11px] font-bold text-slate-900">
                              {item.name}
                            </span>

                            <span className="block truncate text-[9px] text-gray-500">
                              {item.country}
                            </span>
                          </span>

                          {currency.code ===
                            item.code && (
                            <Check
                              size={17}
                              className="shrink-0 text-[#660033]"
                            />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label="Open account menu"
              onClick={() => {
                setMenuOpen(true);
                setOpenSelector(null);
              }}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#660033]/25 bg-[#fff4f8] text-[#660033]"
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : user ? (
                <span className="text-[11px] font-black">
                  {initials(displayName)}
                </span>
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[10000]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/45"
          />

          <aside
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-[365px] flex-col bg-white shadow-2xl"
            dir="ltr"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <p className="text-[16px] font-black text-[#660033]">
                Voylme Account
              </p>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5">
              <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#660033] bg-[#fff3f8] text-[#660033]">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : user ? (
                  <span className="text-xl font-black">
                    {initials(displayName)}
                  </span>
                ) : (
                  <UserRound size={30} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[19px] font-black text-slate-900">
                  {displayName}
                </p>

                <p className="mt-1 truncate text-[12px] font-bold text-[#8b6400]">
                  {membership}
                </p>

                {user?.email && (
                  <p className="mt-1 truncate text-[11px] text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex h-[52px] w-full items-center gap-3 rounded-[14px] px-3 text-left active:bg-gray-100"
                  >
                    <Icon
                      size={21}
                      className="text-[#660033]"
                    />

                    <span className="flex-1 text-[15px] font-semibold text-slate-800">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={18}
                      className="text-gray-400"
                    />
                  </button>
                );
              })}

              <button
                type="button"
                className="mt-2 flex h-[52px] w-full items-center gap-3 rounded-[14px] px-3 text-left text-[15px] font-extrabold text-[#660033]"
              >
                {user ? (
                  <LogOut size={21} />
                ) : (
                  <LogIn size={21} />
                )}

                {user
                  ? "Sign Out"
                  : "Sign In / Create Account"}
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

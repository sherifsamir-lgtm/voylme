"use client";

import { countries } from "@/data/countries";

import {
  getCurrencyForLanguageChoice,
  getInitialVoylmePreferences,
} from "@/lib/voylme/locale/defaults";


import {
  normalizeLanguageCode,
} from "@/lib/voylme/i18n/languages";

import {
  getCurrency,
  getDefaultCurrencyCode,
} from "@/lib/voylme/currency/currencies";

import {
  VOYLME_EVENTS,
  VOYLME_STORAGE,
} from "@/lib/voylme/config/storage";

import {
  detectBrowserCountry,
  getLanguageFlagForCountry,
} from "@/lib/voylme/config/geo";


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

type VoylmeNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type OpenSelector =
  | "language"
  | "currency"
  | "notifications"
  | null;

const excludedCountryCodes = new Set(["IL", "AR"]);
const excludedCurrencyCodes = new Set(["ILS", "ARS"]);
const excludedLanguageCodes = new Set(["heb"]);

const defaultNotifications: VoylmeNotification[] = [
  {
    id: "welcome",
    title: "Welcome to Voylme",
    message:
      "Your personal travel assistant is ready to help you compare flights.",
    time: "Now",
    read: false,
  },
  {
    id: "price-alerts",
    title: "Price alerts",
    message:
      "Save a route to receive an alert when its price changes.",
    time: "Today",
    read: false,
  },
  {
    id: "secure-search",
    title: "Secure travel search",
    message:
      "Voylme compares trusted travel partners with transparent pricing.",
    time: "Today",
    read: true,
  },
];

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
      !country.languages ||
      excludedCountryCodes.has(country.cca2)
    ) {
      continue;
    }

    for (const [code, name] of Object.entries(
      country.languages,
    )) {
      if (excludedLanguageCodes.has(code)) {
        continue;
      }

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
      !country.currencies ||
      excludedCountryCodes.has(country.cca2)
    ) {
      continue;
    }

    for (const [code, currency] of Object.entries(
      country.currencies,
    )) {
      if (excludedCurrencyCodes.has(code)) {
        continue;
      }

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
  { label: "Help Centre", icon: CircleHelp },
  { label: "Settings", icon: Settings },
];



function getLanguageFlagPath(
  item: { code: string; name: string; country: string }
) {
  const value = `${item.code} ${getLanguageDisplayName(item)}`.toLowerCase();

  if (value.includes("arab") || value.includes("ara")) {
    return "/flags/languages/ar.svg";
  }

  if (value.includes("english") || value.includes("eng")) {
    return "/flags/languages/en.svg";
  }

  if (value.includes("french") || value.includes("fra")) {
    return "/flags/languages/fr.svg";
  }

  if (value.includes("german") || value.includes("deu")) {
    return "/flags/languages/de.svg";
  }

  if (value.includes("spanish") || value.includes("spa")) {
    return "/flags/languages/es.svg";
  }

  if (value.includes("italian") || value.includes("ita")) {
    return "/flags/languages/it.svg";
  }

  return "/flags/languages/en.svg";
}

function getLanguageDisplayName(
  item: { code: string; name: string; country: string }
) {
  const value = `${item.code} ${item.name}`.toLowerCase();

  if (value.includes("english") || value.includes("eng")) {
    return "English (US)";
  }

  return item.name;
}

function getLanguageDisplayCountry(
  item: { code: string; name: string; country: string }
) {
  const value = `${item.code} ${item.name}`.toLowerCase();

  if (value.includes("english") || value.includes("eng")) {
    return "United States";
  }

  return item.country;
}

function flagEmojiToIso(flag: string) {
  const letters = Array.from(flag)
    .map((character) => {
      const codePoint = character.codePointAt(0);

      if (
        codePoint === undefined ||
        codePoint < 127397 ||
        codePoint > 127422
      ) {
        return "";
      }

      return String.fromCharCode(codePoint - 127397);
    })
    .join("")
    .toLowerCase();

  return letters.length === 2 ? letters : "un";
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}


function getVoylmeLanguageFlagPath(
  item: { code: string; name: string; country: string; flag: string }
) {
  const value =
    `${item.code} ${item.name} ${item.country}`.toLowerCase();

  if (
    value.includes("arabic") ||
    value.includes(" ara ") ||
    item.code === "ARA"
  ) {
    return "/flags/countries/ae.svg";
  }

  if (
    value.includes("english") ||
    value.includes(" eng ") ||
    item.code === "ENG"
  ) {
    return "/flags/countries/us.svg";
  }

  const iso = flagEmojiToIso(item.flag);

  return `/flags/countries/${iso}.svg`;
}

function getVoylmeLanguageName(
  item: { code: string; name: string; country: string }
) {
  const value = `${item.code} ${item.name}`.toLowerCase();

  if (
    value.includes("english") ||
    value.includes("eng")
  ) {
    return "English (US)";
  }

  return item.name;
}

function getVoylmeLanguageCountry(
  item: { code: string; name: string; country: string }
) {
  const value = `${item.code} ${item.name}`.toLowerCase();

  if (
    value.includes("english") ||
    value.includes("eng")
  ) {
    return "United States";
  }

  return item.country;
}


type VoylmeLanguageOption = {
  code: string;
  name: string;
  country: string;
  flag: string;
};

function normalizeVoylmeCountryName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll(".", "")
    .replace(/\s+/g, " ");
}

function getVoylmeLanguageCountryIso(
  item: VoylmeLanguageOption,
) {
  const value =
    `${item.code} ${item.name} ${item.country}`.toLowerCase();

  if (
    value.includes("arabic") ||
    item.code === "ARA"
  ) {
    return "ae";
  }

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return "us";
  }

  const aliases: Record<string, string> = {
    "russia": "ru",
    "turkiye": "tr",
    "turkey": "tr",
    "south korea": "kr",
    "north korea": "kp",
    "united states": "us",
    "united states of america": "us",
    "united kingdom": "gb",
    "uae": "ae",
    "united arab emirates": "ae",
    "czech republic": "cz",
    "czechia": "cz",
    "ivory coast": "ci",
    "cote d'ivoire": "ci",
    "kosovo": "xk",
    "vatican city": "va",
    "bolivia": "bo",
    "venezuela": "ve",
    "tanzania": "tz",
    "moldova": "md",
    "laos": "la",
    "syria": "sy",
    "iran": "ir",
    "brunei": "bn",
    "cape verde": "cv",
    "east timor": "tl",
  };

  const normalizedCountry =
    normalizeVoylmeCountryName(item.country);

  if (aliases[normalizedCountry]) {
    return aliases[normalizedCountry];
  }

  const matchedCountry = countries.find(
    (country) =>
      normalizeVoylmeCountryName(country.name) ===
      normalizedCountry,
  );

  if (matchedCountry) {
    return matchedCountry.iso2.toLowerCase();
  }

  const flagLetters = Array.from(item.flag)
    .map((character) => {
      const codePoint = character.codePointAt(0);

      if (
        codePoint === undefined ||
        codePoint < 127397 ||
        codePoint > 127422
      ) {
        return "";
      }

      return String.fromCharCode(codePoint - 127397);
    })
    .join("")
    .toLowerCase();

  return flagLetters.length === 2
    ? flagLetters
    : "un";
}

function getVoylmeLanguageFlagSrc(
  item: VoylmeLanguageOption,
) {
  return `/flags/countries/${getVoylmeLanguageCountryIso(item)}.svg`;
}

function getVoylmeLanguageDisplayName(
  item: VoylmeLanguageOption,
) {
  const value =
    `${item.code} ${item.name}`.toLowerCase();

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return "English (US)";
  }

  return item.name;
}

function getVoylmeLanguageDisplayCountry(
  item: VoylmeLanguageOption,
) {
  const value =
    `${item.code} ${item.name}`.toLowerCase();

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return "United States";
  }

  return item.country;
}

function getVoylmeLanguagePriority(
  item: VoylmeLanguageOption,
) {
  const value =
    `${item.code} ${item.name}`.toLowerCase();

  if (
    value.includes("arabic") ||
    item.code === "ARA"
  ) {
    return 0;
  }

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return 1;
  }

  return 2;
}


type VoylmeHeaderLanguage = {
  code: string;
  name: string;
  country: string;
  flag: string;
};

function voylmeLanguageText(item: VoylmeHeaderLanguage) {
  return `${item.code} ${item.name} ${item.country}`
    .trim()
    .toLowerCase();
}

function voylmeLanguageIsBlocked(
  item: VoylmeHeaderLanguage,
) {
  const value = voylmeLanguageText(item);

  return (
    value.includes("hebrew") ||
    value.includes("hebr") ||
    value.includes("israel") ||
    value.includes("עברית") ||
    value.includes("argentina") ||
    value.includes("español (ar)") ||
    value.includes("spanish (ar)")
  );
}

function voylmeLanguageDisplayName(
  item: VoylmeHeaderLanguage,
) {
  const value = voylmeLanguageText(item);

  if (
    value.includes("arabic") ||
    item.code === "ARA"
  ) {
    return "العربية";
  }

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return "English (US)";
  }

  if (value.includes("french")) {
    return "Français";
  }

  if (value.includes("russian")) {
    return "Русский";
  }

  if (value.includes("spanish")) {
    return "Español";
  }

  return item.name;
}

function voylmeLanguageFlagIso(
  item: VoylmeHeaderLanguage,
) {
  const value = voylmeLanguageText(item);

  const rules: Array<[string[], string]> = [
    [["arabic"], "ae"],
    [["english"], "us"],
    [["french"], "fr"],
    [["russian"], "ru"],
    [["spanish"], "es"],
    [["german"], "de"],
    [["dutch", "nederlands"], "nl"],
    [["catalan", "català"], "es"],
    [["italian", "italiano"], "it"],
    [["portuguese", "português"], "pt"],
    [["norwegian", "norsk"], "no"],
    [["finnish", "suomi"], "fi"],
    [["swedish", "svenska"], "se"],
    [["danish", "dansk"], "dk"],
    [["czech", "čeština"], "cz"],
    [["hungarian", "magyar"], "hu"],
    [["romanian", "română"], "ro"],
    [["japanese", "日本語"], "jp"],
    [["simplified chinese", "简体中文"], "cn"],
    [["traditional chinese", "繁體中文"], "tw"],
    [["polish", "polski"], "pl"],
    [["greek", "ελληνικά"], "gr"],
    [["turkish", "türkçe"], "tr"],
    [["bulgarian", "български"], "bg"],
    [["korean", "한국어"], "kr"],
    [["latvian", "latviski"], "lv"],
    [["ukrainian", "українська"], "ua"],
    [["hindi", "हिन्दी"], "in"],
    [["indonesian", "bahasa indonesia"], "id"],
    [["malay", "bahasa malaysia"], "my"],
    [["thai", "ภาษาไทย"], "th"],
    [["estonian", "eesti"], "ee"],
    [["croatian", "hrvatski"], "hr"],
    [["lithuanian", "lietuvių"], "lt"],
    [["slovak", "slovenčina"], "sk"],
    [["serbian", "srpski"], "rs"],
    [["slovenian", "slovenščina"], "si"],
    [["vietnamese", "tiếng việt"], "vn"],
    [["filipino"], "ph"],
    [["icelandic", "íslenska"], "is"],
    [["afrikaans"], "za"],
    [["albanian"], "al"],
    [["amharic"], "et"],
  ];

  for (const [keywords, iso] of rules) {
    if (
      keywords.some((keyword) =>
        value.includes(keyword)
      )
    ) {
      if (
        iso === "pt" &&
        value.includes("brazil")
      ) {
        return "br";
      }

      return iso;
    }
  }

  const letters = Array.from(item.flag)
    .map((character) => {
      const point = character.codePointAt(0);

      if (
        point === undefined ||
        point < 127397 ||
        point > 127422
      ) {
        return "";
      }

      return String.fromCharCode(point - 127397);
    })
    .join("")
    .toLowerCase();

  return letters.length === 2 ? letters : "un";
}

function voylmeLanguageFlagSrc(
  item: VoylmeHeaderLanguage,
) {
  return `/flags/countries/${voylmeLanguageFlagIso(item)}.svg`;
}

function voylmeSuggestedLanguageRank(
  item: VoylmeHeaderLanguage,
) {
  const value = voylmeLanguageText(item);

  if (
    value.includes("arabic") ||
    item.code === "ARA"
  ) {
    return 0;
  }

  if (
    value.includes("english") ||
    item.code === "ENG"
  ) {
    return 1;
  }

  if (value.includes("french")) {
    return 2;
  }

  if (value.includes("russian")) {
    return 3;
  }

  if (value.includes("spanish")) {
    return 4;
  }

  return 999;
}

function voylmeBookingLanguageRank(
  item: VoylmeHeaderLanguage,
) {
  const value = voylmeLanguageText(item);

  const order = [
    ["english", 0],
    ["german", 1],
    ["dutch", 2],
    ["nederlands", 2],
    ["french", 3],
    ["spanish", 4],
    ["catalan", 5],
    ["italian", 6],
    ["portuguese", 7],
    ["norwegian", 8],
    ["norsk", 8],
    ["finnish", 9],
    ["suomi", 9],
    ["swedish", 10],
    ["svenska", 10],
    ["danish", 11],
    ["dansk", 11],
    ["czech", 12],
    ["čeština", 12],
    ["hungarian", 13],
    ["magyar", 13],
    ["romanian", 14],
    ["română", 14],
    ["japanese", 15],
    ["日本語", 15],
    ["simplified chinese", 16],
    ["简体中文", 16],
    ["traditional chinese", 17],
    ["繁體中文", 17],
    ["polish", 18],
    ["polski", 18],
    ["greek", 19],
    ["ελληνικά", 19],
    ["russian", 20],
    ["turkish", 21],
    ["türkçe", 21],
    ["bulgarian", 22],
    ["български", 22],
    ["arabic", 23],
    ["korean", 24],
    ["한국어", 24],
    ["latvian", 25],
    ["latviski", 25],
    ["ukrainian", 26],
    ["українська", 26],
    ["hindi", 27],
    ["हिन्दी", 27],
    ["indonesian", 28],
    ["bahasa indonesia", 28],
    ["malay", 29],
    ["bahasa malaysia", 29],
    ["thai", 30],
    ["ภาษาไทย", 30],
    ["estonian", 31],
    ["eesti", 31],
    ["croatian", 32],
    ["hrvatski", 32],
    ["lithuanian", 33],
    ["lietuvių", 33],
    ["slovak", 34],
    ["slovenčina", 34],
    ["serbian", 35],
    ["srpski", 35],
    ["slovenian", 36],
    ["slovenščina", 36],
    ["vietnamese", 37],
    ["tiếng việt", 37],
    ["filipino", 38],
    ["icelandic", 39],
    ["íslenska", 39],
  ] as const;

  for (const [keyword, rank] of order) {
    if (value.includes(keyword)) {
      return rank;
    }
  }

  return 500;
}


/* VOYLME_FINAL_LANGUAGE_DATA_START */

const VOYLME_FINAL_SUGGESTED_LANGUAGES = [
  { code: "ARA", name: "العربية", country: "Egypt", flag: "/flags/countries/eg.svg" },
  { code: "ENG_US", name: "English (US)", country: "United States", flag: "/flags/countries/us.svg" },
  { code: "FRA", name: "Français", country: "France", flag: "/flags/countries/fr.svg" },
  { code: "RUS", name: "Русский", country: "Russia", flag: "/flags/countries/ru.svg" },
  { code: "SPA", name: "Español", country: "Spain", flag: "/flags/countries/es.svg" },
] as const;

const VOYLME_FINAL_ALL_LANGUAGES = [
  { code: "ENG_GB", name: "English (UK)", country: "United Kingdom", flag: "/flags/countries/gb.svg" },
  { code: "ENG_US", name: "English (US)", country: "United States", flag: "/flags/countries/us.svg" },
  { code: "DEU", name: "Deutsch", country: "Germany", flag: "/flags/countries/de.svg" },
  { code: "NLD", name: "Nederlands", country: "Netherlands", flag: "/flags/countries/nl.svg" },
  { code: "FRA", name: "Français", country: "France", flag: "/flags/countries/fr.svg" },
  { code: "SPA", name: "Español", country: "Spain", flag: "/flags/countries/es.svg" },
  { code: "SPA_MX", name: "Español (MX)", country: "Mexico", flag: "/flags/countries/mx.svg" },
  { code: "CAT", name: "Català", country: "Spain", flag: "/flags/countries/es.svg" },
  { code: "ITA", name: "Italiano", country: "Italy", flag: "/flags/countries/it.svg" },
  { code: "POR_PT", name: "Português (PT)", country: "Portugal", flag: "/flags/countries/pt.svg" },
  { code: "POR_BR", name: "Português (BR)", country: "Brazil", flag: "/flags/countries/br.svg" },
  { code: "NOR", name: "Norsk", country: "Norway", flag: "/flags/countries/no.svg" },
  { code: "FIN", name: "Suomi", country: "Finland", flag: "/flags/countries/fi.svg" },
  { code: "SWE", name: "Svenska", country: "Sweden", flag: "/flags/countries/se.svg" },
  { code: "DAN", name: "Dansk", country: "Denmark", flag: "/flags/countries/dk.svg" },
  { code: "CES", name: "Čeština", country: "Czechia", flag: "/flags/countries/cz.svg" },
  { code: "HUN", name: "Magyar", country: "Hungary", flag: "/flags/countries/hu.svg" },
  { code: "RON", name: "Română", country: "Romania", flag: "/flags/countries/ro.svg" },
  { code: "JPN", name: "日本語", country: "Japan", flag: "/flags/countries/jp.svg" },
  { code: "ZHO_CN", name: "简体中文", country: "China", flag: "/flags/countries/cn.svg" },
  { code: "ZHO_TW", name: "繁體中文", country: "Taiwan", flag: "/flags/countries/tw.svg" },
  { code: "POL", name: "Polski", country: "Poland", flag: "/flags/countries/pl.svg" },
  { code: "ELL", name: "Ελληνικά", country: "Greece", flag: "/flags/countries/gr.svg" },
  { code: "RUS", name: "Русский", country: "Russia", flag: "/flags/countries/ru.svg" },
  { code: "TUR", name: "Türkçe", country: "Türkiye", flag: "/flags/countries/tr.svg" },
  { code: "BUL", name: "Български", country: "Bulgaria", flag: "/flags/countries/bg.svg" },
  { code: "ARA", name: "العربية", country: "Egypt", flag: "/flags/countries/eg.svg" },
  { code: "KOR", name: "한국어", country: "South Korea", flag: "/flags/countries/kr.svg" },
  { code: "LAV", name: "Latviski", country: "Latvia", flag: "/flags/countries/lv.svg" },
  { code: "UKR", name: "Українська", country: "Ukraine", flag: "/flags/countries/ua.svg" },
  { code: "HIN", name: "हिन्दी", country: "India", flag: "/flags/countries/in.svg" },
  { code: "IND", name: "Bahasa Indonesia", country: "Indonesia", flag: "/flags/countries/id.svg" },
  { code: "MSA", name: "Bahasa Malaysia", country: "Malaysia", flag: "/flags/countries/my.svg" },
  { code: "THA", name: "ภาษาไทย", country: "Thailand", flag: "/flags/countries/th.svg" },
  { code: "EST", name: "Eesti", country: "Estonia", flag: "/flags/countries/ee.svg" },
  { code: "HRV", name: "Hrvatski", country: "Croatia", flag: "/flags/countries/hr.svg" },
  { code: "LIT", name: "Lietuvių", country: "Lithuania", flag: "/flags/countries/lt.svg" },
  { code: "SLK", name: "Slovenčina", country: "Slovakia", flag: "/flags/countries/sk.svg" },
  { code: "SRP", name: "Srpski", country: "Serbia", flag: "/flags/countries/rs.svg" },
  { code: "SLV", name: "Slovenščina", country: "Slovenia", flag: "/flags/countries/si.svg" },
  { code: "VIE", name: "Tiếng Việt", country: "Vietnam", flag: "/flags/countries/vn.svg" },
  { code: "FIL", name: "Filipino", country: "Philippines", flag: "/flags/countries/ph.svg" },
  { code: "ISL", name: "Íslenska", country: "Iceland", flag: "/flags/countries/is.svg" },
] as const;

/* VOYLME_FINAL_LANGUAGE_DATA_END */

/* VOYLME_LANGUAGE_RUNTIME_HELPERS_START */

const VOYLME_RUNTIME_LANGUAGES = [
  ...VOYLME_FINAL_SUGGESTED_LANGUAGES,
  ...VOYLME_FINAL_ALL_LANGUAGES,
].filter(
  (item, index, list) =>
    list.findIndex(
      (candidate) =>
        normalizeLanguageCode(candidate.code) ===
        normalizeLanguageCode(item.code),
    ) === index,
);

function findVoylmeLanguage(
  value: string | null | undefined,
) {
  const normalized =
    normalizeLanguageCode(value);

  return (
    VOYLME_RUNTIME_LANGUAGES.find(
      (item) =>
        normalizeLanguageCode(item.code) ===
        normalized,
    ) ||
    VOYLME_RUNTIME_LANGUAGES.find(
      (item) =>
        normalizeLanguageCode(item.code) ===
        "ENG_US",
    ) ||
    VOYLME_RUNTIME_LANGUAGES[0]
  );
}

/* VOYLME_LANGUAGE_RUNTIME_HELPERS_END */

/* VOYLME_SAFE_LANGUAGE_FLAG_RUNTIME_START */

function getSafeLanguageFlagSrc(
  item:
    | {
        code?: string;
        flag?: string;
      }
    | null
    | undefined,
): string {
  const normalizedCode =
    normalizeLanguageCode(item?.code);

  const runtimeLanguage =
    findVoylmeLanguage(normalizedCode);

  const suppliedFlag =
    typeof item?.flag === "string"
      ? item.flag.trim()
      : "";

  if (
    suppliedFlag.startsWith("/") ||
    suppliedFlag.startsWith("https://") ||
    suppliedFlag.startsWith("http://")
  ) {
    return suppliedFlag;
  }

  const runtimeFlag =
    typeof runtimeLanguage?.flag === "string"
      ? runtimeLanguage.flag.trim()
      : "";

  if (runtimeFlag.startsWith("/")) {
    return runtimeFlag;
  }

  return "/flags/countries/us.svg";
}

/* VOYLME_SAFE_LANGUAGE_FLAG_RUNTIME_END */


/* VOYLME_CURRENCY_LIST_START */

type VoylmeHeaderCurrency = {
  code: string;
  name: string;
  country: string;
  flag: string;
};

const VOYLME_SUGGESTED_CURRENCIES: VoylmeHeaderCurrency[] = [
  { code: "EGP", name: "Egyptian Pound", country: "Egypt", flag: "/flags/countries/eg.svg" },
  { code: "SAR", name: "Saudi Arabian Riyal", country: "Saudi Arabia", flag: "/flags/countries/sa.svg" },
  { code: "AED", name: "United Arab Emirates Dirham", country: "United Arab Emirates", flag: "/flags/countries/ae.svg" },
  { code: "QAR", name: "Qatari Riyal", country: "Qatar", flag: "/flags/countries/qa.svg" },
  { code: "KWD", name: "Kuwaiti Dinar", country: "Kuwait", flag: "/flags/countries/kw.svg" },
  { code: "OMR", name: "Omani Rial", country: "Oman", flag: "/flags/countries/om.svg" },
  { code: "USD", name: "United States Dollar", country: "United States", flag: "/flags/countries/us.svg" },
  { code: "EUR", name: "Euro", country: "European Union", flag: "/flags/countries/eu.svg" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada", flag: "/flags/countries/ca.svg" },
  { code: "AUD", name: "Australian Dollar", country: "Australia", flag: "/flags/countries/au.svg" },
  { code: "GBP", name: "Pound Sterling", country: "United Kingdom", flag: "/flags/countries/gb.svg" },
];

const VOYLME_ALL_CURRENCIES: VoylmeHeaderCurrency[] = [
  { code: "AED", name: "United Arab Emirates Dirham", country: "United Arab Emirates", flag: "/flags/countries/ae.svg" },
  { code: "AUD", name: "Australian Dollar", country: "Australia", flag: "/flags/countries/au.svg" },
  { code: "AZN", name: "Azerbaijani Manat", country: "Azerbaijan", flag: "/flags/countries/az.svg" },
  { code: "BHD", name: "Bahraini Dinar", country: "Bahrain", flag: "/flags/countries/bh.svg" },
  { code: "BRL", name: "Brazilian Real", country: "Brazil", flag: "/flags/countries/br.svg" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada", flag: "/flags/countries/ca.svg" },
  { code: "CHF", name: "Swiss Franc", country: "Switzerland", flag: "/flags/countries/ch.svg" },
  { code: "CLP", name: "Chilean Peso", country: "Chile", flag: "/flags/countries/cl.svg" },
  { code: "CNY", name: "Chinese Yuan", country: "China", flag: "/flags/countries/cn.svg" },
  { code: "COP", name: "Colombian Peso", country: "Colombia", flag: "/flags/countries/co.svg" },
  { code: "CZK", name: "Czech Koruna", country: "Czechia", flag: "/flags/countries/cz.svg" },
  { code: "DKK", name: "Danish Krone", country: "Denmark", flag: "/flags/countries/dk.svg" },
  { code: "EGP", name: "Egyptian Pound", country: "Egypt", flag: "/flags/countries/eg.svg" },
  { code: "EUR", name: "Euro", country: "European Union", flag: "/flags/countries/eu.svg" },
  { code: "FJD", name: "Fijian Dollar", country: "Fiji", flag: "/flags/countries/fj.svg" },
  { code: "GBP", name: "Pound Sterling", country: "United Kingdom", flag: "/flags/countries/gb.svg" },
  { code: "GEL", name: "Georgian Lari", country: "Georgia", flag: "/flags/countries/ge.svg" },
  { code: "HKD", name: "Hong Kong Dollar", country: "Hong Kong", flag: "/flags/countries/hk.svg" },
  { code: "HUF", name: "Hungarian Forint", country: "Hungary", flag: "/flags/countries/hu.svg" },
  { code: "IDR", name: "Indonesian Rupiah", country: "Indonesia", flag: "/flags/countries/id.svg" },
  { code: "INR", name: "Indian Rupee", country: "India", flag: "/flags/countries/in.svg" },
  { code: "ISK", name: "Icelandic Króna", country: "Iceland", flag: "/flags/countries/is.svg" },
  { code: "JOD", name: "Jordanian Dinar", country: "Jordan", flag: "/flags/countries/jo.svg" },
  { code: "JPY", name: "Japanese Yen", country: "Japan", flag: "/flags/countries/jp.svg" },
  { code: "KRW", name: "South Korean Won", country: "South Korea", flag: "/flags/countries/kr.svg" },
  { code: "KWD", name: "Kuwaiti Dinar", country: "Kuwait", flag: "/flags/countries/kw.svg" },
  { code: "KZT", name: "Kazakhstani Tenge", country: "Kazakhstan", flag: "/flags/countries/kz.svg" },
  { code: "MDL", name: "Moldovan Leu", country: "Moldova", flag: "/flags/countries/md.svg" },
  { code: "MOP", name: "Macanese Pataca", country: "Macau", flag: "/flags/countries/mo.svg" },
  { code: "MXN", name: "Mexican Peso", country: "Mexico", flag: "/flags/countries/mx.svg" },
  { code: "MYR", name: "Malaysian Ringgit", country: "Malaysia", flag: "/flags/countries/my.svg" },
  { code: "NAD", name: "Namibian Dollar", country: "Namibia", flag: "/flags/countries/na.svg" },
  { code: "NOK", name: "Norwegian Krone", country: "Norway", flag: "/flags/countries/no.svg" },
  { code: "NZD", name: "New Zealand Dollar", country: "New Zealand", flag: "/flags/countries/nz.svg" },
  { code: "OMR", name: "Omani Rial", country: "Oman", flag: "/flags/countries/om.svg" },
  { code: "PLN", name: "Polish Złoty", country: "Poland", flag: "/flags/countries/pl.svg" },
  { code: "QAR", name: "Qatari Riyal", country: "Qatar", flag: "/flags/countries/qa.svg" },
  { code: "RON", name: "Romanian Leu", country: "Romania", flag: "/flags/countries/ro.svg" },
  { code: "RUB", name: "Russian Rouble", country: "Russia", flag: "/flags/countries/ru.svg" },
  { code: "SAR", name: "Saudi Arabian Riyal", country: "Saudi Arabia", flag: "/flags/countries/sa.svg" },
  { code: "SEK", name: "Swedish Krona", country: "Sweden", flag: "/flags/countries/se.svg" },
  { code: "SGD", name: "Singapore Dollar", country: "Singapore", flag: "/flags/countries/sg.svg" },
  { code: "THB", name: "Thai Baht", country: "Thailand", flag: "/flags/countries/th.svg" },
  { code: "TRY", name: "Turkish Lira", country: "Türkiye", flag: "/flags/countries/tr.svg" },
  { code: "TWD", name: "New Taiwan Dollar", country: "Taiwan", flag: "/flags/countries/tw.svg" },
  { code: "UAH", name: "Ukrainian Hryvnia", country: "Ukraine", flag: "/flags/countries/ua.svg" },
  { code: "USD", name: "United States Dollar", country: "United States", flag: "/flags/countries/us.svg" },
  { code: "XOF", name: "West African CFA Franc", country: "West Africa", flag: "/flags/countries/sn.svg" },
  { code: "ZAR", name: "South African Rand", country: "South Africa", flag: "/flags/countries/za.svg" },
];

/* VOYLME_CURRENCY_LIST_END */

/* VOYLME_LANGUAGE_CURRENCY_MAP_START */

function getCurrencyButtonLabel(
  currency: CurrencyOption,
): string {
  const centralCurrency =
    getCurrency(currency.code);

  return (
    centralCurrency.symbol ||
    currency.symbol ||
    currency.code
  );
}

/* VOYLME_LANGUAGE_CURRENCY_MAP_END */



export default function AppHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSelector, setOpenSelector] =
    useState<OpenSelector>(null);
  const [query, setQuery] = useState("");
  const [user, setUser] =
    useState<VoylmeUser | null>(null);

  const [notifications, setNotifications] =
    useState<VoylmeNotification[]>(
      defaultNotifications,
    );

  const [language, setLanguage] = useState<LanguageOption>({ ...findVoylmeLanguage("ENG_US"), flag: "/flags/countries/us.svg" } as LanguageOption);

  const [currency, setCurrency] =
    useState<CurrencyOption>(
      currencyOptions.find((item) => item.code === "USD") || currencyOptions[0],
    );

  const [countryCode, setCountryCode] =
    useState("US");

  useEffect(() => {
    try {
      const detectedCountry =
        detectBrowserCountry();

      setCountryCode(detectedCountry);

      const storedUser =
        localStorage.getItem("voylme-user");

      const storedLanguage =
        localStorage.getItem(
          VOYLME_STORAGE.language,
        );

      const storedCurrency =
        localStorage.getItem(
          VOYLME_STORAGE.currency,
        );

      const storedNotifications =
        localStorage.getItem(
          "voylme-notifications",
        );

      if (storedUser) {
        setUser(
          JSON.parse(storedUser) as VoylmeUser,
        );
      }

      const detected =
        getInitialVoylmePreferences();

      const languageMatch =
        findVoylmeLanguage(
          storedLanguage ||
          detected.language,
        );

      const currencyMatch =
        currencyOptions.find(
          (item) =>
            item.code ===
            (
              storedCurrency ||
              detected.currency
            ),
        );

      if (languageMatch) {
        setLanguage({
          ...languageMatch,
          flag: getLanguageFlagForCountry(
            normalizeLanguageCode(
              languageMatch.code,
            ),
            detectedCountry,
            getSafeLanguageFlagSrc(
              languageMatch,
            ),
          ),
        } as LanguageOption);
      }

      if (currencyMatch) {
        setCurrency(currencyMatch);
      } else if (storedLanguage) {
        const automaticCurrencyCode =
          getDefaultCurrencyCode(
            normalizeLanguageCode(
              storedLanguage,
            ),
            detectedCountry,
          );

        const automaticCurrency =
          currencyOptions.find(
            (item) =>
              item.code ===
              automaticCurrencyCode,
          );

        if (automaticCurrency) {
          setCurrency(automaticCurrency);

          localStorage.setItem(
            VOYLME_STORAGE.currency,
            automaticCurrency.code,
          );
        }
      }

      if (storedNotifications) {
        setNotifications(
          JSON.parse(
            storedNotifications,
          ) as VoylmeNotification[],
        );
      }
    } catch {
      localStorage.removeItem("voylme-user");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "voylme-notifications",
      JSON.stringify(notifications),
    );
  }, [notifications]);

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
      `${item.name} ${item.code} ${getLanguageDisplayCountry(item)}`
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
    const normalizedItem = {
      ...item,
      code: normalizeLanguageCode(
        item.code,
      ),
      flag: getLanguageFlagForCountry(
        normalizeLanguageCode(item.code),
        countryCode,
        getSafeLanguageFlagSrc(item),
      ),
    } as LanguageOption;

    setLanguage(normalizedItem);

    const nextCurrencyCode =
      getDefaultCurrencyCode(
        normalizedItem.code,
        countryCode,
      );
    const nextCurrency = currencyOptions.find((candidate) => candidate.code === nextCurrencyCode);
    if (nextCurrency) {
      setCurrency(nextCurrency);
      localStorage.setItem(VOYLME_STORAGE.currency, nextCurrency.code);
      window.dispatchEvent(new CustomEvent(VOYLME_EVENTS.currencyChange, { detail: nextCurrency.code }));
    }

    localStorage.setItem(
      VOYLME_STORAGE.language,
      normalizedItem.code,
    );

    window.dispatchEvent(
      new CustomEvent(VOYLME_EVENTS.languageChange, {
        detail: normalizedItem.code,
      }),
    );

    setOpenSelector(null);
    setQuery("");
  }

  function selectCurrency(item: CurrencyOption) {
    setCurrency(item);

    localStorage.setItem(
      VOYLME_STORAGE.currencyManual,
      "true",
    );

    localStorage.setItem(
      VOYLME_STORAGE.currency,
      item.code,
    );

    window.dispatchEvent(
      new CustomEvent(VOYLME_EVENTS.currencyChange, {
        detail: item.code,
      }),
    );

    setOpenSelector(null);
    setQuery("");
  }

  const unreadCount =
    notifications.filter(
      (notification) => !notification.read,
    ).length;

  function markNotificationRead(
    notificationId: string,
  ) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
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
          className="voylme-header-shell relative mx-auto h-[100px] w-full overflow-visible px-3"
          dir="ltr"
        >
          <div className="voylme-header-logo pointer-events-none absolute left-3 top-5 flex h-[62px] items-center overflow-hidden">
            <img
              src="/brand/voylme-logo-clean.png"
              alt="Voylme — Your Personal Travel Assistant"
              className="block h-[63px] w-auto max-w-[200px] object-contain object-left"
            />
          </div>

          <div className="voylme-header-actions absolute bottom-2 right-3 flex items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                aria-label="Choose language"
                title="Language"
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
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#660033]/20 bg-white text-[#660033] shadow-sm"
              >
                <img
                  src={getSafeLanguageFlagSrc(
                    language,
                  )}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>

              {openSelector === "language" && (
                <div
                  className="absolute left-1/2 top-[38px] z-[4000] w-max min-w-[190px] max-w-[225px] -translate-x-1/2 overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-2xl"
                >
                  <div className="max-h-[320px] touch-pan-y overflow-y-auto overscroll-contain py-1 [font-family:Arial,Helvetica,sans-serif]">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-bold text-gray-600">
                      Suggested for you
                    </p>

                    {VOYLME_FINAL_SUGGESTED_LANGUAGES.map((item) => {
                      const selected =
                        normalizeLanguageCode(
                          language.code,
                        ) ===
                        normalizeLanguageCode(
                          item.code,
                        );

                      return (
                        <button
                          key={`suggested-${item.code}`}
                          type="button"
                          onClick={() => { selectLanguage({ ...item } as LanguageOption); }}
                          className={`flex min-h-[44px] w-full items-center gap-2.5 px-3 text-left transition active:bg-gray-100 ${
                            selected
                              ? "bg-[#fff3f8] text-[#660033]"
                              : "bg-white text-[#1a1a1a]"
                          }`}
                        >
                          <span className="flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white">
                            <img
                              src={getSafeLanguageFlagSrc(item)}
                              alt=""
                              aria-hidden="true"
                              className="h-full w-full object-cover"
                            />
                          </span>

                          <span className="whitespace-nowrap text-[14px] font-medium leading-none">
                            {item.name}
                          </span>

                          {selected && (
                            <span className="ml-auto shrink-0 text-[17px] font-bold text-[#660033]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}

                    <p className="mt-1 border-t border-gray-100 px-3 pb-1 pt-2 text-[10px] font-bold text-gray-600">
                      All languages
                    </p>

                    {VOYLME_FINAL_ALL_LANGUAGES.map((item) => {
                      const selected =
                        normalizeLanguageCode(
                          language.code,
                        ) ===
                        normalizeLanguageCode(
                          item.code,
                        );

                      return (
                        <button
                          key={`${item.code}-${item.name}`}
                          type="button"
                          onClick={() => { selectLanguage({ ...item } as LanguageOption); }}
                          className={`flex min-h-[44px] w-full items-center gap-2.5 px-3 text-left transition active:bg-gray-100 ${
                            selected
                              ? "bg-[#fff3f8] text-[#660033]"
                              : "bg-white text-[#1a1a1a]"
                          }`}
                        >
                          <span className="flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white">
                            <img
                              src={getSafeLanguageFlagSrc(item)}
                              alt=""
                              aria-hidden="true"
                              className="h-full w-full object-cover"
                            />
                          </span>

                          <span className="whitespace-nowrap text-[14px] font-medium leading-none">
                            {item.name}
                          </span>

                          {selected && (
                            <span className="ml-auto shrink-0 text-[17px] font-bold text-[#660033]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Choose currency"
                title="Currency"
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
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#660033]/20 bg-white text-[#660033] shadow-sm"
              >
                <span className="px-1 text-center text-[11px] font-black leading-none text-[#660033]">
                  {currency.symbol && currency.symbol.length <= 3 ? currency.symbol : currency.code}
                </span>
              </button>

              {openSelector === "currency" && (
                <div className="absolute left-1/2 top-[38px] z-[4000] w-[310px] max-w-[calc(100vw-24px)] -translate-x-1/2 overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-2xl">
                  <div className="max-h-[330px] touch-pan-y overflow-y-auto overscroll-contain py-1 [font-family:Arial,Helvetica,sans-serif]">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-bold text-gray-600">
                      Suggested for you
                    </p>

                    {VOYLME_SUGGESTED_CURRENCIES.map((item) => {
                      const selected =
                        currency.code === item.code;

                      return (
                        <button
                          key={`suggested-${item.code}`}
                          type="button"
                          onClick={() => {
                            selectCurrency(item as any);
                          }}
                          className={`flex min-h-[46px] w-full items-center gap-3 px-4 text-left transition active:bg-gray-100 ${
                            selected
                              ? "bg-[#fff3f8] text-[#660033]"
                              : "bg-white text-[#1a1a1a]"
                          }`}
                        >
                          <span className="w-[44px] shrink-0 text-[12px] font-extrabold text-[#660033]">
                            {item.code}
                          </span>

                          <span className="min-w-0 flex-1 whitespace-nowrap text-[13px] font-medium leading-none">
                            {item.name}
                          </span>

                          {selected && (
                            <span className="shrink-0 text-[17px] font-bold text-[#660033]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}

                    <p className="mt-1 border-t border-gray-100 px-3 pb-1 pt-2 text-[10px] font-bold text-gray-600">
                      All currencies
                    </p>

                    {VOYLME_ALL_CURRENCIES.map((item) => {
                      const selected =
                        currency.code === item.code;

                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            selectCurrency(item as any);
                          }}
                          className={`flex min-h-[46px] w-full items-center gap-3 px-4 text-left transition active:bg-gray-100 ${
                            selected
                              ? "bg-[#fff3f8] text-[#660033]"
                              : "bg-white text-[#1a1a1a]"
                          }`}
                        >
                          <span className="w-[44px] shrink-0 text-[12px] font-extrabold text-[#660033]">
                            {item.code}
                          </span>

                          <span className="min-w-0 flex-1 whitespace-nowrap text-[13px] font-medium leading-none">
                            {item.name}
                          </span>

                          {selected && (
                            <span className="shrink-0 text-[17px] font-bold text-[#660033]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label={`Notifications${
                  unreadCount
                    ? `, ${unreadCount} unread`
                    : ""
                }`}
                onClick={() => {
                  setOpenSelector(
                    openSelector === "notifications"
                      ? null
                      : "notifications",
                  );
                  setQuery("");
                }}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#660033]/25 bg-[#fff4f8] text-[#660033]"
              >
                <Bell size={14} />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[8px] font-black text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {openSelector === "notifications" && (
                <div
                  className="absolute right-0 top-[46px] z-[4000] w-[318px] overflow-hidden rounded-[15px] border border-gray-200 bg-white shadow-2xl"
                  dir="ltr"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3">
                    <div>
                      <p className="text-[13px] font-black text-[#660033]">
                        Notifications
                      </p>

                      <p className="mt-0.5 text-[8px] text-gray-500">
                        {unreadCount} unread
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsRead}
                        className="text-[9px] font-extrabold text-[#660033]"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[290px] overflow-y-auto p-1.5">
                    {notifications.map(
                      (notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            markNotificationRead(
                              notification.id,
                            )
                          }
                          className={`flex w-full gap-2.5 rounded-[11px] px-2 py-2.5 text-left ${
                            notification.read
                              ? "bg-white"
                              : "bg-[#fff1f7]"
                          }`}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4e4ec] text-[#660033]">
                            <Bell size={14} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-[10px] font-extrabold text-slate-900">
                              {notification.title}
                            </span>

                            <span className="mt-1 block text-[8px] leading-[1.35] text-gray-600">
                              {notification.message}
                            </span>

                            <span className="mt-1 block text-[7px] text-gray-400">
                              {notification.time}
                            </span>
                          </span>
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
                title="Menu"
              onClick={() => {
                setMenuOpen(true);
                setOpenSelector(null);
              }}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#660033]/20 bg-white text-[#660033] shadow-sm"
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
                <Menu size={14} />
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
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
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

                <p className="mt-1 truncate text-[11px] font-bold text-[#8b6400]">
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
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setOpenSelector("notifications");
                }}
                className="flex h-[52px] w-full items-center gap-3 rounded-[14px] px-3 text-left active:bg-gray-100"
              >
                <Bell
                  size={14}
                  className="text-[#660033]"
                />

                <span className="flex-1 text-[15px] font-semibold text-slate-800">
                  Notifications
                </span>

                {unreadCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

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

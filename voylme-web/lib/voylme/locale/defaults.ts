import {
  getDefaultCurrencyCode,
} from "@/lib/voylme/currency/currencies";

import {
  normalizeLanguageCode,
} from "@/lib/voylme/i18n/languages";

type VoylmePreferences = {
  language: string;
  currency: string;
  region: string;
};

const TIMEZONE_REGION: Record<string, string> = {
  "Africa/Cairo": "EG",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Africa/Casablanca": "MA",
  "Africa/Algiers": "DZ",
  "Africa/Tunis": "TN",
  "Africa/Tripoli": "LY",
  "Asia/Baghdad": "IQ",
  "Asia/Amman": "JO",
  "Asia/Beirut": "LB",
  "Asia/Damascus": "SY",
  "Asia/Aden": "YE",
  "Africa/Khartoum": "SD",
  "Europe/Paris": "FR",
  "Europe/London": "GB",
  "Europe/Berlin": "DE",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Lisbon": "PT",
  "Europe/Amsterdam": "NL",
  "Europe/Moscow": "RU",
  "Europe/Istanbul": "TR",
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN",
  "Asia/Taipei": "TW",
  "Asia/Seoul": "KR",
  "Asia/Kolkata": "IN",
};

const REGION_CURRENCY: Record<string, string> = {
  EG: "EGP",
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  BH: "BHD",
  OM: "OMR",
  MA: "MAD",
  DZ: "DZD",
  TN: "TND",
  LY: "LYD",
  IQ: "IQD",
  JO: "JOD",
  LB: "LBP",
  SY: "SYP",
  YE: "YER",
  SD: "SDG",
  MR: "MRU",
  DJ: "DJF",
  KM: "KMF",
  SO: "SOS",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  PT: "EUR",
  NL: "EUR",
  GB: "GBP",
  US: "USD",
  CA: "CAD",
  AU: "AUD",
  JP: "JPY",
  CN: "CNY",
  TW: "TWD",
  KR: "KRW",
  IN: "INR",
  RU: "RUB",
  TR: "TRY",
};

const REGION_LANGUAGE: Record<string, string> = {
  EG: "ARA",
  AE: "ENG_US",
  SA: "ARA",
  QA: "ARA",
  KW: "ARA",
  BH: "ARA",
  OM: "ARA",
  MA: "FRA",
  DZ: "FRA",
  TN: "FRA",
  LY: "ARA",
  IQ: "ARA",
  JO: "ARA",
  LB: "ARA",
  SY: "ARA",
  YE: "ARA",
  SD: "ARA",
  FR: "FRA",
  DE: "DEU",
  ES: "SPA",
  IT: "ITA",
  PT: "POR_PT",
  NL: "NLD",
  GB: "ENG_GB",
  US: "ENG_US",
  JP: "JPN",
  CN: "ZHO_CN",
  TW: "ZHO_TW",
  KR: "KOR",
  IN: "HIN",
  RU: "RUS",
  TR: "TUR",
};

function browserRegion(): string {
  if (typeof window === "undefined") {
    return "US";
  }

  const locale =
    navigator.languages?.[0] ||
    navigator.language ||
    "en-US";

  const localeRegion =
    locale.split("-")[1]?.toUpperCase();

  if (localeRegion) {
    return localeRegion;
  }

  const timezone =
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;

  return TIMEZONE_REGION[timezone] || "US";
}

export function getInitialVoylmePreferences():
  VoylmePreferences {
  const region = browserRegion();

  return {
    region,
    language: "ENG_US",
    currency:
      REGION_CURRENCY[region] ||
      "USD",
  };
}

export function getCurrencyForLanguageChoice(
  languageValue: string,
): string {
  const language =
    normalizeLanguageCode(languageValue);

  if (language === "ARA") {
    const region = browserRegion();

    return (
      REGION_CURRENCY[region] ||
      "AED"
    );
  }

  return getDefaultCurrencyCode(language);
}

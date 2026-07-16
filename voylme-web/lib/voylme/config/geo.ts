export type VoylmeCountryProfile = {
  countryCode: string;
  currencyCode: string;
  languageCode: string;
  flag: string;
};

export const COUNTRY_PROFILES: Record<
  string,
  VoylmeCountryProfile
> = {
  AE: { countryCode: "AE", currencyCode: "AED", languageCode: "ARA", flag: "/flags/countries/ae.svg" },
  SA: { countryCode: "SA", currencyCode: "SAR", languageCode: "ARA", flag: "/flags/countries/sa.svg" },
  EG: { countryCode: "EG", currencyCode: "EGP", languageCode: "ARA", flag: "/flags/countries/eg.svg" },
  MA: { countryCode: "MA", currencyCode: "MAD", languageCode: "ARA", flag: "/flags/countries/ma.svg" },
  DZ: { countryCode: "DZ", currencyCode: "DZD", languageCode: "ARA", flag: "/flags/countries/dz.svg" },
  TN: { countryCode: "TN", currencyCode: "TND", languageCode: "ARA", flag: "/flags/countries/tn.svg" },
  LY: { countryCode: "LY", currencyCode: "LYD", languageCode: "ARA", flag: "/flags/countries/ly.svg" },
  QA: { countryCode: "QA", currencyCode: "QAR", languageCode: "ARA", flag: "/flags/countries/qa.svg" },
  KW: { countryCode: "KW", currencyCode: "KWD", languageCode: "ARA", flag: "/flags/countries/kw.svg" },
  BH: { countryCode: "BH", currencyCode: "BHD", languageCode: "ARA", flag: "/flags/countries/bh.svg" },
  OM: { countryCode: "OM", currencyCode: "OMR", languageCode: "ARA", flag: "/flags/countries/om.svg" },
  JO: { countryCode: "JO", currencyCode: "JOD", languageCode: "ARA", flag: "/flags/countries/jo.svg" },
  IQ: { countryCode: "IQ", currencyCode: "IQD", languageCode: "ARA", flag: "/flags/countries/iq.svg" },
  LB: { countryCode: "LB", currencyCode: "LBP", languageCode: "ARA", flag: "/flags/countries/lb.svg" },
  SY: { countryCode: "SY", currencyCode: "SYP", languageCode: "ARA", flag: "/flags/countries/sy.svg" },
  YE: { countryCode: "YE", currencyCode: "YER", languageCode: "ARA", flag: "/flags/countries/ye.svg" },
  SD: { countryCode: "SD", currencyCode: "SDG", languageCode: "ARA", flag: "/flags/countries/sd.svg" },
  MR: { countryCode: "MR", currencyCode: "MRU", languageCode: "ARA", flag: "/flags/countries/mr.svg" },
  DJ: { countryCode: "DJ", currencyCode: "DJF", languageCode: "ARA", flag: "/flags/countries/dj.svg" },
  KM: { countryCode: "KM", currencyCode: "KMF", languageCode: "ARA", flag: "/flags/countries/km.svg" },
  SO: { countryCode: "SO", currencyCode: "SOS", languageCode: "ARA", flag: "/flags/countries/so.svg" },
  PS: { countryCode: "PS", currencyCode: "JOD", languageCode: "ARA", flag: "/flags/countries/ps.svg" },

  US: { countryCode: "US", currencyCode: "USD", languageCode: "ENG_US", flag: "/flags/countries/us.svg" },
  GB: { countryCode: "GB", currencyCode: "GBP", languageCode: "ENG_GB", flag: "/flags/countries/gb.svg" },
  FR: { countryCode: "FR", currencyCode: "EUR", languageCode: "FRA", flag: "/flags/countries/fr.svg" },
  DE: { countryCode: "DE", currencyCode: "EUR", languageCode: "DEU", flag: "/flags/countries/de.svg" },
  ES: { countryCode: "ES", currencyCode: "EUR", languageCode: "SPA", flag: "/flags/countries/es.svg" },
  IT: { countryCode: "IT", currencyCode: "EUR", languageCode: "ITA", flag: "/flags/countries/it.svg" },
  PT: { countryCode: "PT", currencyCode: "EUR", languageCode: "POR_PT", flag: "/flags/countries/pt.svg" },
  BR: { countryCode: "BR", currencyCode: "BRL", languageCode: "POR_BR", flag: "/flags/countries/br.svg" },
  MX: { countryCode: "MX", currencyCode: "MXN", languageCode: "SPA_MX", flag: "/flags/countries/mx.svg" },
  IN: { countryCode: "IN", currencyCode: "INR", languageCode: "HIN", flag: "/flags/countries/in.svg" },
  JP: { countryCode: "JP", currencyCode: "JPY", languageCode: "JPN", flag: "/flags/countries/jp.svg" },
  CN: { countryCode: "CN", currencyCode: "CNY", languageCode: "ZHO_CN", flag: "/flags/countries/cn.svg" },
  TW: { countryCode: "TW", currencyCode: "TWD", languageCode: "ZHO_TW", flag: "/flags/countries/tw.svg" },
  KR: { countryCode: "KR", currencyCode: "KRW", languageCode: "KOR", flag: "/flags/countries/kr.svg" },
  RU: { countryCode: "RU", currencyCode: "RUB", languageCode: "RUS", flag: "/flags/countries/ru.svg" },
  TR: { countryCode: "TR", currencyCode: "TRY", languageCode: "TUR", flag: "/flags/countries/tr.svg" },
};

const TIMEZONE_COUNTRY: Record<string, string> = {
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Africa/Cairo": "EG",
  "Africa/Casablanca": "MA",
  "Africa/Algiers": "DZ",
  "Africa/Tunis": "TN",
  "Africa/Tripoli": "LY",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Asia/Amman": "JO",
  "Asia/Baghdad": "IQ",
  "Asia/Beirut": "LB",
  "Asia/Damascus": "SY",
  "Asia/Aden": "YE",
  "Africa/Khartoum": "SD",
  "Africa/Nouakchott": "MR",
  "Africa/Djibouti": "DJ",
  "Indian/Comoro": "KM",
  "Africa/Mogadishu": "SO",
  "Asia/Gaza": "PS",
  "Asia/Hebron": "PS",
};

function countryFromLocale(locale: string): string {
  const normalized = locale.replace("_", "-");
  const parts = normalized.split("-");

  return parts.length > 1
    ? parts[parts.length - 1].toUpperCase()
    : "";
}

export function detectBrowserCountry(): string {
  if (typeof window === "undefined") return "US";

  const locales = [
    navigator.language,
    ...(navigator.languages || []),
  ];

  for (const locale of locales) {
    const country = countryFromLocale(locale);

    if (COUNTRY_PROFILES[country]) {
      return country;
    }
  }

  try {
    const timezone =
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;

    if (TIMEZONE_COUNTRY[timezone]) {
      return TIMEZONE_COUNTRY[timezone];
    }
  } catch {
    // Safe fallback below.
  }

  return "US";
}

export function getCountryProfile(
  countryCode: string,
): VoylmeCountryProfile {
  return (
    COUNTRY_PROFILES[countryCode.toUpperCase()] ||
    COUNTRY_PROFILES.US
  );
}

export function getLanguageFlagForCountry(
  languageCode: string,
  countryCode: string,
  fallbackFlag: string,
): string {
  const profile = getCountryProfile(countryCode);

  if (
    languageCode === "ARA" &&
    profile.languageCode === "ARA"
  ) {
    return profile.flag;
  }

  return fallbackFlag;
}

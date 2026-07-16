export type VoylmeCurrency = {
  code: string;
  name: string;
  symbol: string;
};

export const VOYLME_CURRENCIES: VoylmeCurrency[] = [
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Pound Sterling", symbol: "£" },

  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "د.ب" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.أ" },
  { code: "EGP", name: "Egyptian Pound", symbol: "ج.م" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م" },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "LYD", name: "Libyan Dinar", symbol: "د.ل" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "د.ع" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
  { code: "SYP", name: "Syrian Pound", symbol: "ل.س" },
  { code: "YER", name: "Yemeni Rial", symbol: "ر.ي" },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "MRU" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh.So." },

  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },

  { code: "RUB", name: "Russian Rouble", symbol: "₽" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },

  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "CLP", name: "Chilean Peso", symbol: "CLP$" },
  { code: "COP", name: "Colombian Peso", symbol: "COL$" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$" },
];

const LANGUAGE_CURRENCY: Record<string, string> = {
  ENG_US: "USD",
  ENG_GB: "GBP",
  ARA: "USD",
  FRA: "EUR",
  DEU: "EUR",
  NLD: "EUR",
  SPA: "EUR",
  SPA_MX: "MXN",
  CAT: "EUR",
  ITA: "EUR",
  POR_PT: "EUR",
  POR_BR: "BRL",
  NOR: "NOK",
  FIN: "EUR",
  SWE: "SEK",
  DAN: "DKK",
  CES: "CZK",
  HUN: "HUF",
  RON: "RON",
  POL: "PLN",
  ELL: "EUR",
  RUS: "RUB",
  TUR: "TRY",
  BUL: "BGN",
  UKR: "UAH",
  JPN: "JPY",
  ZHO_CN: "CNY",
  ZHO_TW: "TWD",
  KOR: "KRW",
  HIN: "INR",
  IND: "IDR",
  MSA: "MYR",
  THA: "THB",
  EST: "EUR",
  HRV: "EUR",
  LAV: "EUR",
  LIT: "EUR",
  SLK: "EUR",
  SRP: "RSD",
  SLV: "EUR",
  VIE: "VND",
  FIL: "PHP",
  ISL: "ISK",
};

const COUNTRY_CURRENCY: Record<string, string> = {
  AE: "AED",
  SA: "SAR",
  EG: "EGP",
  MA: "MAD",
  DZ: "DZD",
  TN: "TND",
  LY: "LYD",
  QA: "QAR",
  KW: "KWD",
  BH: "BHD",
  OM: "OMR",
  JO: "JOD",
  IQ: "IQD",
  LB: "LBP",
  SY: "SYP",
  YE: "YER",
  SD: "SDG",
  MR: "MRU",
  DJ: "DJF",
  KM: "KMF",
  SO: "SOS",
  PS: "JOD",
};

export function getCurrency(
  code: string,
): VoylmeCurrency {
  return (
    VOYLME_CURRENCIES.find(
      (item) => item.code === code,
    ) || {
      code,
      name: code,
      symbol: code,
    }
  );
}

export function getDefaultCurrencyCode(
  languageCode: string,
  countryCode?: string,
): string {
  const country =
    String(countryCode || "")
      .trim()
      .toUpperCase();

  if (
    languageCode === "ARA" &&
    COUNTRY_CURRENCY[country]
  ) {
    return COUNTRY_CURRENCY[country];
  }

  return LANGUAGE_CURRENCY[languageCode] || "USD";
}

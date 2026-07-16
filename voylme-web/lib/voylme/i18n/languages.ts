export type VoylmeDirection = "ltr" | "rtl";

export type VoylmeLanguage = {
  code: string;
  name: string;
  flag: string;
  direction: VoylmeDirection;
  locale: string;
};

export const VOYLME_LANGUAGES: VoylmeLanguage[] = [
  { code: "ENG_US", name: "English (US)", flag: "/flags/countries/us.svg", direction: "ltr", locale: "en-US" },
  { code: "ENG_GB", name: "English (UK)", flag: "/flags/countries/gb.svg", direction: "ltr", locale: "en-GB" },
  { code: "ARA", name: "العربية", flag: "/flags/countries/eg.svg", direction: "rtl", locale: "ar-EG" },
  { code: "FRA", name: "Français", flag: "/flags/countries/fr.svg", direction: "ltr", locale: "fr-FR" },
  { code: "DEU", name: "Deutsch", flag: "/flags/countries/de.svg", direction: "ltr", locale: "de-DE" },
  { code: "NLD", name: "Nederlands", flag: "/flags/countries/nl.svg", direction: "ltr", locale: "nl-NL" },
  { code: "SPA", name: "Español", flag: "/flags/countries/es.svg", direction: "ltr", locale: "es-ES" },
  { code: "SPA_MX", name: "Español (MX)", flag: "/flags/countries/mx.svg", direction: "ltr", locale: "es-MX" },
  { code: "CAT", name: "Català", flag: "/flags/countries/es.svg", direction: "ltr", locale: "ca-ES" },
  { code: "ITA", name: "Italiano", flag: "/flags/countries/it.svg", direction: "ltr", locale: "it-IT" },
  { code: "POR_PT", name: "Português (PT)", flag: "/flags/countries/pt.svg", direction: "ltr", locale: "pt-PT" },
  { code: "POR_BR", name: "Português (BR)", flag: "/flags/countries/br.svg", direction: "ltr", locale: "pt-BR" },
  { code: "NOR", name: "Norsk", flag: "/flags/countries/no.svg", direction: "ltr", locale: "nb-NO" },
  { code: "FIN", name: "Suomi", flag: "/flags/countries/fi.svg", direction: "ltr", locale: "fi-FI" },
  { code: "SWE", name: "Svenska", flag: "/flags/countries/se.svg", direction: "ltr", locale: "sv-SE" },
  { code: "DAN", name: "Dansk", flag: "/flags/countries/dk.svg", direction: "ltr", locale: "da-DK" },
  { code: "CES", name: "Čeština", flag: "/flags/countries/cz.svg", direction: "ltr", locale: "cs-CZ" },
  { code: "HUN", name: "Magyar", flag: "/flags/countries/hu.svg", direction: "ltr", locale: "hu-HU" },
  { code: "RON", name: "Română", flag: "/flags/countries/ro.svg", direction: "ltr", locale: "ro-RO" },
  { code: "POL", name: "Polski", flag: "/flags/countries/pl.svg", direction: "ltr", locale: "pl-PL" },
  { code: "ELL", name: "Ελληνικά", flag: "/flags/countries/gr.svg", direction: "ltr", locale: "el-GR" },
  { code: "RUS", name: "Русский", flag: "/flags/countries/ru.svg", direction: "ltr", locale: "ru-RU" },
  { code: "TUR", name: "Türkçe", flag: "/flags/countries/tr.svg", direction: "ltr", locale: "tr-TR" },
  { code: "BUL", name: "Български", flag: "/flags/countries/bg.svg", direction: "ltr", locale: "bg-BG" },
  { code: "UKR", name: "Українська", flag: "/flags/countries/ua.svg", direction: "ltr", locale: "uk-UA" },
  { code: "JPN", name: "日本語", flag: "/flags/countries/jp.svg", direction: "ltr", locale: "ja-JP" },
  { code: "ZHO_CN", name: "简体中文", flag: "/flags/countries/cn.svg", direction: "ltr", locale: "zh-CN" },
  { code: "ZHO_TW", name: "繁體中文", flag: "/flags/countries/tw.svg", direction: "ltr", locale: "zh-TW" },
  { code: "KOR", name: "한국어", flag: "/flags/countries/kr.svg", direction: "ltr", locale: "ko-KR" },
  { code: "HIN", name: "हिन्दी", flag: "/flags/countries/in.svg", direction: "ltr", locale: "hi-IN" },
  { code: "IND", name: "Bahasa Indonesia", flag: "/flags/countries/id.svg", direction: "ltr", locale: "id-ID" },
  { code: "MSA", name: "Bahasa Malaysia", flag: "/flags/countries/my.svg", direction: "ltr", locale: "ms-MY" },
  { code: "THA", name: "ภาษาไทย", flag: "/flags/countries/th.svg", direction: "ltr", locale: "th-TH" },
  { code: "EST", name: "Eesti", flag: "/flags/countries/ee.svg", direction: "ltr", locale: "et-EE" },
  { code: "HRV", name: "Hrvatski", flag: "/flags/countries/hr.svg", direction: "ltr", locale: "hr-HR" },
  { code: "LAV", name: "Latviski", flag: "/flags/countries/lv.svg", direction: "ltr", locale: "lv-LV" },
  { code: "LIT", name: "Lietuvių", flag: "/flags/countries/lt.svg", direction: "ltr", locale: "lt-LT" },
  { code: "SLK", name: "Slovenčina", flag: "/flags/countries/sk.svg", direction: "ltr", locale: "sk-SK" },
  { code: "SRP", name: "Srpski", flag: "/flags/countries/rs.svg", direction: "ltr", locale: "sr-RS" },
  { code: "SLV", name: "Slovenščina", flag: "/flags/countries/si.svg", direction: "ltr", locale: "sl-SI" },
  { code: "VIE", name: "Tiếng Việt", flag: "/flags/countries/vn.svg", direction: "ltr", locale: "vi-VN" },
  { code: "FIL", name: "Filipino", flag: "/flags/countries/ph.svg", direction: "ltr", locale: "fil-PH" },
  { code: "ISL", name: "Íslenska", flag: "/flags/countries/is.svg", direction: "ltr", locale: "is-IS" },
];

const LANGUAGE_ALIASES: Record<string, string> = {
  EN: "ENG_US",
  ENG: "ENG_US",
  EN_US: "ENG_US",
  EN_GB: "ENG_GB",
  AR: "ARA",
  FR: "FRA",
  DE: "DEU",
  ES: "SPA",
  ES_MX: "SPA_MX",
  PT: "POR_PT",
  PT_PT: "POR_PT",
  PT_BR: "POR_BR",
  ZH: "ZHO_CN",
  ZH_CN: "ZHO_CN",
  ZH_TW: "ZHO_TW",
};

export function normalizeLanguageCode(value: unknown): string {
  const raw = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/-/g, "_");

  return LANGUAGE_ALIASES[raw] || raw || "ENG_US";
}

export function getLanguage(value: unknown): VoylmeLanguage {
  const code = normalizeLanguageCode(value);

  return (
    VOYLME_LANGUAGES.find((item) => item.code === code) ||
    VOYLME_LANGUAGES[0]
  );
}

export function isRtlLanguage(value: unknown): boolean {
  return getLanguage(value).direction === "rtl";
}

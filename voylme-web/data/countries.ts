import worldCountries from "world-countries";

export type CountryOption = {
  name: string;
  nationality: string;
  iso2: string;
  flag: string;
  dialCode: string;
};

const priorityCountryCodes = [
  "AE",
  "EG",
  "SA",
  "QA",
  "KW",
  "OM",
  "BH",
  "JO",
  "LB",
  "PS",
  "IQ",
  "SY",
  "MA",
  "DZ",
  "TN",
  "SD",
  "GB",
  "US",
  "CA",
];

function createFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((character) =>
      String.fromCodePoint(character.charCodeAt(0) + 127397)
    )
    .join("");
}

function getDialCode(country: (typeof worldCountries)[number]) {
  const root = country.idd?.root ?? "";
  const suffixes = country.idd?.suffixes ?? [];

  if (!root) {
    return "";
  }

  if (suffixes.length === 0) {
    return root;
  }

  if (suffixes.length === 1) {
    return `${root}${suffixes[0]}`;
  }

  return root;
}

function getNationality(country: (typeof worldCountries)[number]) {
  const demonyms = country.demonyms as
    | Record<
        string,
        {
          f?: string;
          m?: string;
        }
      >
    | undefined;

  const englishDemonym = demonyms?.eng;

  return (
    englishDemonym?.m ||
    englishDemonym?.f ||
    country.name.common
  );
}

const allCountries: CountryOption[] = worldCountries
  .filter((country) => country.cca2 && country.name?.common)
  .map((country) => ({
    name: country.name.common,
    nationality: getNationality(country),
    iso2: country.cca2,
    flag: country.flag || createFlagEmoji(country.cca2),
    dialCode: getDialCode(country),
  }))
  .sort((firstCountry, secondCountry) =>
    firstCountry.name.localeCompare(secondCountry.name)
  );

const priorityCountries = priorityCountryCodes
  .map((countryCode) =>
    allCountries.find(
      (country) => country.iso2 === countryCode
    )
  )
  .filter(
    (country): country is CountryOption =>
      country !== undefined
  );

const priorityCodeSet = new Set(priorityCountryCodes);

const remainingCountries = allCountries.filter(
  (country) => !priorityCodeSet.has(country.iso2)
);

export const countries: CountryOption[] = [
  ...priorityCountries,
  ...remainingCountries,
];

export const nationalityOptions = Array.from(
  new Map(
    countries.map((country) => [
      country.nationality,
      {
        value: country.nationality,
        label: country.nationality,
        countryName: country.name,
        iso2: country.iso2,
      },
    ])
  ).values()
).sort((firstNationality, secondNationality) =>
  firstNationality.label.localeCompare(
    secondNationality.label
  )
);

export const passportCountryOptions = countries.map(
  (country) => ({
    value: country.iso2,
    label: `${country.flag} ${country.name}`,
    name: country.name,
    flag: country.flag,
  })
);

export const phoneCountryOptions = countries
  .filter((country) => country.dialCode !== "")
  .map((country) => ({
    value: country.iso2,
    dialCode: country.dialCode,
    label: `${country.flag} ${country.name} ${country.dialCode}`,
    shortLabel: `${country.flag} ${country.dialCode}`,
    name: country.name,
    flag: country.flag,
  }));

export function getCountryByIso2(iso2: string) {
  return countries.find(
    (country) => country.iso2 === iso2
  );
}

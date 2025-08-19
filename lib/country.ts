import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export function getCountryCodeAlpha2(countryName: string): string | null {
  const code = countries.getAlpha2Code(countryName, "en");
  return code?.toLowerCase() ?? null;
}

export function getFlagImageUrl(countryName: string): string | null {
  const code = getCountryCodeAlpha2(countryName);
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export function getCountryDisplay(
  name?: string
): { alpha2: string; alpha3: string } | string {
  if (!name) return "—";

  const alpha2 = countries.getAlpha2Code(name, "en");
  const alpha3 = countries.getAlpha3Code(name, "en");

  if (!alpha2 || !alpha3) return name;

  return { alpha2, alpha3 };
}

import { getCountryDisplay } from "@/lib/formatCountry";

interface CountryCellProps {
  country?: string;
}

export function CountryCell({ country }: CountryCellProps) {
  const result = getCountryDisplay(country);

  if (typeof result === "string") {
    return <span>{result}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`fi fi-${result.alpha2.toLowerCase()}`}></span>
      <span>{result.alpha3}</span>
    </div>
  );
}

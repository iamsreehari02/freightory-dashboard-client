import { useEffect, useState } from "react";
import {
  getUserCountryCode,
  getUserCurrency,
  getConversionRate,
} from "@/lib/utils";

export function useCurrency(baseCurrency = "USD") {
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [conversionRate, setConversionRate] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");

  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const countryCode = await getUserCountryCode(); // e.g., "IN"
        if (!countryCode) return;

        const { currencyCode, symbol } = await getUserCurrency(countryCode);
        const rate = await getConversionRate(currencyCode);

        console.log(
          "Detected currency:",
          currencyCode,
          "Symbol:",
          symbol,
          "Rate:",
          rate
        );

        setCurrencyCode(currencyCode);
        setCurrencySymbol(symbol);
        setConversionRate(rate);
      } catch (err) {
        console.error("Currency detection failed:", err);
      }
    };

    loadCurrency();
  }, [baseCurrency]);

  return { currencyCode, currencySymbol, conversionRate };
}

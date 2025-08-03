import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserCountryCode(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code.toLowerCase();
  } catch (error) {
    console.error("Error fetching country code:", error);
    return null;
  }
}

export async function getUserCurrency(code: string) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    const currencyCode = Object.keys(data[0].currencies)[0]; // e.g., "INR"
    const symbol = data[0].currencies[currencyCode].symbol; // e.g., "₹"
    return { currencyCode, symbol };
  } catch (error) {
    console.error("Error fetching currency:", error);
    return { currencyCode: "USD", symbol: "$" };
  }
}

export async function getConversionRate(toCurrency: string): Promise<number> {
  try {
    // Try multiple APIs for better reliability

    // First try: exchangerate-api.com (more reliable)
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await res.json();

      console.log("Exchange API response:", data);

      if (data && data.rates && typeof data.rates[toCurrency] === "number") {
        const rate = data.rates[toCurrency];
        console.log(`Got rate for ${toCurrency}: ${rate}`);
        return rate;
      }
    } catch (error) {
      console.warn("exchangerate-api.com failed:", error);
    }

    // Second try: fixer.io (backup)
    try {
      const res = await fetch(
        `https://api.fixer.io/latest?base=USD&symbols=${toCurrency}`
      );
      const data = await res.json();

      if (data && data.rates && typeof data.rates[toCurrency] === "number") {
        const rate = data.rates[toCurrency];
        console.log(`Got rate from fixer.io for ${toCurrency}: ${rate}`);
        return rate;
      }
    } catch (error) {
      console.warn("fixer.io failed:", error);
    }

    // Fallback: Use hardcoded rates for common currencies
    const fallbackRates: Record<string, number> = {
      USD: 1,
      INR: 84, // 1 USD = 84 INR
      EUR: 0.92, // 1 USD = 0.92 EUR
      GBP: 0.79, // 1 USD = 0.79 GBP
      CAD: 1.35, // 1 USD = 1.35 CAD
      AUD: 1.5, // 1 USD = 1.50 AUD
      JPY: 150, // 1 USD = 150 JPY
    };

    if (fallbackRates[toCurrency]) {
      console.log(
        `Using fallback rate for ${toCurrency}: ${fallbackRates[toCurrency]}`
      );
      return fallbackRates[toCurrency];
    }

    console.warn(`No rate found for ${toCurrency}, using 1`);
    return 1;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return 1;
  }
}

export const countryOptions = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "belgium", label: "Belgium" },
  { value: "brazil", label: "Brazil" },
  { value: "canada", label: "Canada" },
  { value: "china", label: "China" },
  { value: "denmark", label: "Denmark" },
  { value: "egypt", label: "Egypt" },
  { value: "finland", label: "Finland" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "greece", label: "Greece" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "iran", label: "Iran" },
  { value: "iraq", label: "Iraq" },
  { value: "ireland", label: "Ireland" },
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "kenya", label: "Kenya" },
  { value: "malaysia", label: "Malaysia" },
  { value: "mexico", label: "Mexico" },
  { value: "nepal", label: "Nepal" },
  { value: "netherlands", label: "Netherlands" },
  { value: "new zealand", label: "New Zealand" },
  { value: "nigeria", label: "Nigeria" },
  { value: "norway", label: "Norway" },
  { value: "pakistan", label: "Pakistan" },
  { value: "philippines", label: "Philippines" },
  { value: "poland", label: "Poland" },
  { value: "portugal", label: "Portugal" },
  { value: "qatar", label: "Qatar" },
  { value: "russia", label: "Russia" },
  { value: "saudi arabia", label: "Saudi Arabia" },
  { value: "singapore", label: "Singapore" },
  { value: "south africa", label: "South Africa" },
  { value: "south korea", label: "South Korea" },
  { value: "spain", label: "Spain" },
  { value: "sri lanka", label: "Sri Lanka" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "thailand", label: "Thailand" },
  { value: "turkey", label: "Turkey" },
  { value: "united arab emirates", label: "United Arab Emirates" },
  { value: "united kingdom", label: "United Kingdom" },
  { value: "united states", label: "United States" },
  { value: "vietnam", label: "Vietnam" },
];

export const paymentOptions = [
  {
    key: "online",
    title: "Online Payment",
    description: "Pay instantly using UPI, Card, or Netbanking.",
    icon: "/assets/icons/creditcard.svg",
    buttonLabel: "Pay Online",
    points: [
      "Instant confirmation",
      "All digital methods supported",
      "Secure and fast",
    ],
  },
  {
    key: "offline",
    title: "Offline Bank Transfer",
    description: "Transfer the payment directly to our bank account manually.",
    icon: "/assets/icons/bank.svg",
    buttonLabel: "Bank Transfer",
    points: [
      "No internet banking? Use this",
      "Manual transfer instructions",
      "Confirmed after verification",
    ],
  },
];

export function formatNumber(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toLocaleString("en-US");
}

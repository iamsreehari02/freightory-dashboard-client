import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
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

// export const countryOptions = [
//   { value: "afghanistan", label: "Afghanistan" },
//   { value: "albania", label: "Albania" },
//   { value: "algeria", label: "Algeria" },
//   { value: "andorra", label: "Andorra" },
//   { value: "angola", label: "Angola" },
//   { value: "argentina", label: "Argentina" },
//   { value: "armenia", label: "Armenia" },
//   { value: "australia", label: "Australia" },
//   { value: "austria", label: "Austria" },
//   { value: "bangladesh", label: "Bangladesh" },
//   { value: "belgium", label: "Belgium" },
//   { value: "brazil", label: "Brazil" },
//   { value: "canada", label: "Canada" },
//   { value: "china", label: "China" },
//   { value: "denmark", label: "Denmark" },
//   { value: "egypt", label: "Egypt" },
//   { value: "finland", label: "Finland" },
//   { value: "france", label: "France" },
//   { value: "germany", label: "Germany" },
//   { value: "greece", label: "Greece" },
//   { value: "india", label: "India" },
//   { value: "indonesia", label: "Indonesia" },
//   { value: "iran", label: "Iran" },
//   { value: "iraq", label: "Iraq" },
//   { value: "ireland", label: "Ireland" },
//   { value: "italy", label: "Italy" },
//   { value: "japan", label: "Japan" },
//   { value: "kenya", label: "Kenya" },
//   { value: "malaysia", label: "Malaysia" },
//   { value: "mexico", label: "Mexico" },
//   { value: "nepal", label: "Nepal" },
//   { value: "netherlands", label: "Netherlands" },
//   { value: "new zealand", label: "New Zealand" },
//   { value: "nigeria", label: "Nigeria" },
//   { value: "norway", label: "Norway" },
//   { value: "pakistan", label: "Pakistan" },
//   { value: "philippines", label: "Philippines" },
//   { value: "poland", label: "Poland" },
//   { value: "portugal", label: "Portugal" },
//   { value: "qatar", label: "Qatar" },
//   { value: "russia", label: "Russia" },
//   { value: "saudi arabia", label: "Saudi Arabia" },
//   { value: "singapore", label: "Singapore" },
//   { value: "south africa", label: "South Africa" },
//   { value: "south korea", label: "South Korea" },
//   { value: "spain", label: "Spain" },
//   { value: "sri lanka", label: "Sri Lanka" },
//   { value: "sweden", label: "Sweden" },
//   { value: "switzerland", label: "Switzerland" },
//   { value: "thailand", label: "Thailand" },
//   { value: "turkey", label: "Turkey" },
//   { value: "united arab emirates", label: "United Arab Emirates" },
//   { value: "united kingdom", label: "United Kingdom" },
//   { value: "united states", label: "United States" },
//   { value: "vietnam", label: "Vietnam" },
// ];

export const countryOptions = [
  { value: "afghanistan", label: "Afghanistan", currency: "AFN", symbol: "؋" },
  { value: "albania", label: "Albania", currency: "ALL", symbol: "L" },
  { value: "algeria", label: "Algeria", currency: "DZD", symbol: "د.ج" },
  { value: "andorra", label: "Andorra", currency: "EUR", symbol: "€" },
  { value: "angola", label: "Angola", currency: "AOA", symbol: "Kz" },
  { value: "argentina", label: "Argentina", currency: "ARS", symbol: "$" },
  { value: "armenia", label: "Armenia", currency: "AMD", symbol: "֏" },
  { value: "australia", label: "Australia", currency: "AUD", symbol: "$" },
  { value: "austria", label: "Austria", currency: "EUR", symbol: "€" },
  { value: "bangladesh", label: "Bangladesh", currency: "BDT", symbol: "৳" },
  { value: "belgium", label: "Belgium", currency: "EUR", symbol: "€" },
  { value: "brazil", label: "Brazil", currency: "BRL", symbol: "R$" },
  { value: "canada", label: "Canada", currency: "CAD", symbol: "$" },
  { value: "china", label: "China", currency: "CNY", symbol: "¥" },
  { value: "denmark", label: "Denmark", currency: "DKK", symbol: "kr" },
  { value: "egypt", label: "Egypt", currency: "EGP", symbol: "£" },
  { value: "finland", label: "Finland", currency: "EUR", symbol: "€" },
  { value: "france", label: "France", currency: "EUR", symbol: "€" },
  { value: "germany", label: "Germany", currency: "EUR", symbol: "€" },
  { value: "greece", label: "Greece", currency: "EUR", symbol: "€" },
  { value: "india", label: "India", currency: "INR", symbol: "₹" },
  { value: "indonesia", label: "Indonesia", currency: "IDR", symbol: "Rp" },
  { value: "iran", label: "Iran", currency: "IRR", symbol: "﷼" },
  { value: "iraq", label: "Iraq", currency: "IQD", symbol: "ع.د" },
  { value: "ireland", label: "Ireland", currency: "EUR", symbol: "€" },
  { value: "italy", label: "Italy", currency: "EUR", symbol: "€" },
  { value: "japan", label: "Japan", currency: "JPY", symbol: "¥" },
  { value: "kenya", label: "Kenya", currency: "KES", symbol: "KSh" },
  { value: "malaysia", label: "Malaysia", currency: "MYR", symbol: "RM" },
  { value: "mexico", label: "Mexico", currency: "MXN", symbol: "$" },
  { value: "nepal", label: "Nepal", currency: "NPR", symbol: "₨" },
  { value: "netherlands", label: "Netherlands", currency: "EUR", symbol: "€" },
  { value: "new zealand", label: "New Zealand", currency: "NZD", symbol: "$" },
  { value: "nigeria", label: "Nigeria", currency: "NGN", symbol: "₦" },
  { value: "norway", label: "Norway", currency: "NOK", symbol: "kr" },
  { value: "pakistan", label: "Pakistan", currency: "PKR", symbol: "₨" },
  { value: "philippines", label: "Philippines", currency: "PHP", symbol: "₱" },
  { value: "poland", label: "Poland", currency: "PLN", symbol: "zł" },
  { value: "portugal", label: "Portugal", currency: "EUR", symbol: "€" },
  { value: "qatar", label: "Qatar", currency: "QAR", symbol: "ر.ق" },
  { value: "russia", label: "Russia", currency: "RUB", symbol: "₽" },
  {
    value: "saudi arabia",
    label: "Saudi Arabia",
    currency: "SAR",
    symbol: "﷼",
  },
  { value: "singapore", label: "Singapore", currency: "SGD", symbol: "$" },
  {
    value: "south africa",
    label: "South Africa",
    currency: "ZAR",
    symbol: "R",
  },
  { value: "south korea", label: "South Korea", currency: "KRW", symbol: "₩" },
  { value: "spain", label: "Spain", currency: "EUR", symbol: "€" },
  { value: "sri lanka", label: "Sri Lanka", currency: "LKR", symbol: "Rs" },
  { value: "sweden", label: "Sweden", currency: "SEK", symbol: "kr" },
  { value: "switzerland", label: "Switzerland", currency: "CHF", symbol: "Fr" },
  { value: "thailand", label: "Thailand", currency: "THB", symbol: "฿" },
  { value: "turkey", label: "Turkey", currency: "TRY", symbol: "₺" },
  {
    value: "united arab emirates",
    label: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
  },
  {
    value: "united kingdom",
    label: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    value: "united states",
    label: "United States",
    currency: "USD",
    symbol: "$",
  },
  { value: "vietnam", label: "Vietnam", currency: "VND", symbol: "₫" },
];

export const countryOptions2 = [
  { value: "AF", label: "Afghanistan", currency: "AFN", symbol: "؋" },
  { value: "AL", label: "Albania", currency: "ALL", symbol: "L" },
  { value: "DZ", label: "Algeria", currency: "DZD", symbol: "د.ج" },
  { value: "AD", label: "Andorra", currency: "EUR", symbol: "€" },
  { value: "AO", label: "Angola", currency: "AOA", symbol: "Kz" },
  { value: "AR", label: "Argentina", currency: "ARS", symbol: "$" },
  { value: "AM", label: "Armenia", currency: "AMD", symbol: "֏" },
  { value: "AU", label: "Australia", currency: "AUD", symbol: "$" },
  { value: "AT", label: "Austria", currency: "EUR", symbol: "€" },
  { value: "BD", label: "Bangladesh", currency: "BDT", symbol: "৳" },
  { value: "BE", label: "Belgium", currency: "EUR", symbol: "€" },
  { value: "BR", label: "Brazil", currency: "BRL", symbol: "R$" },
  { value: "CA", label: "Canada", currency: "CAD", symbol: "$" },
  { value: "CN", label: "China", currency: "CNY", symbol: "¥" },
  { value: "DK", label: "Denmark", currency: "DKK", symbol: "kr" },
  { value: "EG", label: "Egypt", currency: "EGP", symbol: "£" },
  { value: "FI", label: "Finland", currency: "EUR", symbol: "€" },
  { value: "FR", label: "France", currency: "EUR", symbol: "€" },
  { value: "DE", label: "Germany", currency: "EUR", symbol: "€" },
  { value: "GR", label: "Greece", currency: "EUR", symbol: "€" },
  { value: "IN", label: "India", currency: "INR", symbol: "₹" },
  { value: "ID", label: "Indonesia", currency: "IDR", symbol: "Rp" },
  { value: "IR", label: "Iran", currency: "IRR", symbol: "﷼" },
  { value: "IQ", label: "Iraq", currency: "IQD", symbol: "ع.د" },
  { value: "IE", label: "Ireland", currency: "EUR", symbol: "€" },
  { value: "IT", label: "Italy", currency: "EUR", symbol: "€" },
  { value: "JP", label: "Japan", currency: "JPY", symbol: "¥" },
  { value: "KE", label: "Kenya", currency: "KES", symbol: "KSh" },
  { value: "MY", label: "Malaysia", currency: "MYR", symbol: "RM" },
  { value: "MX", label: "Mexico", currency: "MXN", symbol: "$" },
  { value: "NP", label: "Nepal", currency: "NPR", symbol: "₨" },
  { value: "NL", label: "Netherlands", currency: "EUR", symbol: "€" },
  { value: "NZ", label: "New Zealand", currency: "NZD", symbol: "$" },
  { value: "NG", label: "Nigeria", currency: "NGN", symbol: "₦" },
  { value: "NO", label: "Norway", currency: "NOK", symbol: "kr" },
  { value: "PK", label: "Pakistan", currency: "PKR", symbol: "₨" },
  { value: "PH", label: "Philippines", currency: "PHP", symbol: "₱" },
  { value: "PL", label: "Poland", currency: "PLN", symbol: "zł" },
  { value: "PT", label: "Portugal", currency: "EUR", symbol: "€" },
  { value: "QA", label: "Qatar", currency: "QAR", symbol: "ر.ق" },
  { value: "RU", label: "Russia", currency: "RUB", symbol: "₽" },
  { value: "SA", label: "Saudi Arabia", currency: "SAR", symbol: "﷼" },
  { value: "SG", label: "Singapore", currency: "SGD", symbol: "$" },
  { value: "ZA", label: "South Africa", currency: "ZAR", symbol: "R" },
  { value: "KR", label: "South Korea", currency: "KRW", symbol: "₩" },
  { value: "ES", label: "Spain", currency: "EUR", symbol: "€" },
  { value: "LK", label: "Sri Lanka", currency: "LKR", symbol: "Rs" },
  { value: "SE", label: "Sweden", currency: "SEK", symbol: "kr" },
  { value: "CH", label: "Switzerland", currency: "CHF", symbol: "Fr" },
  { value: "TH", label: "Thailand", currency: "THB", symbol: "฿" },
  { value: "TR", label: "Turkey", currency: "TRY", symbol: "₺" },
  {
    value: "AE",
    label: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
  },
  { value: "GB", label: "United Kingdom", currency: "GBP", symbol: "£" },
  { value: "US", label: "United States", currency: "USD", symbol: "$" },
  { value: "VN", label: "Vietnam", currency: "VND", symbol: "₫" },
  { value: "SB", label: "Solomon Islands", currency: "SBD", symbol: "$" },
  // add more countries if needed
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

const currencyToLocaleMap: Record<string, string> = {
  USD: "en-US",
  INR: "en-IN",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  AUD: "en-AU",
  CAD: "en-CA",
  CNY: "zh-CN",
};

export function formatCurrency(
  amount: number,
  currencyCode: string = "USD"
): string {
  const locale = currencyToLocaleMap[currencyCode] || "en-US"; // fallback
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "dd MMM yyyy");
};

export const formatTimeAgo = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const paisaToUSD = (paisa: number, usdRate: number) => {
  // paisa / 100 → INR, then convert to USD using rate
  return (paisa / 100 / usdRate).toFixed(2);
};

export const paisaToINR = (paisa: number) => {
  return (paisa / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

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

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freightory",
  description: "Your freight automation partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

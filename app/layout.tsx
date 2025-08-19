import type { Metadata } from "next";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { Toaster } from "sonner";
import { AuthInitializer } from "@/components/providers/AuthInitializer";

export const metadata: Metadata = {
  title: "Freightory",
  description: "Your freight automation partner",
  icons: {
    icon: "/favicon.svg",
  },
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
        <AuthInitializer />
      </body>
    </html>
  );
}

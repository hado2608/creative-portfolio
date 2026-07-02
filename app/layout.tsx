import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import PortfolioFooter from "@/components/shared/PortfolioFooter";
import CustomCursor from "@/components/shared/CustomCursor";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ha Do / Product Design Portfolio",
  description: "UI/UX Designer",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${instrumentSerif.variable} ${geistMono.variable}`}>
<body className="min-h-full flex flex-col">
        {children}
        <PortfolioFooter />
        <CustomCursor />
      </body>
    </html>
  );
}

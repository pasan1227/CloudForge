import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces } from "next/font/google";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudforge.com"),
  title: {
    default: "CloudForge — Software & growth, in lockstep",
    template: "%s · CloudForge",
  },
  description:
    "CloudForge is a full-service software and digital marketing agency. We design and engineer products that ship, then put growth engines behind them.",
  openGraph: {
    title: "CloudForge — Software & growth, in lockstep",
    description:
      "Product engineering, growth marketing, brand and strategy under one roof.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080A12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="bg-grain relative min-h-full flex flex-col overflow-x-clip">
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

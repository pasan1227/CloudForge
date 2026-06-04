import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter_Tight, JetBrains_Mono, Fraunces } from "next/font/google";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import "./globals.css";

// Display serif — Adobe's Source Serif 4. Premium publication weight,
// optical sizing, refined italic. Less decorative than Instrument Serif.
const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Secondary serif — Fraunces, reserved for the one signature italic moment
// (hero accent word). Variable axes available for fine tuning.
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
  axes: ["SOFT", "WONK", "opsz"],
});

// Sans body — Inter Tight. Premium-professional, tighter than vanilla Inter,
// reads more "Linear / Stripe" than "default agency template."
const body = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Mono — JetBrains Mono. Widely respected as a premium code font;
// has a distinct, confident italic. Used for ops chrome + data.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
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
  themeColor: "#070710",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-grain relative min-h-full flex flex-col overflow-x-clip">
        {/* Page rule — a constant editorial spine. Pure CSS, no scripting cost. */}
        <PageRules />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

/* Two faint vertical hairlines at the same gutter positions on every page.
 * They sit behind everything and give the whole site a column-spine. */
function PageRules() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    >
      <div className="mx-auto h-full max-w-7xl px-6 relative">
        <span className="absolute top-0 bottom-0 left-6 w-px bg-[color:var(--hairline)]" />
        <span className="absolute top-0 bottom-0 right-6 w-px bg-[color:var(--hairline)]" />
      </div>
    </div>
  );
}

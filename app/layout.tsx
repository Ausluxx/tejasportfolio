import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tejasgarg.dev"),
  title: "Tejas Garg — Economics & Finance Student | Investment Banking & Quant",
  description:
    "Tejas Garg, an Economics & Finance student at Shiv Nadar University with investment banking internship experience and self-built quant finance projects. Aspiring IB/PE/VC analyst.",
  openGraph: {
    title:
      "Tejas Garg — Economics & Finance Student | Investment Banking & Quant",
    description:
      "Economics & Finance student at Shiv Nadar University with investment banking internship experience and self-built quant finance projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

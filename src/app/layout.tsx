import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { TransitionProvider } from "@/components/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riyas — Architect",
  description:
    "Portfolio of Riyas, an architect designing residential, hospitality and commercial spaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <Preloader />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}

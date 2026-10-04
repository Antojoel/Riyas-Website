import type { Metadata } from "next";
import { Fraunces, Inter, Questrial, Roboto_Flex } from "next/font/google";
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

// Free Century Gothic lookalike — the loader counter asks for the real
// Century Gothic first (a system font, can't be shipped) and falls back here.
const questrial = Questrial({
  variable: "--font-gothic",
  subsets: ["latin"],
  weight: "400",
});

// Variable font for the hero's proximity name effect. wght (100–1000) is
// included by default; wdth (25–151) alone only changes glyph width ~12%,
// so XTRA (counter width) is loaded too for the ultra-condensed/wide look.
const robotoFlex = Roboto_Flex({
  variable: "--font-proximity",
  subsets: ["latin"],
  axes: ["wdth", "XTRA"],
});

export const metadata: Metadata = {
  title: "Mohammed Riyas M — Architect",
  description:
    "Portfolio of Mohammed Riyas M, an architect designing residential, hospitality and commercial spaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${robotoFlex.variable} ${questrial.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dr+Sugiyama&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <Preloader />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}

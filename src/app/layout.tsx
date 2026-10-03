import type { Metadata } from "next";
import { Fraunces, Inter, Roboto_Flex } from "next/font/google";
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

// Variable font for the hero's proximity-hover name effect — loaded with
// the "wdth" axis (wght is included by default for variable fonts).
const robotoFlex = Roboto_Flex({
  variable: "--font-proximity",
  subsets: ["latin"],
  axes: ["wdth"],
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
      className={`${fraunces.variable} ${inter.variable} ${robotoFlex.variable} h-full antialiased`}
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

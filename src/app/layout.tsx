import type { Metadata } from "next";
import {
  Aref_Ruqaa,
  Aref_Ruqaa_Ink,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";

// Aref Ruqaa (monochrome) — the workhorse display font. Respects CSS `color`,
// so the token system works for headings, mood letters, etc.
const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

// Aref Ruqaa Ink — chromatic "scratchy ink" color font. It renders its own red
// ink and ignores CSS `color`, so it is used in EXACTLY ONE place: the hero
// brand wordmark, where the hand-drawn red-ink look is the whole point.
const ruqaaInk = Aref_Ruqaa_Ink({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-ruqaa-ink",
  display: "swap",
});

// Body: 300 (copy), 400 (UI), 500 (emphasis). Never 600/700.
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "توليفة — أنت من تصنع مزاجك",
  description:
    "اصنع توليفتك الخاصة من أجود أنواع البن العربي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ruqaa.variable} ${ruqaaInk.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

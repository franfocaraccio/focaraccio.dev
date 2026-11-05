import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CV downloads",
  robots: { index: false, follow: false },
};

/**
 * A root layout of its own: /stats sits outside the locale segment, is only
 * for the site owner and always renders in the dark theme, with no toggle.
 */
export default function StatsLayout({ children }: LayoutProps<"/stats">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetBrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

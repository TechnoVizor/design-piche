import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-core",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "PICHE — new apartments for sale in Rīga and Mārupe",
  description:
    "New apartments for sale — energy-efficient homes in a modern living environment. Choose your home in new developments across Rīga, Mārupe and the surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-full bg-(--surface-canvas) font-(family-name:--font-core) text-(--text-body) antialiased">
        {children}
      </body>
    </html>
  );
}

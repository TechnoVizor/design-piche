import type { Metadata } from "next";
import { Archivo, Figtree } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PICHE — new apartments for sale in Rīga and Mārupe",
  description:
    "New apartments for sale — energy-efficient homes in a modern living environment. Choose your home in new developments across Rīga, Mārupe and the surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${figtree.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

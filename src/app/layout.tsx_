import type { Metadata } from "next";
import { Poppins, Montserrat, Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-primary",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-secondary",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Lebron Disigner",
  description: "Site portfólio LeBron Dev-Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("antialiased", poppins.variable, montserrat.variable, oxanium.variable)}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Imperial Estates | Luxury Real Estate in Lahore, Pakistan",
  description:
    "Lahore's premier luxury real estate firm. Discover exclusive villas, penthouses, and investment-grade properties across DHA, Bahria Town, and Gulberg. Award-winning service since 2009.",
  keywords: [
    "Lahore real estate",
    "luxury homes Pakistan",
    "DHA Lahore",
    "Bahria Town",
    "property investment Lahore",
    "villas for sale Lahore",
    "Imperial Estates",
  ],
  authors: [{ name: "Imperial Estates" }],
  openGraph: {
    title: "Imperial Estates | Luxury Real Estate in Lahore",
    description:
      "Discover Lahore's most exclusive properties. Villas, penthouses, and investment opportunities with award-winning service.",
    siteName: "Imperial Estates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Estates | Luxury Real Estate in Lahore",
    description:
      "Discover Lahore's most exclusive properties with award-winning service.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}

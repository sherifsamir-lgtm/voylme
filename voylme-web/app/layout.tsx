import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Voylme | Your Personal Travel Assistant",
    template: "%s | Voylme",
  },
  description:
    "Compare flights, hotels, cars and travel services with Voylme.",
  applicationName: "Voylme",
  keywords: [
    "Voylme",
    "flights",
    "hotels",
    "travel",
    "flight comparison",
    "travel assistant",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#660033",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

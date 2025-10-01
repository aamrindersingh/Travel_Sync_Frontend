// server
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header.server";
import "./globals.css";
import AuthGuard from "@/components/ui/AuthGuard.client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelSync - Find Your Perfect Travel Companions",
  description:
    "Connect with fellow travelers and create unforgettable journeys together.",
  keywords: ["travel", "companions", "matching", "nextjs", "react"],
  authors: [{ name: "TravelSync Team" }],
  openGraph: {
    title: "TravelSync - Find Your Perfect Travel Companions",
    description:
      "Connect with fellow travelers and create unforgettable journeys together.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelSync - Find Your Perfect Travel Companions",
    description:
      "Connect with fellow travelers and create unforgettable journeys together.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AuthGuard>
          <main>{children}</main>
        </AuthGuard>
      </body>
    </html>
  );
}

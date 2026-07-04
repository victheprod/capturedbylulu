import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { siteConfig } from "@/data/site";
import { siteImages } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/metadata";
import { AppToaster } from "@/components/admin/Toaster";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "CapturedByLulu | Luxury Photography in San Antonio",
    template: "%s | CapturedByLulu",
  },
  description: siteConfig.description,
  keywords: [
    "San Antonio photographer",
    "wedding photography San Antonio",
    "portrait photographer Texas",
    "family photography San Antonio",
    "CapturedByLulu",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "CapturedByLulu | Luxury Photography in San Antonio",
    description: siteConfig.description,
    images: [
      {
        url: siteImages.hero,
        width: 1200,
        height: 630,
        alt: "Wedding photography by CapturedByLulu in San Antonio",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="absolute left-4 -top-20 z-[100] bg-primary px-4 py-2 text-[11px] tracking-wider uppercase text-primary-foreground transition-[top] focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}

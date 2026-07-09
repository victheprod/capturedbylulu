import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { siteConfig, siteBranding } from "@/data/site";
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
    default: "CapturedByLulu | Texas-Based Luxury Photography",
    template: "%s | CapturedByLulu",
  },
  description: siteConfig.description,
  keywords: [
    "Texas photographer",
    "wedding photography Texas",
    "portrait photographer Texas",
    "family photography Texas",
    "CapturedByLulu",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "CapturedByLulu | Texas-Based Luxury Photography",
    description: siteConfig.description,
    images: [
      {
        url: siteBranding.ogImage,
        width: 512,
        height: 512,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  icons: {
    icon: siteBranding.ogImage,
    apple: siteBranding.ogImage,
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

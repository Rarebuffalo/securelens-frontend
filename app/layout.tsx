import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureLens — AI-Assisted AppSec Analysis & Local Security Investigation Layer",
  description:
    "An AI-assisted AppSec analysis platform and local investigation layer. Turns raw code and web findings into prioritized, explainable investigations with deterministic 0–100 risk scoring.",
  keywords: [
    "AppSec",
    "Security Scanner",
    "SAST",
    "DAST",
    "Deterministic Risk Scoring",
    "CLI Security",
    "AI Remediation",
    "Vulnerability Triage",
  ],
  authors: [{ name: "SecureLens Core Maintainers" }],
  openGraph: {
    title: "SecureLens — AI-Assisted AppSec Analysis Platform",
    description:
      "Deterministic 0–100 risk scoring, offline pattern checks, web exposure audits, and stateful interactive CLI investigation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureLens — AI-Assisted AppSec Analysis Platform",
    description:
      "Deterministic 0–100 risk scoring, offline pattern checks, web exposure audits, and stateful interactive CLI investigation.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

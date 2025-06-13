import type { Metadata } from "next";
import "./globals.css";
import LitHydrationScript from "../components/LitHydrationScript";

export const metadata: Metadata = {
  title: "Radison Akerman - Personal Changelog",
  description: "Personal updates and notes from Radison Akerman.",
  keywords: [
    "Radison Akerman",
    "software engineer",
    "changelog",
    "personal blog",
    "Vista Power",
    "SpaceX",
    "full-stack development",
    "leadership",
    "tech updates",
  ],
  authors: [{ name: "Radison Akerman", url: "https://radison.io" }],
  creator: "Radison Akerman",
  publisher: "Radison Akerman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Radison Akerman - Personal Changelog",
    description: "Personal updates and notes from Radison Akerman.",
    url: "/",
    siteName: "Radison Akerman's Changelog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Radison Akerman - Personal Changelog",
    description: "Personal updates and notes from Radison Akerman.",
    creator: "@rak3rman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification tokens here when available
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
    // yahoo: 'your-yahoo-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/cbeec7ce-7b51-4cc2-81bb-e72289777900/w=32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/cbeec7ce-7b51-4cc2-81bb-e72289777900/w=16"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/cbeec7ce-7b51-4cc2-81bb-e72289777900/w=180"
        />
        <meta name="theme-color" content="#37017f" />
        <meta name="msapplication-TileColor" content="#37017f" />
        <link rel="canonical" href="https://radison.io" />
      </head>
      <body className="font-sans">
        {children}
        <LitHydrationScript />
      </body>
    </html>
  );
}

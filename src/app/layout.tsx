import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monolog | Radison Akerman",
  description:
    "Personal updates, improvements, and notes from Radison Akerman.",
  keywords: [
    "Radison Akerman",
    "software engineer",
    "Monolog",
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
    process.env.NEXT_PUBLIC_SITE_URL || "https://log.radison.io"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Monolog | Radison Akerman",
    description:
      "Personal updates, improvements, and notes from Radison Akerman.",
    url: "/",
    siteName: "Radison Akerman's Monolog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Monolog | Radison Akerman",
    description:
      "Personal updates, improvements, and notes from Radison Akerman.",
    creator: "Radison Akerman",
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
        <meta name="theme-color" content="#08090a" />
        <meta name="msapplication-TileColor" content="#08090a" />
        <link rel="canonical" href="https://log.radison.io" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}

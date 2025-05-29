// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: {
    default: "Your Site Name",
    template: "%s | Your Site Name",
  },
  description: "A modern, SEO-ready Next.js template with theme support.",
  keywords: ["Next.js", "Template", "SEO", "Dark mode", "Design System"],
  metadataBase: new URL("https://yoursite.com"), // Replace with your actual domain
  openGraph: {
    title: "Your Site Name",
    description: "A modern, SEO-ready Next.js template with theme support.",
    url: "https://yoursite.com",
    siteName: "Your Site Name",
    images: [
      {
        url: "/images/og-image.jpg", // Replace with your Open Graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Site Name",
    description: "A modern, SEO-ready Next.js template with theme support.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-chrome-192x192.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

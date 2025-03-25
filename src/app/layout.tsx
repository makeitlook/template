// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/Navbar/TopNav/TopNav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="canonical" href="https://yoursite.com" />

        {/* Structured Data: Edit as needed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Your Site Name",
              url: "https://yoursite.com",
              logo: "https://yoursite.com/logo.png", // Optional: Add logo path
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <TopNav />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
            <Analytics />
            <SpeedInsights />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

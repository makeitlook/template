import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import { ThemeProvider } from "./utils/ThemeProvider";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script"; // ✅ Import Next.js Script component

export const metadata: Metadata = {
  title: "Make It Look",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/favicon-16x16.png",
    apple: "/images/apple-touch-icon.png",
    other: {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/images/android-chrome-192x192.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        {/* ✅ Pageclip Stylesheet */}
        <link
          rel="stylesheet"
          href="https://s.pageclip.co/v1/pageclip.css"
          media="screen"
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Analytics />
            <SpeedInsights />
            <Footer />
          </div>
        </ThemeProvider>

        {/* ✅ Load Pageclip script asynchronously */}
        <Script
          src="https://s.pageclip.co/v1/pageclip.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

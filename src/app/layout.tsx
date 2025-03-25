import "./globals.css";
import TopNav from "@/components/Navbar/TopNav/TopNav";
import Footer from "@/components/Footer/index";
import { ThemeProvider } from "../utils/ThemeProvider";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const navItems = [
  { name: "Product", href: "/product" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
];

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

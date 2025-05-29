"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader/Loader";

// 🌐 Dynamically import top navigation to avoid blocking rendering
const ClientNav = dynamic(() => import("@/components/ClientNav/ClientNav"), {
  ssr: false,
  loading: () => <div className="h-16 bg-neutral" />,
});

// 🌐 Dynamically import footer
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="h-40 bg-neutral" />,
});

// 🎨 Theme provider for light/dark mode support
const ThemeProvider = dynamic(
  () => import("@/utils/ThemeProvider").then((mod) => mod.ThemeProvider),
  { ssr: false }
);

// 📈 Analytics (optional, adjust or remove based on stack)
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

// 🧱 Generic client layout wrapper
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading state (can be customised)
    const timer = setTimeout(() => setIsLoading(false), 1000);

    // Optional: preload assets
    const preloadAssets = () => {
      // Example: new Image().src = "/images/hero.jpg";
    };

    preloadAssets();
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ThemeProvider defaultTheme="light">
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <ClientNav />

            <main className="flex-1 h-full">{children}</main>

            <Footer />

            {/* Optional Analytics */}
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Your Site Name",
    template: "%s | Your Site Name",
  },
  description:
    "Your company description goes here. Explain what your service/product does in one or two sentences.",
  keywords: [
    "Your Brand",
    "Product Name",
    "Web Services",
    "Design",
    "Consulting",
    "Development",
    "Business",
  ],
  metadataBase: new URL("https://yoursite.com"),
  openGraph: {
    title: "Your Site Name",
    description:
      "A brief and compelling Open Graph description of your website or business for social sharing.",
    url: "https://yoursite.com",
    siteName: "Your Site Name",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Site Logo or Social Image",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  // Optional: Uncomment and update for Twitter Card support
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Your Site Name",
  //   description: "Twitter description here",
  //   images: ["/images/og-image.png"],
  //   site: "@yourhandle",
  // },
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

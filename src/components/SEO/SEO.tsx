"use client";

import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}

const defaultMetadata = {
  title: "Your Website Name",
  description: "A modern, performant website built with Next.js.",
  url: "https://yourdomain.com",
  image: "/images/og-default.png",
  keywords: ["Next.js", "Web Development", "Template"],
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  keywords,
}) => {
  const metaTitle = title
    ? `${title} | ${defaultMetadata.title}`
    : defaultMetadata.title;
  const metaDescription = description || defaultMetadata.description;
  const metaUrl = url || defaultMetadata.url;
  const metaImage = image || defaultMetadata.image;
  const metaKeywords = keywords || defaultMetadata.keywords;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords.join(", ")} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
};

export default SEO;

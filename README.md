# 🧰 makeitlook/template

A modern, opinionated Next.js starter template featuring Tailwind CSS, TypeScript, and a suite of pre-configured components. Ideal for rapid development of marketing sites, portfolios, and small business websites.

## ✨ Features

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with custom theme and utility classes
- **Framer Motion** for smooth animations
- **Dynamic Navigation** supporting single and multi-page layouts
- **Theme Switching** with light/dark mode support
- **SEO Optimized** with customizable metadata
- **Responsive Design** out-of-the-box
- **Pre-built Components**: Navbar, Footer, Loader, etc.
- **Analytics Integration** with Vercel Analytics and Speed Insights
- **Client Layout** with dynamic imports for performance optimization

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm (recommended), npm, or yarn

### Installation

```bash
git clone https://github.com/makeitlook/template your-project-name
cd your-project-name
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Using as a Template

To create a new repository based on this template:

1. Navigate to [makeitlook/template](https://github.com/makeitlook/template)
2. Click on **Use this template**
3. Select **Create a new repository**
4. Clone your new repository and start developing!

## 🧱 Project Structure

```
.
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
│   ├── Navbar/          # Navigation components
│   ├── Footer/          # Footer component
│   ├── Loader/          # Loading spinner
│   └── ThemeSwitcher/   # Theme toggle
├── config/              # Configuration files
│   └── navigation.ts    # Navigation items
├── public/              # Static assets
│   └── images/          # Image assets
├── styles/              # Global styles
│   └── globals.css      # Tailwind base styles
├── utils/               # Utility functions
│   └── ThemeProvider.tsx# Theme context provider
└── ...
```

## ⚙️ Configuration

### Metadata

Customize your site's metadata in `app/metadata.ts`:

```ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Your Site Name",
    template: "%s | Your Site Name",
  },
  description: "A brief description of your site.",
  keywords: ["keyword1", "keyword2", "keyword3"],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Your Site Name",
    description: "A brief description of your site.",
    url: "https://yourdomain.com",
    siteName: "Your Site Name",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Site Name",
      },
    ],
    locale: "en_GB",
    type: "website",
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
```

### Navigation

Define your site's navigation structure in `config/navigation.ts`:

```ts
export const navigationItems = [
  {
    name: "Home",
    sectionId: "home",
    current: true,
  },
  {
    name: "About",
    sectionId: "about",
  },
  {
    name: "Services",
    sectionId: "services",
  },
  {
    name: "Contact",
    sectionId: "contact",
  },
];
```

### Theme Colors

Customize your theme colors in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        "elements-primary-main": "#1D4ED8",
        "elements-secondary-main": "#9333EA",
        "neutral-dimmed-heavy": "#1F2937",
        // Add more custom colors as needed
      },
    },
  },
};
```

## 🧪 Testing Your Site

To test single-page navigation:

1. Set `navMode` to `"single"` in your navigation component.
2. Ensure each section has a corresponding `id` matching the `sectionId` in your navigation items.
3. Clicking on a navigation link should smoothly scroll to the respective section.

## 🚀 Deploying to Vercel

You can deploy this template instantly using [Vercel](https://vercel.com), the platform from the creators of Next.js.

### 🔧 Steps to Deploy:

1. **Push to GitHub**
   If you haven’t already, push this project to your GitHub account:

   ```bash
   git init
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Create a Vercel Account**
   Visit [https://vercel.com](https://vercel.com) and sign up/log in using your GitHub account.

3. **Import Your Project**

   - Click “+ New Project”
   - Select your GitHub repo
   - Vercel will auto-detect this as a Next.js app

4. **Set Environment Variables (if needed)**
   If your project uses any `.env.local` values, you can configure them under **Settings > Environment Variables** in your Vercel dashboard.

5. **Build the Project Locally (Optional but Recommended)**
   Run the build locally to make sure everything compiles before deploying:

   ```bash
   npm install
   npm run build
   ```

   This step helps catch issues like missing environment variables or build-time errors.

6. **Deploy**
   Hit **Deploy** — Vercel will handle the build and hosting for you. You’ll get a live URL like:

   ```
   https://your-project-name.vercel.app
   ```

---

### 🧪 Local Preview

To test your production build locally:

```bash
npm run build
npm run start
```

This simulates how your site will run on Vercel's production environment.

---

Let me know if you want this wrapped into the full `README.md` file too!

## 🧰 Additional Tools

- **Analytics**: Integrated with Vercel Analytics and Speed Insights.
- **Loader**: Customizable loading spinner using `react-loader-spinner`.
- **Theme Switching**: Toggle between light and dark modes seamlessly.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Created by Make It Look

---

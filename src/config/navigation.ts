import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";
import {
  LuHouse,
  LuInfo,
  LuFile,
  LuCalendarDays,
  LuPhone,
} from "react-icons/lu";

// Define navigation item structure
export interface NavigationItem {
  name: string;
  sectionId?: string; // For anchor-based single-page nav
  path?: string; // For route-based multi-page nav
  current: boolean;
  icon?: IconType;
  description?: string;
  children?: NavigationItem[];
  disabled?: boolean;
}

// Hook-based config (e.g. for dynamic use in app)
export function useNavigationConfig(): {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        name: "Home",
        sectionId: "home",
        path: "/",
        current: pathname === "/",
        icon: LuHouse,
      },
      {
        name: "About",
        sectionId: "about",
        path: "/notfound",
        current: pathname === "/about",
        icon: LuInfo,
      },
      {
        name: "Services",
        sectionId: "services",
        path: "/services",
        current: pathname.startsWith("/services"),
        icon: LuFile,
        children: [
          {
            name: "Web Development",
            sectionId: "web-development",
            path: "/services/web-development",
            current: pathname === "/services/web-development",
            icon: LuFile,
            description: "Custom web development solutions",
          },
          {
            name: "App Design",
            sectionId: "app-design",
            path: "/services/app-design",
            current: pathname === "/services/app-design",
            icon: LuFile,
            description: "Mobile and web application design",
          },
          {
            name: "Consulting",
            sectionId: "consulting",
            path: "/services/consulting",
            current: pathname === "/services/consulting",
            icon: LuFile,
            description: "Expert technology consulting",
          },
        ],
      },
      {
        name: "Schedule",
        sectionId: "schedule",
        path: "/schedule",
        current: pathname === "/schedule",
        icon: LuCalendarDays,
      },
      {
        name: "Contact",
        sectionId: "contact",
        path: "/contact",
        current: pathname === "/contact",
        icon: LuPhone,
      },
    ],
    [pathname]
  );

  return {
    navigationItems,
    showNavigation: true,
  };
}

// Predefined configs for different layout needs
export const mainNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", sectionId: "home", path: "/", current: true },
    { name: "About", sectionId: "about", path: "/about", current: false },
    {
      name: "Services",
      sectionId: "services",
      path: "/services",
      current: false,
    },
    {
      name: "Schedule",
      sectionId: "schedule",
      path: "/schedule",
      current: false,
    },
    { name: "Contact", sectionId: "contact", path: "/contact", current: false },
  ],
  showNavigation: true,
};

export const minimalistNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", sectionId: "home", path: "/", current: true },
    { name: "Contact", sectionId: "contact", path: "/contact", current: false },
  ],
  showNavigation: true,
};

export const fullNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", sectionId: "home", path: "/", current: true },
    { name: "About", sectionId: "about", path: "/about", current: false },
    {
      name: "Services",
      sectionId: "services",
      path: "/services",
      current: false,
      children: [
        {
          name: "Web Development",
          sectionId: "web-development",
          path: "/services/web-development",
          current: false,
          icon: LuFile,
          description: "Custom web development solutions",
        },
        {
          name: "App Design",
          sectionId: "app-design",
          path: "/services/app-design",
          current: false,
          icon: LuFile,
          description: "Mobile and web application design",
        },
        {
          name: "Consulting",
          sectionId: "consulting",
          path: "/services/consulting",
          current: false,
          icon: LuFile,
          description: "Expert technology consulting",
        },
      ],
    },
    {
      name: "Schedule",
      sectionId: "schedule",
      path: "/schedule",
      current: false,
    },
    { name: "Contact", sectionId: "contact", path: "/contact", current: false },
  ],
  showNavigation: true,
};

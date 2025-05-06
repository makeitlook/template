// navigationConfig.ts
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavConfig } from "@/components/Navbar/ConfigurableNav/ConfigurableNav";
import { IconType } from "react-icons";
import {
  LuHouse,
  LuInfo,
  LuFile,
  LuCalendarDays,
  LuPhone,
} from "react-icons/lu";

// Define navigation items with types
export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon?: IconType;
  description?: string;
  children?: NavigationItem[];
  disabled?: boolean;
}

// Create a hook to use navigation configuration
export function useNavigationConfig(): {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        current: pathname === "/",
        icon: LuHouse,
        description: "Learn more about our company",
        disabled: false,
      },
      {
        name: "About",
        href: "/about",
        current: pathname === "/about",
        icon: LuInfo,
        description: "Learn more about our company",
        disabled: false,
      },
      {
        name: "Services",
        href: "#",
        current: pathname.startsWith("/services"),
        icon: LuFile,
        description: "Explore our service offerings",
        disabled: false,
        children: [
          {
            name: "Web Development",
            href: "/services/web-development",
            current: pathname === "/services/web-development",
            description: "Custom web development solutions",
            icon: LuFile,
            disabled: false,
          },
          {
            name: "App Design",
            href: "/services/app-design",
            current: pathname === "/services/app-design",
            description: "Mobile and web application design",
            icon: LuFile,
            disabled: false,
          },
          {
            name: "Consulting",
            href: "/services/consulting",
            current: pathname === "/services/consulting",
            description: "Expert technology consulting",
            icon: LuFile,
            disabled: false,
          },
        ],
      },
      {
        name: "Schedule",
        href: "/schedule",
        current: pathname === "/schedule",
        icon: LuCalendarDays,
        description: "Book a consultation or service",
        disabled: false,
      },
      {
        name: "Contact",
        href: "/contact",
        current: pathname === "/contact",
        icon: LuPhone,
        description: "Get in touch with us",
        disabled: false,
      },
    ],
    [pathname]
  );

  return {
    navigationItems,
    showNavigation: true,
  };
}

// Export alternative navigation configurations that can be imported directly
export const mainNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", href: "/", current: true },
    { name: "About", href: "/about", current: false },
    { name: "Services", href: "/services", current: false },
    { name: "Schedule", href: "/schedule", current: false },
    { name: "Contact", href: "/contact", current: false },
  ],
  showNavigation: true,
};

export const minimalistNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", href: "/", current: true },
    { name: "Contact", href: "/contact", current: false },
  ],
  showNavigation: true,
};

export const fullNavigation: {
  navigationItems: NavigationItem[];
  showNavigation: boolean;
} = {
  navigationItems: [
    { name: "Home", href: "/", current: true },
    { name: "About", href: "/about", current: false },
    {
      name: "Services",
      href: "#",
      current: false,
      children: [
        {
          name: "Web Development",
          href: "/services/web-development",
          current: false,
          description: "Custom web development solutions",
          icon: LuFile,
        },
        {
          name: "App Design",
          href: "/services/app-design",
          current: false,
          description: "Mobile and web application design",
          icon: LuFile,
        },
        {
          name: "Consulting",
          href: "/services/consulting",
          current: false,
          description: "Expert technology consulting",
          icon: LuFile,
        },
      ],
    },
    { name: "Schedule", href: "/schedule", current: false },
    { name: "Contact", href: "/contact", current: false },
  ],
  showNavigation: true,
};

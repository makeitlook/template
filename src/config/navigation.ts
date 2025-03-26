import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";
import {
  LuHouse,
  LuFile,
  LuCalendarDays,
  LuPhone,
  LuInfo,
} from "react-icons/lu";

export interface NavigationItem {
  name: string;
  href: string;
  icon: IconType;
  description: string;
  children?: NavigationItem[];
  disabled: boolean;
  current: boolean;
}

export const useNavigationConfig = () => {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        icon: LuHouse,
        description: "Learn more about our company",
        disabled: false,
        current: pathname === "/",
      },
      {
        name: "About",
        href: "/about",
        icon: LuInfo,
        description: "Learn more about our company",
        disabled: false,
        current: pathname === "/about",
      },
      {
        name: "Services",
        href: "/services",
        icon: LuFile,
        description: "Explore our service offerings",
        disabled: false,
        current: pathname.startsWith("/services"),
        children: [
          {
            name: "Web Development",
            href: "/services/web-development",
            icon: LuFile,
            description: "Custom web development solutions",
            disabled: false,
            current: pathname === "/services/web-development",
          },
          {
            name: "App Design",
            href: "/services/app-design",
            icon: LuFile,
            description: "Mobile and web application design",
            disabled: false,
            current: pathname === "/services/app-design",
          },
          {
            name: "Consulting",
            href: "/services/consulting",
            icon: LuFile,
            description: "Expert technology consulting",
            disabled: false,
            current: pathname === "/services/consulting",
          },
        ],
      },
      {
        name: "Schedule",
        href: "/schedule",
        icon: LuCalendarDays,
        description: "Book a consultation or service",
        disabled: false,
        current: pathname === "/schedule",
      },
      {
        name: "Contact",
        href: "/contact",
        icon: LuPhone,
        description: "Get in touch with us",
        disabled: false,
        current: pathname === "/contact",
      },
    ],
    [pathname]
  );

  return { navigationItems, showNavigation: true };
};

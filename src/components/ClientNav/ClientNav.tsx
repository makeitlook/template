"use client";

import ConfigurableNavigation, {
  NavItem,
} from "@/components/Navbar/ConfigurableNav/ConfigurableNav";
import { useNavigationConfig, NavigationItem } from "@/config/navigation";
import { SVGProps } from "react";

// Convert NavigationItem[] to NavItem[]
function convertNavigationItems(items: NavigationItem[]): NavItem[] {
  return items.map((item) => {
    const convertedIcon = item.icon
      ? (item.icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>)
      : undefined;

    return {
      name: item.name,
      sectionId: item.sectionId,
      path: item.path,
      current: item.current,
      disabled: item.disabled,
      icon: convertedIcon,
      description: item.description,
      children: item.children
        ? convertNavigationItems(item.children)
        : undefined,
    };
  });
}

export default function ClientNav() {
  const { navigationItems, showNavigation } = useNavigationConfig();
  const convertedItems = convertNavigationItems(navigationItems);

  return (
    <ConfigurableNavigation
      navigationConfig={{
        navigationItems: convertedItems,
        showNavigation,
      }}
      navMode="multi"
      variant="glass"
      glassMorphism={false}
      showThemeSwitcher={true}
      logo={{
        light: "/images/logo-light.svg",
        dark: "/images/logo-dark.svg",
        width: 130,
        height: 40,
      }}
      mobileFullScreen={false}
      cta={{
        show: false,
        text: "Get in Touch",
        href: "/contact",
      }}
    />
  );
}

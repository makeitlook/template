"use client";

import ConfigurableNavigation, {
  NavItem,
} from "@/components/Navbar/ConfigurableNav/ConfigurableNav";
import { useNavigationConfig, NavigationItem } from "@/config/navigation";
import { SVGProps } from "react";

// This function converts NavigationItem[] to NavItem[]
function convertNavigationItems(items: NavigationItem[]): NavItem[] {
  return items.map((item) => {
    // Convert the icon type
    const convertedIcon = item.icon
      ? // Cast the IconType to the expected React.FC<SVGProps<SVGSVGElement>> type
        (item.icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>)
      : undefined;

    return {
      name: item.name,
      href: item.href,
      current: item.current,
      disabled: item.disabled,
      icon: convertedIcon,
      description: item.description,
      // Recursively convert children if they exist
      children: item.children
        ? convertNavigationItems(item.children)
        : undefined,
    };
  });
}

export default function ClientNav() {
  // Now we can use the React hook in a client component
  const { navigationItems, showNavigation } = useNavigationConfig();

  // Convert navigation items to the expected type
  const convertedItems = convertNavigationItems(navigationItems);

  return (
    <ConfigurableNavigation
      navigationConfig={{
        navigationItems: convertedItems,
        showNavigation,
      }}
      variant="glass"
      glassMorphism={true}
      showThemeSwitcher={true}
      logo={{
        light: "/images/logo-light.svg",
        dark: "/images/logo-dark.svg",
        width: 130,
        height: 40,
      }}
    />
  );
}

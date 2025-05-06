"use client";

import React, { useState, useEffect } from "react";
import { LuMenu, LuX, LuChevronDown, LuPhone } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

// Type definitions
export interface NavItem {
  name: string;
  href: string;
  current?: boolean;
  disabled?: boolean;
  children?: NavItem[];
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  description?: string;
}

export interface NavConfig {
  navigationItems: NavItem[];
  showNavigation?: boolean;
}

export interface NavProps {
  navigationConfig?: NavConfig;
  items?: NavItem[]; // Alternative to using navigationConfig
  variant?: "standard" | "glass" | "solid";
  position?: "top" | "left";
  theme?: "light" | "dark" | "auto";
  cta?: {
    show: boolean;
    text?: string;
    href?: string;
    phoneNumber?: string;
  };
  logo?: {
    light: string;
    dark: string;
    width?: number;
    height?: number;
  };
  showThemeSwitcher?: boolean;
  mobileFullScreen?: boolean;
  transparent?: boolean;
  glassMorphism?: boolean;
  className?: string;
}

// Helper function for class conditionals
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Icon components
const ChevronIcon = LuChevronDown as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const XIcon = LuX as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MenuIcon = LuMenu as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const PhoneIcon = LuPhone as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const ConfigurableNavigation: React.FC<NavProps> = ({
  navigationConfig,
  items,
  variant = "standard",
  position = "top",
  theme = "auto",
  cta = { show: false },
  logo,
  showThemeSwitcher = false,
  mobileFullScreen = false,
  transparent = false,
  glassMorphism = false,
  className = "",
}) => {
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Get navigation items from either navigationConfig or items prop
  const navigationItems = navigationConfig?.navigationItems || items || [];
  const showNavigation = navigationConfig?.showNavigation !== false;

  // Determine theme colors
  const currentTheme = theme === "auto" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  // Function to close the mobile menu
  const closeMenu = () => setMobileMenuOpen(false);

  // Component mounting effect
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && mobileFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, mobileFullScreen]);

  // Exit early if navigation should not be shown
  if (!showNavigation) return null;

  // Component styling based on variant and position
  const getNavStyles = () => {
    // Base styles
    let styles = {
      container: "",
      wrapper: "",
      header: "",
      navItem: {
        base: "inline-flex items-center px-1 text-sm font-medium",
        active: "",
        inactive: "",
        disabled: "opacity-50 cursor-not-allowed",
      },
      dropdown: {
        container: "",
        item: "",
      },
      mobileMenu: {
        container: "",
        backdrop: "",
        item: {
          base: "block py-2 pl-3 pr-4 text-sm font-medium",
          active: "",
          inactive: "",
        },
      },
    };

    // Apply variant styles
    switch (variant) {
      case "glass":
        styles.container = glassMorphism
          ? "backdrop-blur-md bg-card-background/70 border-b border-border-dimmed shadow-lg rounded-xl mx-auto px-6"
          : "backdrop-blur-md bg-card-background/70 border-b border-border-dimmed shadow-lg rounded-xl mx-auto px-6";
        styles.navItem.active =
          "border-elements-secondary-main text-text-primary";
        styles.navItem.inactive =
          "border-transparent text-ternary-dark hover:text-text-primary hover:border-elements-secondary-main";
        styles.mobileMenu.container = "bg-card-background/90 rounded-b-xl";
        break;
      case "solid":
        styles.container = "bg-elements-primary-shadow";
        styles.navItem.active =
          "border-elements-secondary-main text-text-clear";
        styles.navItem.inactive =
          "border-transparent text-text-clear hover:border-elements-secondary-main hover:text-elements-secondary-main";
        styles.mobileMenu.container = "bg-elements-primary-shadow";
        break;
      case "standard":
      default:
        styles.container = transparent
          ? "bg-transparent"
          : "bg-neutral-dimmed-heavy";
        styles.navItem.active =
          "border-elements-primary-main text-text-primary";
        styles.navItem.inactive =
          "border-transparent text-text-secondary hover:border-text-tertiary hover:text-text-primary";
        styles.mobileMenu.container = "bg-neutral-dimmed-heavy";
        break;
    }

    // Apply position styles
    if (position === "top") {
      if (variant === "glass") {
        styles.wrapper = "fixed w-full top-0 z-50 sm:px-40 sm:pt-5";
      } else {
        styles.wrapper = "fixed w-full top-0 z-50";
      }
      styles.navItem.base += " border-b-2";
    } else {
      styles.wrapper = "fixed h-full left-0 top-0 z-50";
      styles.navItem.base += " border-l-2";
    }

    return styles;
  };

  const styles = getNavStyles();

  // Logo component
  const LogoComponent = () => {
    if (logo) {
      const logoSrc = isDark ? logo.light : logo.dark;
      return (
        <Image
          src={logoSrc}
          alt="Logo"
          width={logo.width || 130}
          height={logo.height || 40}
        />
      );
    }

    // Fallback text logo
    return <span className="text-lg font-bold">LOGO</span>;
  };

  // CTA Button component
  const CTAButton = () => {
    if (!cta.show) return null;

    return (
      <Link
        href={cta.href || (cta.phoneNumber ? `tel:${cta.phoneNumber}` : "#")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-elements-secondary-main hover:bg-elements-secondary-hover"
        onClick={closeMenu}
      >
        {cta.phoneNumber && <PhoneIcon className="mr-2 h-4 w-4" />}
        {cta.text || "Contact Us"}
      </Link>
    );
  };

  // Desktop nav item renderer
  const renderNavItem = (item: NavItem) => {
    if (item.disabled) {
      return (
        <span
          key={item.name}
          className={classNames(styles.navItem.base, styles.navItem.disabled)}
          aria-disabled="true"
        >
          {item.name}
        </span>
      );
    }

    if (item.children && item.children.length > 0) {
      const isActive = item.children.some(({ current }) => current);
      return (
        <div key={item.name} className="relative self-center">
          <button
            className={classNames(
              styles.navItem.base,
              item.current || isActive
                ? styles.navItem.active
                : styles.navItem.inactive
            )}
            onClick={() =>
              setDropdownOpen(dropdownOpen === item.name ? null : item.name)
            }
          >
            {item.name}
            <motion.div
              animate={{ rotate: dropdownOpen === item.name ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronIcon className="ml-1 h-5 w-5" aria-hidden="true" />
            </motion.div>
          </button>

          <AnimatePresence>
            {dropdownOpen === item.name && mounted && (
              <div className="absolute left-1/2 z-50 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-neutral-dimmed text-sm leading-6 shadow-lg ring-2 ring-divider-main"
                >
                  <div className="p-2">
                    {item.children?.map((subItem, index) => {
                      const Icon = subItem.icon as React.FC<
                        React.SVGProps<SVGSVGElement>
                      >;

                      return (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div
                            className={classNames(
                              "group relative flex gap-x-6 rounded-lg p-4",
                              subItem.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : subItem.current
                                ? "bg-neutral-shadow"
                                : "hover:bg-neutral"
                            )}
                          >
                            {Icon && (
                              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-neutral group-hover:bg-neutral-dimmed-heavy">
                                <Icon
                                  aria-hidden="true"
                                  className="h-6 w-6 text-text-secondary"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-text-secondary">
                                {subItem.name}
                              </p>
                              {subItem.description && (
                                <p className="mt-1 text-text-tertiary font-medium text-xs">
                                  {subItem.description}
                                </p>
                              )}
                              {!subItem.disabled && (
                                <Link
                                  href={subItem.href}
                                  prefetch={false}
                                  onClick={() => {
                                    setDropdownOpen(null);
                                    closeMenu();
                                  }}
                                  className="absolute inset-0"
                                  aria-label={subItem.name}
                                />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        prefetch={false}
        key={item.name}
        href={item.href}
        className={classNames(
          variant === "glass"
            ? "text-md tracking-wide transition-colors font-medium"
            : styles.navItem.base,
          item.current ? styles.navItem.active : styles.navItem.inactive
        )}
        onClick={closeMenu}
      >
        {item.name}
      </Link>
    );
  };

  // Mobile nav item renderer
  const renderMobileNavItem = (item: NavItem) => {
    if (item.disabled) {
      return (
        <span
          key={item.name}
          className={classNames(
            styles.mobileMenu.item.base,
            "border-l-4 border-transparent",
            styles.navItem.disabled
          )}
          aria-disabled="true"
        >
          {item.name}
        </span>
      );
    }

    if (item.children && item.children.length > 0) {
      return (
        <div key={item.name} className="space-y-1">
          <button
            className={classNames(
              "flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium focus:outline-none",
              dropdownOpen === item.name
                ? styles.navItem.active
                : styles.navItem.inactive
            )}
            onClick={() =>
              setDropdownOpen(dropdownOpen === item.name ? null : item.name)
            }
          >
            {item.name}
            <motion.div
              animate={{ rotate: dropdownOpen === item.name ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronIcon className="h-5 w-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {dropdownOpen === item.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                {item.children?.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={classNames(
                      styles.mobileMenu.item.base,
                      "border-l-4 pl-5",
                      subItem.current
                        ? styles.navItem.active
                        : styles.navItem.inactive
                    )}
                    onClick={closeMenu}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Updated mobile menu item styling for glass variant
    if (variant === "glass") {
      return (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link
            href={item.href}
            className="block text-lg text-ternary-dark hover:text-text-primary transition-colors font-medium py-2"
            onClick={closeMenu}
          >
            {item.name}
          </Link>
        </motion.div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          styles.mobileMenu.item.base,
          "border-l-4",
          item.current ? styles.navItem.active : styles.navItem.inactive
        )}
        onClick={closeMenu}
      >
        {item.name}
      </Link>
    );
  };

  // Mobile menu hamburger button with custom animation for glass variant
  const renderMobileMenuButton = () => {
    if (variant === "glass") {
      return (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-10 w-10 h-10 rounded-full hover:bg-button-hover transition-colors"
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className="w-4 h-4 flex flex-col items-center justify-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                className="absolute w-4 h-0.5 bg-text-secondary transform-gpu"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="absolute w-4 h-0.5 bg-text-secondary"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                className="absolute w-4 h-0.5 bg-text-secondary transform-gpu"
              />
            </motion.div>
          </div>
        </button>
      );
    }

    return (
      <button
        className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="sr-only">
          {mobileMenuOpen ? "Close main menu" : "Open main menu"}
        </span>
        <motion.div
          animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {mobileMenuOpen ? (
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          )}
        </motion.div>
      </button>
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: position === "top" ? -20 : 0,
        x: position === "left" ? -20 : 0,
      }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      className={classNames(styles.wrapper, className)}
    >
      <header className={styles.container}>
        <div className="relative">
          <div className={variant === "glass" ? "" : "px-2 sm:px-6"}>
            <div className="flex h-20 items-center justify-between">
              {/* Logo section */}
              <div className="flex flex-shrink-0 items-center z-10">
                <Link href="/" className="relative z-10">
                  <LogoComponent />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-8 flex-grow justify-end">
                <div className="flex items-center space-x-8">
                  {navigationItems.map(renderNavItem)}
                </div>

                {/* Desktop CTA and Theme Switcher */}
                <div className="flex items-center gap-4">
                  <ThemeSwitcher />
                  <CTAButton />
                </div>
              </div>

              {/* Mobile: Menu and Action Buttons */}
              <div className="flex items-center sm:hidden space-x-3">
                <ThemeSwitcher />
                <CTAButton />
                {renderMobileMenuButton()}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={
                  mobileFullScreen ? { opacity: 0 } : { opacity: 0, height: 0 }
                }
                animate={
                  mobileFullScreen
                    ? { opacity: 1 }
                    : { opacity: 1, height: "auto" }
                }
                exit={
                  mobileFullScreen ? { opacity: 0 } : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className={classNames(
                  mobileFullScreen
                    ? "fixed inset-0 z-40 flex flex-col"
                    : "sm:hidden",
                  styles.mobileMenu.container
                )}
                style={mobileFullScreen ? { paddingTop: "6rem" } : {}}
              >
                {/* Mobile Nav Items */}
                <div
                  className={
                    variant === "glass"
                      ? "px-6 py-8 space-y-6"
                      : "px-4 py-6 space-y-4"
                  }
                  style={
                    variant === "glass"
                      ? { overflow: "hidden" }
                      : { overflowY: "auto" }
                  }
                >
                  {navigationItems.map(renderMobileNavItem)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </motion.div>
  );
};

export default ConfigurableNavigation;

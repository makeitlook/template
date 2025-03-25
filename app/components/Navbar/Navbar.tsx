"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "next-themes";

interface NavigationItem {
  label: string;
  href: string;
  current: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: "About", href: "#aboutus-section", current: false },
  { label: "Services", href: "#services-section", current: false },
  { label: "Contact", href: "#contact-section", current: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <header className="fixed w-full top-0 z-50 sm:px-40 sm:pt-5">
      <div className="mx-auto px-6 backdrop-blur-md bg-card-background/70 border-b border-border-dimmed rounded-xl shadow-lg">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/images/logo-light.svg"
                  : "/images/logo-dark.svg"
              }
              alt="Logo"
              width={130}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-md tracking-wide text-ternary-dark hover:text-text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-10 w-10 h-10 rounded-full hover:bg-button-hover transition-colors"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isOpen ? "open" : "closed"}
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
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-lg text-ternary-dark hover:text-text-primary transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

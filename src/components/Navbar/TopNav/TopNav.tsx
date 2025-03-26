"use client";

import { useState, useEffect } from "react";
import { Disclosure, Popover } from "@headlessui/react";
import { LuMenu, LuX, LuChevronDown } from "react-icons/lu";
import { useNavigationConfig, NavigationItem } from "@/config/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ChevronIcon = LuChevronDown as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const XIcon = LuX as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const MenuIcon = LuMenu as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export default function TopNav() {
  const { navigationItems, showNavigation } = useNavigationConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!showNavigation) return null;

  const renderNavItem = (item: NavigationItem) => {
    if (item.disabled) {
      return (
        <span
          key={item.name}
          className={classNames(
            "border-transparent text-text-secondary",
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
            "opacity-50 cursor-not-allowed"
          )}
          aria-disabled="true"
        >
          {item.name}
        </span>
      );
    }

    if (item.children) {
      const isActive = item.children.some(({ current }) => current);
      return (
        <Popover key={item.name} className="relative self-center">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={classNames(
                  item.current || isActive
                    ? "border-elements-primary-main text-text-primary"
                    : "border-transparent text-text-secondary hover:border-text-tertiary hover:text-text-primary",
                  "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium h-10 focus:outline-none"
                )}
              >
                {item.name}
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronIcon
                    className="ml-1 h-5 w-5 text-text-tertiary"
                    aria-hidden="true"
                  />
                </motion.div>
              </Popover.Button>

              <AnimatePresence>
                {open && mounted && (
                  <Popover.Panel className="absolute left-1/2 z-50 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
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
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-neutral group-hover:bg-neutral-dimmed-heavy">
                                  <Icon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-text-secondary"
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-text-secondary">
                                    {subItem.name}
                                  </p>
                                  <p className="mt-1 text-text-tertiary font-medium text-xs">
                                    {subItem.description}
                                  </p>
                                  {!subItem.disabled && (
                                    <Link
                                      href={subItem.href}
                                      prefetch={false}
                                      onClick={() => close()}
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
                  </Popover.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      );
    }

    return (
      <Link
        prefetch={false}
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? "border-elements-primary-main text-text-primary"
            : "border-transparent text-text-secondary hover:border-text-tertiary hover:text-text-primary",
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
        )}
      >
        {item.name}
      </Link>
    );
  };

  const renderMobileNavItem = (item: NavigationItem) => {
    if (item.disabled) {
      return (
        <span
          key={item.name}
          className={classNames(
            "block border-l-4 py-2 pl-3 pr-4 text-sm font-medium",
            "opacity-50 cursor-not-allowed border-transparent text-text-secondary"
          )}
          aria-disabled="true"
        >
          {item.name}
        </span>
      );
    }

    if (item.children) {
      return (
        <Disclosure key={item.name} as="div" className="space-y-1">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  open
                    ? "bg-neutral border-elements-primary-main text-text-primary"
                    : "border-transparent text-text-secondary",
                  "flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium focus:outline-none"
                )}
              >
                {item.name}
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronIcon className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </Disclosure.Button>
              <AnimatePresence>
                {open && (
                  <Disclosure.Panel>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1"
                    >
                      {item.children?.map((subItem) =>
                        subItem.disabled ? (
                          <span
                            key={subItem.name}
                            className={classNames(
                              "block border-l-4 py-2 pl-5 pr-4 text-sm font-medium",
                              "opacity-50 cursor-not-allowed border-transparent text-text-secondary"
                            )}
                            aria-disabled="true"
                          >
                            {subItem.name}
                          </span>
                        ) : (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={classNames(
                              subItem.current
                                ? "bg-neutral border-elements-primary-main text-text-primary"
                                : "border-transparent text-text-secondary hover:bg-neutral-dimmed hover:border-border-dimmed hover:text-text-primary",
                              "block border-l-4 py-2 pl-5 pr-4 text-sm font-medium"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        )
                      )}
                    </motion.div>
                  </Disclosure.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? "bg-neutral border-elements-primary-main text-text-primary"
            : "border-transparent text-text-secondary hover:bg-neutral-dimmed hover:border-border-dimmed hover:text-text-primary",
          "block border-l-4 py-2 pl-3 pr-4 text-sm font-medium"
        )}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-neutral-dimmed-heavy">
        <Disclosure as="nav" className="relative">
          {({ open }) => (
            <>
              <div className="px-2 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex flex-1 items-center sm:items-stretch sm:justify-start px-2">
                    <div className="flex flex-shrink-0 items-center w-40">
                      <Logo />
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      {navigationItems.map(renderNavItem)}
                    </div>
                  </div>

                  <div className="flex items-center sm:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-text-secondary">
                      <span className="sr-only">Open main menu</span>
                      <motion.div
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </motion.div>
                    </Disclosure.Button>
                  </div>

                  <div className="flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:pr-0">
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {open && (
                  <Disclosure.Panel className="sm:hidden">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1 px-2 pb-3 pt-2"
                    >
                      {navigationItems.map(renderMobileNavItem)}
                    </motion.div>
                  </Disclosure.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Disclosure>
      </header>
    </motion.div>
  );
}

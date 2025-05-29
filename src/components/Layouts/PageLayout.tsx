"use client";

import React from "react";
import PageTransition from "@/components/PageTransition/PageTransition";

type PageLayoutProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  fullHeight?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  className = "",
  noPadding = false,
  fullHeight = false,
}) => {
  return (
    <PageTransition>
      <div
        className={`
          bg-background overflow-x-hidden
          ${fullHeight ? "min-h-screen flex flex-col" : ""}
          ${noPadding ? "" : "px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12"}
        `}
      >
        <div
          className={`max-w-7xl mx-auto w-full ${
            fullHeight ? "flex-1 flex items-center justify-center" : ""
          } ${className}`}
        >
          {title && (
            <h1 className="text-3xl font-semibold tracking-tight mb-8">
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>
    </PageTransition>
  );
};

export default PageLayout;

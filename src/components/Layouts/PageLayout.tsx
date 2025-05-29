import React from "react";

type PageLayoutProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className="h-full bg-background overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
      <div className={`max-w-7xl mx-auto ${className}`}>
        {title && (
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

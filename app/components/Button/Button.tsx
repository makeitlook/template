import React from "react";

// Define button types as a constant for better type safety
const BUTTON_TYPES = {
  WARNING: "warning",
  UNDO: "undo",
  CONTINUE: "continue",
  REMOVE: "remove",
  TEXT: "text",
  ICON: "icon",
} as const;

type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

// Base styles shared by all button types
const BASE_BUTTON_STYLES =
  "inline-flex justify-center items-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out";

// Specific styles for each button type
const BUTTON_STYLES: Record<ButtonType, string> = {
  [BUTTON_TYPES.WARNING]: `${BASE_BUTTON_STYLES} bg-helpers-error-button text-elements-primary-contrastText shadow-sm ring-1 ring-inset ring-helpers-error-button hover:bg-helpers-error-button-hover hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-helpers-error-button/50`,

  [BUTTON_TYPES.UNDO]: `${BASE_BUTTON_STYLES} bg-neutral-dimmed text-text-secondary ring-1 ring-border-shadow ring-neutral-shadow hover:bg-button-hover hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-shadow/50`,

  [BUTTON_TYPES.CONTINUE]: `${BASE_BUTTON_STYLES} bg-elements-primary-main text-white hover:bg-elements-primary-shadow hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-elements-primary-main/50`,

  [BUTTON_TYPES.REMOVE]: `${BASE_BUTTON_STYLES} bg-helpers-remove-button text-elements-primary-contrastText shadow-sm ring-1 ring-inset ring-helpers-remove-button hover:bg-helpers-remove-button-hover hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-helpers-remove-button/50`,

  [BUTTON_TYPES.TEXT]: `${BASE_BUTTON_STYLES} text-text-secondary hover:text-text-primary hover:bg-gray-100 hover:scale-105 active:scale-95`,

  [BUTTON_TYPES.ICON]: `inline-flex justify-center items-center rounded-md p-2 text-text-secondary hover:text-text-primary hover:bg-button-hover transition-all duration-300 ease-in-out hover:scale-110 active:scale-90`,
};

const ICON_CLASS_NAME =
  "flex items-center w-4 h-4 transition-transform duration-300";

interface ButtonProps {
  type?: ButtonType;
  extraClassNames?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  loading?: boolean;
  [x: string]: any;
}

const Button = ({
  type = BUTTON_TYPES.CONTINUE,
  children,
  icon,
  extraClassNames = "",
  disabled = false,
  href,
  onClick,
  loading = false,
  ...props
}: ButtonProps) => {
  // Style icon with transition effects
  const IconWithStyles = icon
    ? React.cloneElement(icon, {
        className: `${ICON_CLASS_NAME} ${icon.props.className || ""} ${
          loading ? "animate-spin" : ""
        }`,
      })
    : null;

  const commonClassNames = `${
    BUTTON_STYLES[type as ButtonType] || BUTTON_STYLES[BUTTON_TYPES.CONTINUE]
  } ${extraClassNames} ${
    disabled
      ? "opacity-50 cursor-not-allowed transform-none hover:scale-100 active:scale-100"
      : ""
  }`;

  // Handle the click event with type safety
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const buttonContent = (
    <>
      {IconWithStyles && (
        <span
          className={`${children ? "mr-2" : ""} ${
            loading ? "animate-pulse" : ""
          }`}
        >
          {IconWithStyles}
        </span>
      )}
      <span
        className={`${
          loading ? "opacity-80" : ""
        } transform transition-transform duration-300`}
      >
        {children}
      </span>
      {loading && (
        <span className="ml-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
      )}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        className={commonClassNames}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={commonClassNames}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;

import React from "react";

const chooseButtonClassName = (type: string) => {
  switch (type) {
    case "warning":
      return "inline-flex justify-center rounded-md bg-helpers-error-button px-4 py-2 text-sm text-elements-primary-contrastText font-medium shadow-sm ring-1 ring-inset ring-helpers-error-button hover:bg-helpers-error-button-hover items-center";
    case "undo":
      return "inline-flex justify-center rounded-md bg-neutral-dimmed px-4 py-2 text-sm font-medium ring-1 ring-border-shadow ring-neutral-shadow hover:bg-button-hover items-center text-text-secondary";
    case "continue":
      return "inline-flex justify-center rounded-md bg-elements-primary-main px-4 py-2 text-sm font-medium text-elements-primary-contrastText hover:bg-elements-primary-shadow items-center";
    case "remove":
      return "inline-flex justify-center rounded-md bg-helpers-remove-button px-4 py-2 text-sm text-elements-primary-contrastText font-medium shadow-sm ring-1 ring-inset ring-helpers-remove-button hover:bg-helpers-remove-button-hover items-center";
    case "text":
      return "inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary items-center";
    case "icon":
      return "inline-flex justify-center items-center rounded-md p-2 text-text-secondary hover:text-text-primary hover:bg-button-hover";
    default:
      return "";
  }
};

const iconClassName = "flex items-center w-4 h-4";

interface ButtonProps {
  type?: string;
  extraClassNames?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  [x: string]: any;
}

const Button = ({
  type = "continue",
  children,
  icon,
  extraClassNames = "",
  disabled = false,
  href,
  onClick,
  ...props
}: ButtonProps) => {
  const IconWithStyles = icon
    ? React.cloneElement(icon, {
        className: `${iconClassName} ${icon.props.className || ""}`,
      })
    : null;

  const commonClassNames = `${chooseButtonClassName(type)} ${extraClassNames} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  // Handle the click event with type safety for both anchor and button elements
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (disabled) e.preventDefault();
    onClick?.(e); // Ensure onClick is called if provided
  };

  if (href) {
    return (
      <a
        href={href}
        className={commonClassNames}
        onClick={handleClick}
        {...props}
      >
        {IconWithStyles && (
          <span className={children ? "mr-2" : ""}>{IconWithStyles}</span>
        )}
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={commonClassNames}
      onClick={handleClick}
      {...props}
    >
      {IconWithStyles && (
        <span className={children ? "mr-2" : ""}>{IconWithStyles}</span>
      )}
      {children}
    </button>
  );
};

export default Button;

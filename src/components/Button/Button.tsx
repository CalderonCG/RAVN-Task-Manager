import type { PropsWithChildren } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "neutral";
  visibility?: "mobile" | "desktop" | "all";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({
  variant = "neutral",
  visibility = "all",
  type = "button",
  disabled = false,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  const variantStyles = {
    primary: "bg-primary hover:bg-primary/90",
    secondary: "bg-secondary hover:bg-secondary/90",
    tertiary: "bg-tertiary hover:bg-tertiary/90",
    neutral: "bg-inherit hover:bg-accent",
  };
  const visibilityStyles = {
    mobile: "flex lg:hidden",
    desktop: "lg:flex hidden",
    all: "flex",
  };
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`p-2 rounded-lg items-center justify-center   ${variant !== "neutral" ? "text-button" : "text-font"}
        ${visibilityStyles[visibility]} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;

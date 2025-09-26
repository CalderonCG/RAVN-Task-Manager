import type { PropsWithChildren } from "react";

//Types-------------------------
type BadgeProps = {
  variant?: "red" | "green" | "yellow" | "blue" | "purple" | "neutral";
  tagTitle?: string | undefined;
};

function Badge({
  variant = "red",
  tagTitle = undefined,
  children,
}: PropsWithChildren<BadgeProps>) {
  //Variants color definition
  const variantStyles = {
    red: "bg-primary/10 text-primary",
    green: "bg-secondary/10 text-secondary",
    yellow: "bg-tertiary/10 text-tertiary",
    blue: "bg-tag-blue/10 text-tag-blue",
    purple: "bg-tag-purple/10 text-tag-purple",
    neutral: "bg-accent text-font",
  };

  return (
    <div
      title={tagTitle}
      className={`py-1 px-3 ${variantStyles[variant]} w-fit rounded-sm flex  items-center justify-between gap-2`}
    >
      {children}
    </div>
  );
}

export default Badge;

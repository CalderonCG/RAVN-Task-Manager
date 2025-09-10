type BadgeProps = {
  variant?: "primary" | "secondary" | "tertiary";
};

function Badge({ variant = "primary" }: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary/10 text-tertiary",
  };

  return (
    <div className={`py-1 px-4 ${variantStyles[variant]} w-fit rounded-sm`}>
      IOS APP
    </div>
  );
}

export default Badge;

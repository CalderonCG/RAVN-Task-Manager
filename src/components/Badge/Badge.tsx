type BadgeProps = {
  variant?: "red" | "green" | "yellow" | "blue" | "purple";
  label: string;
};

function Badge({ variant = "red", label }: BadgeProps) {
  const variantStyles = {
    red: "bg-primary/10 text-primary",
    green: "bg-secondary/10 text-secondary",
    yellow: "bg-tertiary/10 text-tertiary",
    blue: "bg-tag-blue/10 text-tag-blue",
    purple: "bg-tag-purple/10 text-tag-purple",
  };

  return (
    <div className={`py-1 px-4 ${variantStyles[variant]} w-fit rounded-sm`}>
      {label}
    </div>
  );
}

export default Badge;

import { Link, useLocation } from "react-router";

type CardProps = {
  label: string;
  route: string;
};

function SideBarCard({
  label,
  route,
  children,
}: React.PropsWithChildren<CardProps>) {
  const location = useLocation();
  const isActive: boolean = location.pathname === route;
  return (
    <Link
      to={`${route}`}
      className={`flex flex-col justify-center items-center cursor-pointer
    lg:flex-row lg:justify-start lg:w-full lg:p-4 lg:gap-4 hover:text-primary hover:bg-primary/10 lg:hover:border-r-4 border-primary   
    ${isActive ? "text-primary font-semibold" : ""}
    `}
    >
      {children}
      <p className="text-sm">{label}</p>
    </Link>
  );
}

export default SideBarCard;

type CardProps = {
  label: string;
};

function SideBarCard({ label, children }: React.PropsWithChildren<CardProps>) {
  return (
    <div className="flex flex-col justify-center items-center 
    lg:flex-row lg:justify-start lg:w-full lg:p-4 lg:gap-4 hover:text-primary hover:bg-primary-hover lg:hover:border-r-4 border-primary ">
      {children}
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default SideBarCard;

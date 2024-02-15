const Tooltip = ({
  comp,
  children
}: {
  comp: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group">
      {children}
      <div className="hidden group-hover:block absolute bg-[#5B5B5B]  text-white text-xs px-3 py-2 rounded-sm -right-20 top-10">
        <div className="min-w-[30rem]">{comp}</div>
      </div>
    </div>
  );
};

export default Tooltip;

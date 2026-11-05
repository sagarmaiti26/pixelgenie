import React from "react";

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="h2-bold text-slate-900">{title}</h2>
      {subtitle && <p className="p-16-regular text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default Header;

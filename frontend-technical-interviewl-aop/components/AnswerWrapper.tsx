"use client";

import { useState } from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function Wrapper({ label, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-white p-4 my-5 mx-32 rounded-lg">
      {/* Header Section */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-lg font-bold">{label}</h3>
        <p
          className={`text-2xl mr-5 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </p>
      </div>

      {/* Content Section with CSS Transition */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? " opacity-100 py-2" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

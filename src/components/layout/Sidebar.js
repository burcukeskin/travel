"use client";
import { useState } from "react";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Locations"}
      </button>

      {/* Sidebar content */}
      <div
        className={`
        fixed md:static inset-0 bg-white z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}
        md:translate-y-0
        w-full md:w-96 h-full
        border-r border-gray-200
      `}
      >
        {children}
      </div>
    </>
  );
}

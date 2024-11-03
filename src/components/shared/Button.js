"use client";
export default function Button({ children, variant = "primary", ...props }) {
  const baseClasses = "px-4 py-2 rounded-full transition-colors";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "border border-gray-200 hover:bg-gray-50",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

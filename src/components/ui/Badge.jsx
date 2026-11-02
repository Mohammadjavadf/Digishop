const variants = {
  discount: "bg-red-500 text-white",
  new: "bg-emerald-500 text-white",
  outOfStock: "bg-slate-400 text-white",
  featured: "bg-accent text-white",
};

export default function Badge({ children, variant = "discount", className = "" }) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2 py-0.5 rounded-lg text-xs font-bold
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
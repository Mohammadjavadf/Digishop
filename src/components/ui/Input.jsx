export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-2.5 rounded-xl border bg-white
          text-slate-900 placeholder:text-slate-400
          transition-all duration-200 outline-none
          focus:border-primary-500 focus:ring-2 focus:ring-primary-100
          ${error ? "border-red-400" : "border-slate-200"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
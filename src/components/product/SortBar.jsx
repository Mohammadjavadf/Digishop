import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
];

export default function SortBar({
  sort,
  onChange,
  totalResults,
  onOpenFilters,
}) {
  const [open, setOpen] = useState(false);
  const current = sortOptions.find((s) => s.value === sort);

  return (
    <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-white border border-border rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          فیلتر
        </button>
        <span className="text-sm text-muted">
          {totalResults} محصول یافت شد
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-sm text-slate-700 bg-white border border-border rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors min-w-[170px] justify-between"
        >
          <span className="text-muted">مرتب‌سازی:</span>
          <span className="font-medium">{current?.label}</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-20"
              >
                {sortOptions.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={`w-full text-right text-sm px-4 py-2.5 transition-colors ${
                      sort === o.value
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
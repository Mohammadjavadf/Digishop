import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";

const categories = [
  { slug: "mobile", label: "موبایل" },
  { slug: "laptop", label: "لپ‌تاپ" },
  { slug: "tablet", label: "تبلت" },
  { slug: "headphone", label: "هدفون" },
  { slug: "watch", label: "ساعت هوشمند" },
  { slug: "accessory", label: "لوازم جانبی" },
  { slug: "monitor", label: "مانیتور" },
  { slug: "camera", label: "دوربین" },
  { slug: "console", label: "کنسول بازی" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 100000000;

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  mobileOpen,
  onMobileClose,
  totalResults,
  availableBrands = [],
}) {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || PRICE_MIN,
    filters.maxPrice || PRICE_MAX,
  ]);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  useEffect(() => {
    setPriceRange([
      filters.minPrice ?? PRICE_MIN,
      filters.maxPrice ?? PRICE_MAX,
    ]);
  }, [filters.minPrice, filters.maxPrice]);

  const toggleCategory = (slug) => {
    const exists = filters.categories.includes(slug);
    const next = exists
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ categories: next });
  };

  const toggleBrand = (brand) => {
    const exists = filters.brands.includes(brand);
    const next = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ brands: next });
  };

  const commitPrice = () => {
    onChange({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  const content = (
    <div className="space-y-5">
      {/* دسته‌بندی */}
      <div>
        <button
          onClick={() => setCategoriesOpen((v) => !v)}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900 mb-3"
        >
          دسته‌بندی
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              categoriesOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {categoriesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5">
                {categories.map((c) => {
                  const active = filters.categories.includes(c.slug);
                  return (
                    <button
                      key={c.slug}
                      onClick={() => toggleCategory(c.slug)}
                      className={`flex items-center gap-2 w-full text-right text-sm px-2.5 py-2 rounded-lg transition-colors ${
                        active
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          active
                            ? "bg-primary-600 border-primary-600"
                            : "border-slate-300"
                        }`}
                      >
                        {active && <Check className="w-3 h-3 text-white" />}
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* برند */}
      {availableBrands.length > 0 && (
        <div className="pt-5 border-t border-border">
          <button
            onClick={() => setBrandsOpen((v) => !v)}
            className="flex items-center justify-between w-full text-sm font-bold text-slate-900 mb-3"
          >
            برند
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                brandsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {brandsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {availableBrands.map((brand) => {
                    const active = filters.brands.includes(brand);
                    return (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`flex items-center gap-2 w-full text-right text-sm px-2.5 py-2 rounded-lg transition-colors ${
                          active
                            ? "bg-primary-50 text-primary-700 font-medium"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? "bg-primary-600 border-primary-600"
                              : "border-slate-300"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span dir="ltr">{brand}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* بازه قیمت */}
      <div className="pt-5 border-t border-border">
        <button
          onClick={() => setPriceOpen((v) => !v)}
          className="flex items-center justify-between w-full text-sm font-bold text-slate-900 mb-3"
        >
          بازه قیمت (تومان)
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              priceOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {priceOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PriceInput
                    label="از"
                    value={priceRange[0]}
                    onChange={(v) =>
                      setPriceRange([Math.min(v, priceRange[1]), priceRange[1]])
                    }
                  />
                  <span className="text-muted">—</span>
                  <PriceInput
                    label="تا"
                    value={priceRange[1]}
                    onChange={(v) =>
                      setPriceRange([priceRange[0], Math.max(v, priceRange[0])])
                    }
                  />
                </div>

                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={1000000}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Math.max(Number(e.target.value), priceRange[0]),
                    ])
                  }
                  className="w-full accent-primary-600"
                />

                <button
                  onClick={commitPrice}
                  className="w-full text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg py-2 transition-colors"
                >
                  اعمال قیمت
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onReset}
        className="w-full text-sm font-medium text-slate-600 border border-border hover:bg-slate-50 rounded-lg py-2.5 transition-colors"
      >
        حذف همه فیلترها
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            <span className="font-bold text-slate-900">فیلترها</span>
          </div>
          {content}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-[140] bg-slate-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[150] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary-600" />
                  <span className="font-bold text-slate-900">
                    فیلترها ({totalResults})
                  </span>
                </div>
                <button
                  onClick={onMobileClose}
                  aria-label="بستن"
                  className="w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{content}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function PriceInput({ label, value, onChange }) {
  return (
    <div className="flex-1">
      <div className="text-[10px] text-muted mb-1">{label}</div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-white text-xs text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        dir="ltr"
      />
    </div>
  );
}
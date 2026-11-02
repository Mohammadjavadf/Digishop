import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { PackageSearch, Filter } from "lucide-react";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import SortBar from "./SortBar";
import Button from "../ui/Button";

export default function ProductListing({
  products,
  initialCategories = [],
  title,
  subtitle,
}) {
  const [filters, setFilters] = useState({
    categories: initialCategories,
    brands: [],
    minPrice: 0,
    maxPrice: 100000000,
  });
  const [sort, setSort] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = (patch) => {
    setFilters((f) => ({ ...f, ...patch }));
  };

  const resetFilters = () => {
    setFilters({
      categories: initialCategories,
      brands: [],
      minPrice: 0,
      maxPrice: 100000000,
    });
  };

  // برندهای موجود در لیست فعلی
  const availableBrands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      )
        return false;

      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(p.brand)
      )
        return false;

      const finalPrice = Math.round(
        p.price * (1 - (p.discount || 0) / 100)
      );
      if (finalPrice < filters.minPrice) return false;
      if (finalPrice > filters.maxPrice) return false;

      return true;
    });

    switch (sort) {
      case "cheapest":
        list = [...list].sort(
          (a, b) =>
            a.price * (1 - (a.discount || 0) / 100) -
            b.price * (1 - (b.discount || 0) / 100)
        );
        break;
      case "expensive":
        list = [...list].sort(
          (a, b) =>
            b.price * (1 - (b.discount || 0) / 100) -
            a.price * (1 - (a.discount || 0) / 100)
        );
        break;
      case "popular":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list = [...list].sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "newest":
      default:
        list = [...list].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id - a.id;
        });
    }

    return list;
  }, [products, filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-muted mt-1.5">{subtitle}</p>}
      </div>

      <div className="flex gap-6 items-start">
        <FilterSidebar
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
          totalResults={filtered.length}
          availableBrands={availableBrands}
        />

        <div className="flex-1 min-w-0">
          <SortBar
            sort={sort}
            onChange={setSort}
            totalResults={filtered.length}
            onOpenFilters={() => setMobileFiltersOpen(true)}
          />

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white border border-border rounded-2xl"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <PackageSearch className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                محصولی یافت نشد
              </h2>
              <p className="text-sm text-muted mb-5">
                فیلترها را تغییر دهید یا همه فیلترها را حذف کنید.
              </p>
              <Button onClick={resetFilters} variant="outline">
                <Filter className="w-4 h-4" />
                حذف فیلترها
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
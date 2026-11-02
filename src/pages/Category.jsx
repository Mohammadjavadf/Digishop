import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import products from "../data/products.json";
import ProductListing from "../components/product/ProductListing";
import Button from "../components/ui/Button";
import { ChevronLeft, ArrowLeft } from "lucide-react";

const categoryNames = {
  mobile: "موبایل",
  laptop: "لپ‌تاپ",
  tablet: "تبلت",
  headphone: "هدفون",
  watch: "ساعت هوشمند",
  accessory: "لوازم جانبی",
  monitor: "مانیتور",
  camera: "دوربین",
  console: "کنسول بازی",
};

export default function Category() {
  const { slug } = useParams();
  const label = categoryNames[slug];

  const results = useMemo(
    () => products.filter((p) => p.category === slug),
    [slug]
  );

  if (!label) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          دسته‌بندی یافت نشد
        </h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* مسیر */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{label}</span>
        </nav>
      </div>

      <ProductListing
        key={slug}
        products={results}
        initialCategories={[]}
        title={label}
        subtitle={`${results.length} محصول در این دسته‌بندی`}
      />
    </div>
  );
}
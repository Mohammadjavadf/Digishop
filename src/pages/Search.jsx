import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import products from "../data/products.json";
import ProductListing from "../components/product/ProductListing";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const results = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }, [q]);

  if (!q) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          جستجوی محصولات
        </h1>
        <p className="text-muted">
          برای جستجو، عبارت خود را در نوار جستجوی بالای صفحه وارد کنید.
        </p>
      </div>
    );
  }

  return (
    <ProductListing
      key={q}
      products={results}
      title={`نتایج جستجو برای «${q}»`}
      subtitle={
        results.length > 0
          ? `${results.length} محصول پیدا شد`
          : undefined
      }
    />
  );
}
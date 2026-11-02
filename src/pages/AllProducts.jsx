import products from "../data/products.json";
import ProductListing from "../components/product/ProductListing";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function AllProducts() {
  return (
    
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-slate-900 font-medium">همه محصولات</span>
        </nav>
      </div>
<SEO
  title="همه محصولات"
  description="مشاهده و خرید تمام محصولات دیجیتال موجود در فروشگاه دیجی‌شاپ شامل موبایل، لپ‌تاپ، هدفون، ساعت هوشمند و لوازم جانبی."
  url="/products"
/>
      <ProductListing
        products={products}
        title="همه محصولات"
        subtitle={`${products.length} محصول در فروشگاه`}
      />
    </div>
  );
}
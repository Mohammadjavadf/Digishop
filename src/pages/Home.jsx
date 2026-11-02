import { useMemo } from "react";
import products from "../data/products.json";
import HeroSlider from "../components/home/HeroSlider";
import CategoryBar from "../components/home/CategoryBar";
import SectionTitle from "../components/home/SectionTitle";
import DiscountBanner from "../components/home/DiscountBanner";
import ProductGrid from "../components/product/ProductGrid";
import SEO from "../components/SEO";
export default function Home() {
  const featured = useMemo(
    () => products.filter((p) => p.isFeatured).slice(0, 8),
    []
  );
  const newProducts = useMemo(
    () => products.filter((p) => p.isNew).slice(0, 8),
    []
  );
  const discounted = useMemo(
    () => products.filter((p) => p.discount > 0).slice(0, 8),
    []
  );
<SEO
  title="خرید لوازم دیجیتال"
  description="فروشگاه آنلاین دیجی‌شاپ، مرجع خرید انواع موبایل، لپ‌تاپ، هدفون، ساعت هوشمند و لوازم جانبی دیجیتال با بهترین قیمت و ارسال سریع."
  url="/"
/>
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-14">
      <HeroSlider />
      <CategoryBar />

      <section>
        <SectionTitle
          title="محصولات ویژه"
          subtitle="منتخب بهترین‌های فروشگاه"
          link="/category/mobile"
        />
        <ProductGrid products={featured} />
      </section>

      <DiscountBanner />

      <section>
        <SectionTitle
          title="جدیدترین‌ها"
          subtitle="تازه‌ترین محصولات رسیده"
          link="/category/laptop"
        />
        <ProductGrid products={newProducts} />
      </section>

      <section>
        <SectionTitle
          title="پیشنهاد شگفت‌انگیز"
          subtitle="بیشترین تخفیف‌های این هفته"
          link="/category/accessory"
        />
        <ProductGrid products={discounted} />
      </section>
    </div>
  );
}
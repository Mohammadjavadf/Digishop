import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Package,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  ZoomIn,
  MessageSquare,
  ThumbsUp,
  User,
} from "lucide-react";
import SEO from "../components/SEO";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ProductCard from "../components/product/ProductCard";

// نظرات نمونه برای هر محصول
const sampleReviews = [
  {
    id: 1,
    name: "علی محمدی",
    rating: 5,
    date: "۱۴۰۳/۰۸/۱۵",
    text: "کیفیت ساخت واقعاً عالیه. از خریدم کاملاً راضی هستم و به همه پیشنهاد می‌کنم.",
    likes: 24,
  },
  {
    id: 2,
    name: "سارا رضایی",
    rating: 4,
    date: "۱۴۰۳/۰۸/۰۲",
    text: "محصول خوبیه ولی بسته‌بندی می‌تونست بهتر باشه. در کل راضی‌ام.",
    likes: 12,
  },
  {
    id: 3,
    name: "محمد کریمی",
    rating: 5,
    date: "۱۴۰۳/۰۷/۲۰",
    text: "دقیقاً همون چیزی بود که انتظار داشتم. ارسال هم سریع انجام شد.",
    likes: 8,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);
{product && (
  <SEO
    title={product.title}
    description={product.description?.slice(0, 160) || `خرید ${product.title} با بهترین قیمت از دیجی‌شاپ.`}
    image={product.images?.[0]}
    url={`/product/${product.id}`}
    type="product"
  />
)}
  // بستن لایت‌باکس با Esc
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") nextImage();
      if (e.key === "ArrowRight") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeImage, product]);

  // قفل اسکرول هنگام باز بودن لایت‌باکس
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          محصول یافت نشد
        </h1>
        <Button onClick={() => navigate("/")}>بازگشت به صفحه اصلی</Button>
      </div>
    );
  }

  const finalPrice = Math.round(
    product.price * (1 - (product.discount || 0) / 100)
  );
  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock === 0;
  const maxQty = Math.min(product.stock, 10);

  const nextImage = () =>
    setActiveImage((i) => (i + 1) % product.images.length);
  const prevImage = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    showToast(`${qty} عدد به سبد خرید اضافه شد`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* مسیر */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          خانه
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <Link
          to={`/category/${product.category}`}
          className="hover:text-primary-600 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-slate-900 font-medium line-clamp-1">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* گالری */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-border group">
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.title}
              initial={{ opacity: 0.5, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxOpen(true)}
              className="w-full h-full object-cover cursor-zoom-in"
            />

            {/* دکمه‌های جابه‌جایی */}
            <button
              onClick={prevImage}
              aria-label="تصویر قبلی"
              className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="تصویر بعدی"
              className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* نشان بزرگنمایی */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-lg px-2.5 py-1.5 text-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
              برای بزرگنمایی کلیک کنید
            </div>

            {/* نشان‌ها */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <Badge variant="discount">{product.discount}٪ تخفیف</Badge>
              )}
              {product.isNew && <Badge variant="new">جدید</Badge>}
            </div>

            {/* شماره تصویر */}
            <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg">
              {activeImage + 1} / {product.images.length}
            </div>
          </div>

          {/* تصاویر کوچک */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === i
                    ? "border-primary-500 ring-2 ring-primary-100"
                    : "border-border hover:border-primary-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* اطلاعات */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
              {product.brand}
            </span>
            <span className="text-xs text-muted">{product.category}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? "text-accent"
                      : "text-slate-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {product.rating} از ۵
            </span>
          </div>

          <div className="bg-surface rounded-2xl p-5 mb-6">
            {product.discount > 0 && (
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-slate-400 line-through">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>
                <Badge variant="discount">{product.discount}٪ تخفیف</Badge>
              </div>
            )}
            <div className="text-3xl font-extrabold text-slate-900">
              {finalPrice.toLocaleString("fa-IR")}
              <span className="text-sm font-normal text-muted mr-2">
                تومان
              </span>
            </div>
            <div className="text-xs text-muted mt-2">
              {isOutOfStock ? (
                <span className="text-red-500 font-medium">ناموجود</span>
              ) : (
                <>موجودی: {product.stock} عدد</>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.min(q + 1, maxQty))}
                disabled={qty >= maxQty || isOutOfStock}
                className="w-10 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                aria-label="افزایش"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium text-slate-900">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.max(q - 1, 1))}
                disabled={qty <= 1 || isOutOfStock}
                className="w-10 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                aria-label="کاهش"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            <Button
              onClick={handleAdd}
              disabled={isOutOfStock}
              size="lg"
              className="flex-1 min-w-[160px]"
            >
              <ShoppingCart className="w-5 h-5" />
              افزودن به سبد خرید
            </Button>

            <Button
              variant={inWishlist ? "danger" : "outline"}
              size="lg"
              onClick={() => {
                toggleWishlist(product);
                showToast(
                  inWishlist
                    ? "از علاقه‌مندی‌ها حذف شد"
                    : "به علاقه‌مندی‌ها اضافه شد"
                );
              }}
            >
              <Heart
                className="w-5 h-5"
                fill={inWishlist ? "currentColor" : "none"}
              />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <Feature icon={<Truck className="w-5 h-5" />} label="ارسال سریع" />
            <Feature
              icon={<ShieldCheck className="w-5 h-5" />}
              label="اصالت کالا"
            />
            <Feature
              icon={<RotateCcw className="w-5 h-5" />}
              label="۷ روز بازگشت"
            />
          </div>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="mt-14">
        <div className="flex items-center gap-2 border-b border-border mb-6">
          <TabButton
            active={tab === "description"}
            onClick={() => setTab("description")}
          >
            توضیحات
          </TabButton>
          <TabButton active={tab === "specs"} onClick={() => setTab("specs")}>
            مشخصات فنی
          </TabButton>
          <TabButton
            active={tab === "reviews"}
            onClick={() => setTab("reviews")}
          >
            نظرات ({sampleReviews.length})
          </TabButton>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "description" && (
              <p className="text-slate-700 leading-8 max-w-3xl">
                {product.description}
              </p>
            )}

            {tab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-surface rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-muted">{key}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <ReviewsSection
                reviews={sampleReviews}
                showToast={showToast}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* محصولات مشابه */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-slate-900">محصولات مشابه</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* لایت‌باکس */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* دکمه بستن */}
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="بستن"
              className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* شماره */}
            <div className="absolute top-6 right-6 bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg">
              {activeImage + 1} / {product.images.length}
            </div>

            {/* دکمه‌های جابه‌جایی */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="قبلی"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="بعدی"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* تصویر بزرگ */}
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* تصاویر کوچک در پایین */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-white scale-110"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb ${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewsSection({ reviews, showToast }) {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) showToast("نظر شما پسندیده شد");
      return next;
    });
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* خلاصه امتیاز */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-extrabold text-slate-900">۴.۶</div>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-accent"
                fill="currentColor"
              />
            ))}
          </div>
          <div className="text-xs text-muted mt-1">از ۳ نظر</div>
        </div>

        <div className="flex-1 w-full space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const percent = star === 5 ? 66 : star === 4 ? 34 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted w-8">{star} ستاره</span>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
                <span className="text-xs text-muted w-8 text-left">
                  {percent}٪
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* لیست نظرات */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-border rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-medium text-slate-900">{r.name}</span>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? "text-accent" : "text-slate-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-7 mt-2">
                  {r.text}
                </p>
                <button
                  onClick={() => toggleLike(r.id)}
                  className={`flex items-center gap-1.5 mt-3 text-xs transition-colors ${
                    liked[r.id]
                      ? "text-primary-600"
                      : "text-muted hover:text-primary-600"
                  }`}
                >
                  <ThumbsUp
                    className="w-3.5 h-3.5"
                    fill={liked[r.id] ? "currentColor" : "none"}
                  />
                  مفید بود ({r.likes + (liked[r.id] ? 1 : 0)})
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* فرم ثبت نظر */}
      <div className="bg-white border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <h3 className="font-bold text-slate-900">نظر خود را بنویسید</h3>
        </div>
        <textarea
          rows={3}
          placeholder="تجربه خود از این محصول را با دیگران به اشتراک بگذارید..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
        />
        <div className="flex justify-end mt-3">
          <Button
            size="md"
            onClick={() => showToast("نظر شما ثبت شد (نمایشی)")}
          >
            ثبت نظر
          </Button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 bg-surface rounded-xl py-3">
      <span className="text-primary-600">{icon}</span>
      <span className="text-xs text-slate-700 font-medium">{label}</span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 text-sm font-medium transition-colors ${
        active ? "text-primary-600" : "text-muted hover:text-slate-900"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="product-tab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
        />
      )}
    </button>
  );
}
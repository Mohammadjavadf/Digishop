import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ChevronLeft,
  ArrowLeft,
  Package,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function Wishlist() {
  const { items, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [removingId, setRemovingId] = useState(null);

  // حالت خالی
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            لیست علاقه‌مندی‌های شما خالی است
          </h1>
          <p className="text-muted mb-8 leading-7">
            محصولاتی که دوست دارید را با کلیک روی آیکون قلب ذخیره کنید تا بعداً
            راحت‌تر پیدایشان کنید.
          </p>
          <Link to="/products">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4" />
              مشاهده محصولات
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* مسیر */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          خانه
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-slate-900 font-medium">علاقه‌مندی‌ها</span>
      </nav>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          علاقه‌مندی‌ها
          <span className="text-sm font-normal text-muted mr-2">
            ({wishlistCount} محصول)
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const finalPrice = Math.round(
              item.price * (1 - (item.discount || 0) / 100)
            );
            const isOutOfStock = item.stock === 0;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-border rounded-2xl overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {item.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="discount">{item.discount}٪</Badge>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setRemovingId(item.id);
                      removeFromWishlist(item.id);
                      showToast("از علاقه‌مندی‌ها حذف شد");
                    }}
                    aria-label="حذف از علاقه‌مندی"
                    className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm font-medium text-slate-900 hover:text-primary-600 transition-colors line-clamp-2 leading-6 block min-h-[3rem]"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center gap-1 mt-2">
                    <Star
                      className="w-3.5 h-3.5 text-accent"
                      fill="currentColor"
                    />
                    <span className="text-xs text-muted">{item.rating}</span>
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      {item.discount > 0 && (
                        <div className="text-xs text-slate-400 line-through">
                          {item.price.toLocaleString("fa-IR")}
                        </div>
                      )}
                      <div className="text-base font-bold text-slate-900">
                        {finalPrice.toLocaleString("fa-IR")}
                        <span className="text-xs font-normal text-muted mr-1">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="md"
                    className="w-full mt-3"
                    disabled={isOutOfStock}
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        discount: item.discount,
                        images: [item.image],
                        stock: item.stock,
                      });
                      showToast("محصول به سبد خرید اضافه شد");
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isOutOfStock ? "ناموجود" : "افزودن به سبد"}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <Package className="w-4 h-4" />
          مشاهده همه محصولات
        </Link>
      </div>
    </div>
  );
}
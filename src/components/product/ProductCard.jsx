import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import Badge from "../ui/Badge";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);
  const finalPrice = Math.round(
    product.price * (1 - (product.discount || 0) / 100)
  );
  const isOutOfStock = product.stock === 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    showToast("محصول به سبد خرید اضافه شد");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      inWishlist ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        to={`/product/${product.id}`}
        className="block bg-white rounded-2xl border border-border overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      >
        {/* تصویر */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* نشان‌ها */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <Badge variant="discount">{product.discount}٪</Badge>
            )}
            {product.isNew && <Badge variant="new">جدید</Badge>}
            {isOutOfStock && <Badge variant="outOfStock">ناموجود</Badge>}
          </div>

          {/* دکمه علاقه‌مندی */}
          <button
            onClick={handleWishlist}
            aria-label="علاقه‌مندی"
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white/80 text-slate-600 hover:bg-white"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={inWishlist ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* اطلاعات */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[2.5rem] leading-6">
            {product.title}
          </h3>

          {/* امتیاز */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 text-accent" fill="currentColor" />
            <span className="text-xs text-muted">{product.rating}</span>
          </div>

          {/* قیمت */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              {product.discount > 0 && (
                <div className="text-xs text-slate-400 line-through">
                  {product.price.toLocaleString("fa-IR")}
                </div>
              )}
              <div className="text-base font-bold text-slate-900">
                {finalPrice.toLocaleString("fa-IR")}
                <span className="text-xs font-normal text-muted mr-1">
                  تومان
                </span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              disabled={isOutOfStock}
              aria-label="افزودن به سبد"
              className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0 hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
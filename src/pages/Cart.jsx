import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function Cart() {
  const {
    items,
    totalItems,
    subtotal,
    totalDiscount,
    total,
    unitPrice,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pendingRemove, setPendingRemove] = useState(null); // { id, title }
  const [clearOpen, setClearOpen] = useState(false);

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
          <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            سبد خرید شما خالی است
          </h1>
          <p className="text-muted mb-8">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید. از بین محصولات ما انتخاب
            کنید.
          </p>
          <Link to="/">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4" />
              رفتن به فروشگاه
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
        <span className="text-slate-900 font-medium">سبد خرید</span>
      </nav>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          سبد خرید
          <span className="text-sm font-normal text-muted mr-2">
            ({totalItems} کالا)
          </span>
        </h1>
        <button
          onClick={() => setClearOpen(true)}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          پاک کردن سبد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* لیست اقلام */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const finalUnit = unitPrice(item);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-border rounded-2xl p-4 flex gap-4"
                >
                  {/* تصویر */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* اطلاعات */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-slate-900 hover:text-primary-600 transition-colors line-clamp-2 leading-6"
                      >
                        {item.title}
                      </Link>

                      <div className="flex items-center gap-2 mt-1.5">
                        {item.discount > 0 && (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-medium">
                            {item.discount}٪ تخفیف
                          </span>
                        )}
                        <span className="text-xs text-muted">
                          موجودی: {item.stock}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-3 gap-2 flex-wrap">
                      {/* کنترل تعداد */}
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => increaseQty(item.id)}
                          disabled={item.qty >= item.stock}
                          className="w-8 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                          aria-label="افزایش"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-medium text-slate-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.qty <= 1}
                          className="w-8 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                          aria-label="کاهش"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* قیمت + حذف */}
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          {item.discount > 0 && (
                            <div className="text-xs text-slate-400 line-through">
                              {(item.price * item.qty).toLocaleString("fa-IR")}
                            </div>
                          )}
                          <div className="text-sm font-bold text-slate-900">
                            {(finalUnit * item.qty).toLocaleString("fa-IR")}
                            <span className="text-xs font-normal text-muted mr-1">
                              تومان
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setPendingRemove({ id: item.id, title: item.title })
                          }
                          aria-label="حذف"
                          className="w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium mt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            ادامه خرید
          </Link>
        </div>

        {/* خلاصه سفارش */}
        <div className="lg:sticky lg:top-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-border rounded-2xl p-5"
          >
            <h2 className="font-bold text-slate-900 mb-4">خلاصه سفارش</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">جمع کالاها</span>
                <span className="font-medium text-slate-900">
                  {subtotal.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    تخفیف
                  </span>
                  <span className="font-medium text-emerald-600">
                    − {totalDiscount.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-muted">هزینه ارسال</span>
                <span className="font-medium text-emerald-600">
                  رایگان
                </span>
              </div>

              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-bold text-slate-900">مبلغ قابل پرداخت</span>
                <span className="text-lg font-extrabold text-primary-600">
                  {total.toLocaleString("fa-IR")}
                  <span className="text-xs font-normal text-muted mr-1">
                    تومان
                  </span>
                </span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-5"
              onClick={() => navigate("/checkout")}
            >
              ادامه فرآیند خرید
            </Button>

            <div className="mt-4 space-y-2">
              <MiniFeature
                icon={<ShieldCheck className="w-4 h-4" />}
                text="پرداخت امن"
              />
              <MiniFeature
                icon={<Truck className="w-4 h-4" />}
                text="ارسال رایگان به سراسر کشور"
              />
              <MiniFeature
                icon={<Tag className="w-4 h-4" />}
                text="۷ روز ضمانت بازگشت کالا"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal حذف تک‌آیتم */}
      <ConfirmModal
        open={!!pendingRemove}
        onClose={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove) {
            removeFromCart(pendingRemove.id);
            showToast("محصول از سبد خرید حذف شد");
          }
        }}
        title="حذف از سبد خرید"
        message={
          pendingRemove
            ? `آیا از حذف «${pendingRemove.title}» از سبد خرید مطمئن هستید؟`
            : ""
        }
      />

      {/* Modal پاک کردن کل سبد */}
      <ConfirmModal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        onConfirm={() => {
          clearCart();
          showToast("سبد خرید پاک شد");
        }}
        title="پاک کردن سبد خرید"
        message="آیا از حذف تمام محصولات سبد خرید مطمئن هستید؟ این عمل قابل بازگشت نیست."
        confirmText="بله، پاک کن"
      />
    </div>
  );
}

function MiniFeature({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="text-primary-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
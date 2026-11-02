import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  User,
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { validateCheckout } from "../utils/validators";

const provinces = [
  "تهران", "البرز", "اصفهان", "خراسان رضوی", "فارس", "آذربایجان شرقی",
  "آذربایجان غربی", "خوزستان", "مازندران", "گیلان", "کرمان", "یزد",
  "قم", "کرمانشاه", "هرمزگان", "سیستان و بلوچستان", "همدان", "لرستان",
  "گلستان", "اردبیل", "مرکزی", "قزوین", "زنجان", "بوشهر", "کردستان",
  "چهارمحال و بختیاری", "سمنان", "خراسان شمالی", "خراسان جنوبی", "ایلام",
  "کهگیلویه و بویراحمد",
];

const shippingMethods = [
  {
    id: "express",
    title: "ارسال فوری",
    desc: "تحویل در همان روز (تهران) — هزینه: ۵۰,۰۰۰ تومان",
    price: 50000,
    icon: Truck,
  },
  {
    id: "standard",
    title: "ارسال استاندارد",
    desc: "تحویل ۲ تا ۴ روز کاری — رایگان",
    price: 0,
    icon: Truck,
  },
];

const paymentMethods = [
  {
    id: "online",
    title: "پرداخت آنلاین",
    desc: "درگاه پرداخت امن بانکی",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "کیف پول",
    desc: "پرداخت از موجودی کیف پول",
    icon: Wallet,
  },
  {
    id: "cod",
    title: "پرداخت در محل",
    desc: "پرداخت نقدی هنگام تحویل",
    icon: ShoppingBag,
  },
];

export default function Checkout() {
  const { items, total, totalDiscount, totalItems, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    note: "",
    shipping: "standard",
    payment: "online",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // اگر سبد خالی است
  if (items.length === 0 && !success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          سبد خرید شما خالی است
        </h1>
        <p className="text-muted mb-6">
          برای ادامه فرآیند خرید، ابتدا محصولی به سبد اضافه کنید.
        </p>
        <Link to="/">
          <Button size="lg">
            <ArrowLeft className="w-4 h-4" />
            رفتن به فروشگاه
          </Button>
        </Link>
      </div>
    );
  }

  const shippingPrice =
    shippingMethods.find((s) => s.id === form.shipping)?.price || 0;
  const payable = total + shippingPrice;

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateCheckout(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("لطفاً فیلدهای الزامی را کامل کنید", "error");
      // اسکرول به اولین خطا
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    // شبیه‌سازی ثبت سفارش
    setTimeout(() => {
      const orderNumber = "DS-" + Math.floor(100000 + Math.random() * 900000);
      setSuccess({ orderNumber, payable });
      clearCart();
      setSubmitting(false);
      showToast("سفارش شما با موفقیت ثبت شد");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  // صفحه موفقیت
  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-border rounded-3xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.15 }}
            className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-11 h-11 text-emerald-500" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            سفارش شما با موفقیت ثبت شد
          </h1>
          <p className="text-muted mb-6 leading-7">
            از خرید شما سپاسگزاریم. جزئیات سفارش برای شما پیامک خواهد شد.
          </p>

          <div className="bg-surface rounded-2xl p-5 mb-6 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">شماره سفارش</span>
              <span className="font-bold text-slate-900" dir="ltr">
                {success.orderNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">مبلغ پرداختی</span>
              <span className="font-bold text-primary-600">
                {success.payable.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">وضعیت</span>
              <span className="font-medium text-emerald-600">در حال پردازش</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4" />
                بازگشت به فروشگاه
              </Button>
            </Link>
          </div>
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
        <Link to="/cart" className="hover:text-primary-600 transition-colors">
          سبد خرید
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-slate-900 font-medium">تسویه حساب</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
        تسویه حساب
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        {/* فرم */}
        <div className="lg:col-span-2 space-y-6">
          {/* اطلاعات گیرنده */}
          <Section icon={<User className="w-5 h-5" />} title="اطلاعات گیرنده">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="نام"
                placeholder="مثلاً علی"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                error={errors.firstName}
              />
              <Input
                id="lastName"
                label="نام خانوادگی"
                placeholder="مثلاً محمدی"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                error={errors.lastName}
              />
              <Input
                id="phone"
                label="شماره موبایل"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                value={form.phone}
                onChange={(e) =>
                  update("phone", e.target.value.replace(/[^\d]/g, ""))
                }
                error={errors.phone}
                dir="ltr"
                maxLength={11}
              />
              <Input
                id="postalCode"
                label="کد پستی"
                placeholder="۱۰ رقم"
                value={form.postalCode}
                onChange={(e) =>
                  update("postalCode", e.target.value.replace(/[^\d]/g, ""))
                }
                error={errors.postalCode}
                dir="ltr"
                maxLength={10}
              />
            </div>
          </Section>

          {/* آدرس */}
          <Section icon={<MapPin className="w-5 h-5" />} title="آدرس تحویل">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="province"
                  className="block mb-1.5 text-sm font-medium text-slate-700"
                >
                  استان
                </label>
                <select
                  id="province"
                  value={form.province}
                  onChange={(e) => update("province", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-white text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${
                    errors.province ? "border-red-400" : "border-slate-200"
                  }`}
                >
                  <option value="">انتخاب کنید...</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="mt-1 text-xs text-red-500">{errors.province}</p>
                )}
              </div>
              <Input
                id="city"
                label="شهر"
                placeholder="مثلاً تهران"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                error={errors.city}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block mb-1.5 text-sm font-medium text-slate-700"
              >
                آدرس کامل
              </label>
              <textarea
                id="address"
                rows={3}
                placeholder="خیابان، کوچه، پلاک، واحد..."
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none ${
                  errors.address ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            <Input
              id="note"
              label="توضیحات (اختیاری)"
              placeholder="مثلاً زنگ واحد خراب است"
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
            />
          </Section>

          {/* روش ارسال */}
          <Section icon={<Truck className="w-5 h-5" />} title="روش ارسال">
            <div className="space-y-3">
              {shippingMethods.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => update("shipping", m.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right ${
                    form.shipping === m.id
                      ? "border-primary-500 bg-primary-50/50"
                      : "border-border hover:border-primary-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      form.shipping === m.id
                        ? "bg-primary-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      {m.title}
                    </div>
                    <div className="text-xs text-muted mt-0.5">{m.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.shipping === m.id
                        ? "border-primary-600"
                        : "border-slate-300"
                    }`}
                  >
                    {form.shipping === m.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* روش پرداخت */}
          <Section
            icon={<CreditCard className="w-5 h-5" />}
            title="روش پرداخت"
          >
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => update("payment", m.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right ${
                    form.payment === m.id
                      ? "border-primary-500 bg-primary-50/50"
                      : "border-border hover:border-primary-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      form.payment === m.id
                        ? "bg-primary-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      {m.title}
                    </div>
                    <div className="text-xs text-muted mt-0.5">{m.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.payment === m.id
                        ? "border-primary-600"
                        : "border-slate-300"
                    }`}
                  >
                    {form.payment === m.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {errors.payment && (
              <p className="mt-2 text-xs text-red-500">{errors.payment}</p>
            )}
          </Section>
        </div>

        {/* خلاصه سفارش */}
        <div className="lg:sticky lg:top-20">
          <div className="bg-white border border-border rounded-2xl p-5">
            <h2 className="font-bold text-slate-900 mb-4">خلاصه سفارش</h2>

            {/* اقلام */}
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={i.image}
                      alt={i.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-800 line-clamp-1">
                      {i.title}
                    </div>
                    <div className="text-[11px] text-muted mt-0.5">
                      {i.qty} عدد
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">تعداد اقلام</span>
                <span className="font-medium text-slate-900">
                  {totalItems}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">جمع کالاها</span>
                <span className="font-medium text-slate-900">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted">تخفیف</span>
                  <span className="font-medium text-emerald-600">
                    − {totalDiscount.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted">هزینه ارسال</span>
                <span
                  className={
                    shippingPrice === 0
                      ? "font-medium text-emerald-600"
                      : "font-medium text-slate-900"
                  }
                >
                  {shippingPrice === 0
                    ? "رایگان"
                    : `${shippingPrice.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>

              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  مبلغ قابل پرداخت
                </span>
                <span className="text-lg font-extrabold text-primary-600">
                  {payable.toLocaleString("fa-IR")}
                  <span className="text-xs font-normal text-muted mr-1">
                    تومان
                  </span>
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-5"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  ثبت نهایی سفارش
                </>
              )}
            </Button>

            <p className="text-[11px] text-muted text-center mt-3 leading-5">
              با ثبت سفارش، شرایط و قوانین فروشگاه را می‌پذیرید.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-border rounded-2xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
          {icon}
        </div>
        <h2 className="font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
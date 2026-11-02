import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronLeft,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";

const tabs = [
  { id: "login", label: "ورود" },
  { id: "register", label: "ثبت‌نام" },
];

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

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

  const switchTab = (id) => {
    setTab(id);
    setErrors({});
  };

  const validate = () => {
    const e = {};

    if (tab === "register" && !form.name.trim()) {
      e.name = "نام را وارد کنید";
    }

    if (!form.email.trim()) {
      e.email = "ایمیل را وارد کنید";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "ایمیل معتبر نیست";
    }

    if (!form.password) {
      e.password = "رمز عبور را وارد کنید";
    } else if (form.password.length < 6) {
      e.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (tab === "register") {
      if (!form.confirmPassword) {
        e.confirmPassword = "تکرار رمز عبور را وارد کنید";
      } else if (form.confirmPassword !== form.password) {
        e.confirmPassword = "رمز عبور و تکرار آن یکسان نیست";
      }
      if (!form.accept) {
        e.accept = "پذیرش قوانین الزامی است";
      }
    }

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("لطفاً فیلدهای الزامی را کامل کنید", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(
        tab === "login"
          ? "ورود موفق (نمایشی)"
          : "ثبت‌نام موفق (نمایشی)"
      );
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-primary-50 via-white to-slate-50">
      <div className="w-full max-w-md">
        {/* مسیر */}
        <nav className="flex items-center gap-1.5 text-sm text-muted mb-5">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-slate-900 font-medium">
            {tab === "login" ? "ورود" : "ثبت‌نام"}
          </span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-border shadow-xl p-6 sm:p-8"
        >
          {/* لوگو */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center mb-3">
              <span className="text-white font-bold text-2xl">د</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {tab === "login" ? "خوش آمدید" : "حساب کاربری بسازید"}
            </h1>
            <p className="text-sm text-muted mt-1 text-center">
              {tab === "login"
                ? "برای ادامه وارد حساب خود شوید"
                : "در چند ثانیه ثبت‌نام کنید و خرید را شروع کنید"}
            </p>
          </div>

          {/* تب‌ها */}
          <div className="relative flex bg-slate-100 rounded-xl p-1 mb-6">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors z-10 ${
                  tab === t.id
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === t.id && (
                  <motion.div
                    layoutId="auth-tab"
                    className="absolute inset-0 bg-primary-600 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          {/* فرم */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {tab === "register" && (
                  <AuthInput
                    id="name"
                    label="نام و نام خانوادگی"
                    icon={<User className="w-4 h-4" />}
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                    placeholder="مثلاً علی محمدی"
                  />
                )}

                <AuthInput
                  id="email"
                  type="email"
                  label="ایمیل"
                  icon={<Mail className="w-4 h-4" />}
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="example@email.com"
                  dir="ltr"
                />

                <AuthInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  icon={<Lock className="w-4 h-4" />}
                  value={form.password}
                  onChange={(v) => update("password", v)}
                  error={errors.password}
                  placeholder="••••••••"
                  dir="ltr"
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="نمایش رمز"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  }
                />

                {tab === "register" && (
                  <AuthInput
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    label="تکرار رمز عبور"
                    icon={<Lock className="w-4 h-4" />}
                    value={form.confirmPassword}
                    onChange={(v) => update("confirmPassword", v)}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                    dir="ltr"
                  />
                )}

                {tab === "login" ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-400"
                      />
                      مرا به خاطر بسپار
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        showToast("بازیابی رمز عبور (نمایشی)", "success")
                      }
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      فراموشی رمز عبور؟
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.accept}
                        onChange={(e) => update("accept", e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-400"
                      />
                      <span>
                        <Link
                          to="#"
                          className="text-primary-600 hover:underline"
                        >
                          قوانین و مقررات
                        </Link>{" "}
                        فروشگاه را می‌پذیرم
                      </span>
                    </label>
                    {errors.accept && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.accept}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  لطفاً صبر کنید...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {tab === "login" ? "ورود به حساب" : "ثبت‌نام"}
                </>
              )}
            </Button>
          </form>

          {/* فوتر فرم */}
          <div className="mt-6 pt-5 border-t border-border text-center text-sm text-muted">
            {tab === "login" ? (
              <>
                حساب کاربری ندارید؟{" "}
                <button
                  onClick={() => switchTab("register")}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  ثبت‌نام کنید
                </button>
              </>
            ) : (
              <>
                قبلاً ثبت‌نام کرده‌اید؟{" "}
                <button
                  onClick={() => switchTab("login")}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  وارد شوید
                </button>
              </>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            اطلاعات شما به صورت امن نگهداری می‌شود
          </div>
        </motion.div>

        <div className="mt-5 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

function AuthInput({
  id,
  type = "text",
  label,
  icon,
  value,
  onChange,
  error,
  placeholder,
  dir,
  endAdornment,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1.5 text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`w-full pr-10 ${
            endAdornment ? "pl-10" : "pl-4"
          } py-2.5 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${
            error ? "border-red-400" : "border-slate-200"
          } ${dir === "ltr" ? "text-left" : ""}`}
        />
        {endAdornment && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {endAdornment}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
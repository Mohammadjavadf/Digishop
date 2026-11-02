import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Camera,
  MessageCircle,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const contactInfo = [
  {
    Icon: MapPin,
    title: "آدرس",
    lines: ["تهران، خیابان ولیعصر", "پلاک ۱۲۳، طبقه ۴"],
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    Icon: Phone,
    title: "تلفن",
    lines: ["۰۲۱-۱۲۳۴۵۶۷۸", "۰۹۱۲۳۴۵۶۷۸۹"],
    color: "text-blue-500",
    bg: "bg-blue-50",
    dir: "ltr",
  },
  {
    Icon: Mail,
    title: "ایمیل",
    lines: ["info@digishop.ir", "support@digishop.ir"],
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    dir: "ltr",
  },
  {
    Icon: Clock,
    title: "ساعت کاری",
    lines: ["شنبه تا پنجشنبه", "۹:۰۰ تا ۱۸:۰۰"],
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const socials = [
  { label: "اینستاگرام", Icon: Camera, color: "hover:text-rose-500" },
  { label: "توییتر", Icon: MessageCircle, color: "hover:text-blue-500" },
  { label: "تلگرام", Icon: Send, color: "hover:text-cyan-500" },
];

const subjects = [
  "پیشنهاد یا انتقاد",
  "سوال درباره محصول",
  "پیگیری سفارش",
  "همکاری تجاری",
  "سایر موارد",
];

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "نام را وارد کنید";

    if (!form.email.trim()) {
      e.email = "ایمیل را وارد کنید";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "ایمیل معتبر نیست";
    }

    if (form.phone.trim() && !/^09\d{9}$/.test(form.phone)) {
      e.phone = "شماره موبایل معتبر نیست";
    }

    if (!form.subject) e.subject = "موضوع را انتخاب کنید";

    if (!form.message.trim()) {
      e.message = "پیام را وارد کنید";
    } else if (form.message.trim().length < 10) {
      e.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
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
      setSent(true);
      showToast("پیام شما با موفقیت ارسال شد");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* مسیر */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          خانه
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-slate-900 font-medium">تماس با ما</span>
      </nav>

      {/* هدر */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
          <MessageSquare className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
          با ما در تماس باشید
        </h1>
        <p className="text-muted leading-7">
          سوال، پیشنهاد یا انتقادی دارید؟ تیم ما همیشه آماده شنیدن صدای شماست.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* اطلاعات تماس */}
        <div className="space-y-3">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white border border-border rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center shrink-0`}
              >
                <info.Icon className={`w-5 h-5 ${info.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 mb-1.5 text-sm">
                  {info.title}
                </h3>
                {info.lines.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-muted leading-7"
                    dir={info.dir}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* شبکه‌های اجتماعی */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-border rounded-2xl p-5"
          >
            <h3 className="font-bold text-slate-900 mb-3 text-sm">
              ما را در شبکه‌های اجتماعی دنبال کنید
            </h3>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  onClick={() =>
                    showToast(`${s.label} (نمایشی)`, "success")
                  }
                  className={`w-10 h-10 rounded-xl bg-slate-50 border border-border flex items-center justify-center text-slate-600 ${s.color} transition-colors`}
                >
                  <s.Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* فرم */}
        <div className="lg:col-span-2">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-border rounded-3xl p-8 md:p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                  delay: 0.15,
                }}
                className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-11 h-11 text-emerald-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                پیام شما ارسال شد
              </h2>
              <p className="text-muted mb-8 leading-7 max-w-md mx-auto">
                از تماس شما سپاسگزاریم. تیم پشتیبانی در اسرع وقت به پیام شما
                پاسخ خواهد داد.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  ارسال پیام دیگر
                </Button>
                <Link to="/">
                  <Button variant="outline">بازگشت به فروشگاه</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-border rounded-3xl p-6 md:p-8"
            >
              <h2 className="font-bold text-slate-900 mb-5">
                فرم ارسال پیام
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  id="name"
                  label="نام و نام خانوادگی"
                  placeholder="مثلاً علی محمدی"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  id="email"
                  type="email"
                  label="ایمیل"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                  dir="ltr"
                />
                <Input
                  id="phone"
                  label="شماره موبایل (اختیاری)"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={form.phone}
                  onChange={(e) =>
                    update("phone", e.target.value.replace(/[^\d]/g, ""))
                  }
                  error={errors.phone}
                  dir="ltr"
                  maxLength={11}
                />

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1.5 text-sm font-medium text-slate-700"
                  >
                    موضوع
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${
                      errors.subject ? "border-red-400" : "border-slate-200"
                    }`}
                  >
                    <option value="">انتخاب کنید...</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-1.5 text-sm font-medium text-slate-700"
                >
                  متن پیام
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="پیام خود را اینجا بنویسید..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none ${
                    errors.message ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    ارسال پیام
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
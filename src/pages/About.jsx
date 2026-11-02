import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Target,
  Eye,
  Heart,
  Users,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
  Award,
  TrendingUp,
} from "lucide-react";
import Button from "../components/ui/Button";

const stats = [
  { value: "+۵۰,۰۰۰", label: "مشتری راضی", Icon: Users },
  { value: "+۲۵۰", label: "محصول متنوع", Icon: Package },
  { value: "+۱۰۰,۰۰۰", label: "سفارش موفق", Icon: Truck },
  { value: "۹۸٪", label: "رضایت مشتری", Icon: Heart },
];

const values = [
  {
    Icon: ShieldCheck,
    title: "اصالت کالا",
    desc: "تمام محصولات با ضمانت اصالت و گارانتی معتبر ارائه می‌شوند.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    Icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور با بسته‌بندی ایمن و پیگیری آنلاین.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    Icon: Award,
    title: "بهترین قیمت",
    desc: "قیمت‌های رقابتی و تخفیف‌های ویژه روی محصولات منتخب.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    Icon: Heart,
    title: "پشتیبانی واقعی",
    desc: "تیم پشتیبانی ما همیشه آماده پاسخگویی و راهنمایی شماست.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const timeline = [
  {
    year: "۱۳۹۸",
    title: "شروع مسیر",
    desc: "با یک تیم کوچک و یک هدف بزرگ: فروش لوازم دیجیتال با کیفیت.",
  },
  {
    year: "۱۴۰۰",
    title: "رشد و گسترش",
    desc: "افزودن دسته‌بندی‌های جدید و ارسال به سراسر کشور.",
  },
  {
    year: "۱۴۰۲",
    title: "بیش از ۵۰ هزار مشتری",
    desc: "رسیدن به مرز ۵۰ هزار مشتری راضی و ۱۰۰ هزار سفارش موفق.",
  },
  {
    year: "۱۴۰۳",
    title: "نسل جدید فروشگاه",
    desc: "بازطراحی کامل سایت با تمرکز بر تجربه کاربری و سرعت.",
  },
];

export default function About() {
  return (
    <div>
      {/* مسیر */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-slate-900 font-medium">درباره ما</span>
        </nav>
      </div>

      {/* هیرو */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary-600 to-primary-800 p-8 md:p-16"
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              داستان ما
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              دیجی‌شاپ؛ جایی که تکنولوژی به شما نزدیک‌تر می‌شود
            </h1>
            <p className="text-white/85 text-base md:text-lg leading-8 mb-8">
              از سال ۱۳۹۸ با هدف ارائه بهترین لوازم دیجیتال با قیمت مناسب و
              خدمات بی‌نظیر شروع کردیم. امروز با افتخار در کنار بیش از ۵۰ هزار
              مشتری هستیم و هر روز تلاش می‌کنیم تجربه خرید آنلاین را برای شما
              بهتر کنیم.
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="!bg-white !text-primary-700 hover:!bg-slate-100"
              >
                مشاهده محصولات
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* آمار */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-border rounded-2xl p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                <s.Icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {s.value}
              </div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            ارزش‌های ما
          </h2>
          <p className="text-muted leading-7">
            آنچه ما را از دیگران متمایز می‌کند، تعهد ما به این چهار اصل است.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-4`}
              >
                <v.Icon className={`w-6 h-6 ${v.color}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-muted leading-7">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ماموریت و چشم‌انداز */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface rounded-3xl p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">ماموریت ما</h2>
            <p className="text-slate-700 leading-8">
              دسترسی همه ایرانیان به جدیدترین و باکیفیت‌ترین لوازم دیجیتال با
              قیمت منصفانه، تجربه خریدی ساده و لذت‌بخش، و پشتیبانی که همیشه در
              کنار مشتری است.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 rounded-3xl p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">چشم‌انداز ما</h2>
            <p className="text-white/75 leading-8">
              تبدیل شدن به محبوب‌ترین مرجع خرید لوازم دیجیتال در ایران؛ جایی که
              هر کسی با هر بودجه‌ای، بهترین انتخاب را پیدا می‌کند.
            </p>
          </motion.div>
        </div>
      </section>

      {/* مسیر ما */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            مسیر ما
          </h2>
          <p className="text-muted">نگاهی به مهم‌ترین نقاط عطف دیجی‌شاپ</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-0 bottom-0 right-4 md:right-1/2 w-0.5 bg-border" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="md:w-1/2 md:pr-8 md:text-left">
                  <div className="bg-white border border-border rounded-2xl p-5 inline-block text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-bold text-primary-600">
                        {t.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1.5">
                      {t.title}
                    </h3>
                    <p className="text-sm text-muted leading-7">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute right-2 md:right-1/2 top-5 -translate-x-1/2 md:translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md" />
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-l from-primary-50 to-slate-50 border border-border rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            آماده شروع خرید هستید؟
          </h2>
          <p className="text-muted mb-6 max-w-lg mx-auto leading-7">
            بهترین محصولات با بهترین قیمت منتظر شما هستند. همین حالا خرید خود را
            شروع کنید.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/products">
              <Button size="lg">مشاهده محصولات</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                تماس با ما
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

const slides = [
  {
    id: 1,
    title: "تجربه دیجیتال در سطح بعدی",
    subtitle: "جدیدترین گوشی‌ها و لپ‌تاپ‌ها با تخفیف ویژه",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600",
    cta: "مشاهده محصولات",
    link: "/category/laptop",
    accent: "from-primary-600/80 to-primary-900/60",
  },
  {
    id: 2,
    title: "صدای بی‌نظیر، آزادی بی‌پایان",
    subtitle: "هدفون‌های حذف نویز با کیفیت Hi-Res",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1600",
    cta: "خرید هدفون",
    link: "/category/headphone",
    accent: "from-slate-900/70 to-primary-900/50",
  },
  {
    id: 3,
    title: "سلامت در دستان شما",
    subtitle: "ساعت‌های هوشمند با پایش کامل سلامت",
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1600",
    cta: "مشاهده ساعت‌ها",
    link: "/category/watch",
    accent: "from-emerald-900/60 to-slate-900/70",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // اسلاید خودکار هر ۵ ثانیه
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <div className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-l ${slide.accent}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* محتوا */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-8">
              {slide.subtitle}
            </p>
            <Link to={slide.link}>
              <Button size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100">
                {slide.cta}
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* دکمه‌های ناوبری */}
      <button
        onClick={prev}
        aria-label="قبلی"
        className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="بعدی"
        className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* نقطه‌های پایین */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`اسلاید ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
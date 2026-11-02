import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Timer, Percent } from "lucide-react";
import Button from "../ui/Button";

export default function DiscountBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary-600 to-primary-800 p-8 md:p-12"
    >
      {/* دایره‌های تزئینی */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium mb-4">
            <Timer className="w-4 h-4" />
            پیشنهاد محدود
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            تا <span className="text-accent">۳۰٪</span> تخفیف ویژه
          </h3>
          <p className="text-white/80 text-sm md:text-base max-w-md">
            روی منتخبی از لوازم جانبی و ساعت‌های هوشمند. فرصت را از دست نده!
          </p>
        </div>

        <Link to="/category/accessory">
          <Button
            size="lg"
            className="!bg-white !text-primary-700 hover:!bg-slate-100"
          >
            <Percent className="w-4 h-4" />
            مشاهده تخفیف‌ها
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
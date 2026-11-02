import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Keyboard,
  Monitor,
  Camera,
  Gamepad2,
} from "lucide-react";

const categories = [
  { slug: "mobile", label: "موبایل", Icon: Smartphone, color: "text-blue-500" },
  { slug: "laptop", label: "لپ‌تاپ", Icon: Laptop, color: "text-purple-500" },
  { slug: "tablet", label: "تبلت", Icon: Tablet, color: "text-emerald-500" },
  { slug: "headphone", label: "هدفون", Icon: Headphones, color: "text-rose-500" },
  { slug: "watch", label: "ساعت هوشمند", Icon: Watch, color: "text-amber-500" },
  { slug: "accessory", label: "لوازم جانبی", Icon: Keyboard, color: "text-cyan-500" },
  { slug: "monitor", label: "مانیتور", Icon: Monitor, color: "text-indigo-500" },
  { slug: "camera", label: "دوربین", Icon: Camera, color: "text-orange-500" },
  { slug: "console", label: "کنسول بازی", Icon: Gamepad2, color: "text-red-500" },
];

export default function CategoryBar() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
      {categories.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
        >
          <Link
            to={`/category/${c.slug}`}
            className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-border hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
              <c.Icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <span className="text-xs font-medium text-slate-700">
              {c.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
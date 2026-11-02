import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Search, ArrowLeft, Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-primary-50 via-white to-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* عدد ۴۰۴ با انیمیشن */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-6"
        >
          <div className="text-[7rem] md:text-[10rem] font-extrabold leading-none bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent select-none">
            ۴۰۴
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Compass className="w-16 h-16 md:w-20 md:h-20 text-primary-200" />
          </motion.div>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          صفحه‌ای که دنبالش بودید پیدا نشد
        </h1>
        <p className="text-muted leading-7 mb-8 max-w-md mx-auto">
          احتمالاً آدرس اشتباه وارد شده یا این صفحه حذف شده است. نگران نباشید،
          می‌توانید از دکمه‌های زیر استفاده کنید.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/">
            <Button size="lg">
              <Home className="w-4 h-4" />
              بازگشت به خانه
            </Button>
          </Link>
          <Link to="/products">
            <Button size="lg" variant="outline">
              <Search className="w-4 h-4" />
              مشاهده محصولات
            </Button>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted mb-3">شاید این صفحات مفید باشند:</p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
            <Link
              to="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              سبد خرید
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/wishlist"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              علاقه‌مندی‌ها
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/contact"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
import { useState, useRef, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  TrendingUp,
  ArrowLeft,
  ChevronDown,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Keyboard,
  Monitor,
  Camera,
  Gamepad2,
  Grid3x3,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/products.json";

const categories = [
  { slug: "mobile", label: "موبایل", Icon: Smartphone },
  { slug: "laptop", label: "لپ‌تاپ", Icon: Laptop },
  { slug: "tablet", label: "تبلت", Icon: Tablet },
  { slug: "headphone", label: "هدفون", Icon: Headphones },
  { slug: "watch", label: "ساعت هوشمند", Icon: Watch },
  { slug: "accessory", label: "لوازم جانبی", Icon: Keyboard },
  { slug: "monitor", label: "مانیتور", Icon: Monitor },
  { slug: "camera", label: "دوربین", Icon: Camera },
  { slug: "console", label: "کنسول بازی", Icon: Gamepad2 },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const searchWrapperRef = useRef(null);
  const productsMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems: cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // بستن منوی محصولات با تغییر مسیر
  useEffect(() => {
    setProductsMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // پیشنهادهای زنده
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  // بستن Dropdownها با کلیک بیرون
  useEffect(() => {
    const handler = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setSearchFocused(false);
      }
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(e.target)
      ) {
        setProductsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchFocused(false);
    setMobileOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToSearch();
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchQuery("");
    setSearchFocused(false);
    setMobileOpen(false);
  };

  const showSuggestions = searchFocused && searchQuery.trim().length > 0;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center gap-4">
          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="منو"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* لوگو */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">د</span>
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block">
              دیجی‌شاپ
            </span>
          </Link>

          {/* لینک‌های دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-1 mr-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`
              }
            >
              خانه
            </NavLink>

            {/* منوی محصولات با Dropdown */}
            <div className="relative" ref={productsMenuRef}>
              <button
                onClick={() => setProductsMenuOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  productsMenuOpen ||
                  location.pathname.startsWith("/product") ||
                  location.pathname.startsWith("/category")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                محصولات
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {productsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-[420px] bg-white border border-border rounded-2xl shadow-xl overflow-hidden z-30"
                  >
                    <Link
                      to="/products"
                      className="flex items-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 font-medium text-sm border-b border-border hover:bg-primary-100 transition-colors"
                    >
                      <Grid3x3 className="w-4 h-4" />
                      مشاهده همه محصولات
                      <ArrowLeft className="w-4 h-4 mr-auto" />
                    </Link>

                    <div className="grid grid-cols-2 gap-1 p-2">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/category/${c.slug}`}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                            <c.Icon className="w-4 h-4 text-primary-600" />
                          </div>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* پایان منوی محصولات */}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`
              }
            >
              درباره ما
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`
              }
            >
              تماس با ما
            </NavLink>
          </nav>



          {/* جستجو دسکتاپ */}
          <div
            ref={searchWrapperRef}
            className="hidden md:block flex-1 max-w-md mr-auto relative"
          >
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="جستجوی محصول..."
                className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-primary-100 border border-transparent focus:border-primary-400"
              />
            </form>

            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 right-0 left-0 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-30"
                >
                  {suggestions.length > 0 ? (
                    <>
                      <div className="flex items-center gap-1.5 px-4 py-2.5 text-xs text-muted border-b border-border bg-slate-50">
                        <TrendingUp className="w-3.5 h-3.5" />
                        محصولات پیشنهادی
                      </div>
                      <ul>
                        {suggestions.map((p) => (
                          <li key={p.id}>
                            <button
                              type="button"
                              onClick={() => handleSuggestionClick(p)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-slate-50 transition-colors text-right"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img
                                  src={p.images[0]}
                                  alt={p.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-900 line-clamp-1">
                                  {p.title}
                                </div>
                                <div className="text-[11px] text-muted mt-0.5">
                                  {p.brand}
                                </div>
                              </div>
                              <div className="text-xs font-bold text-primary-600 shrink-0">
                                {Math.round(
                                  p.price * (1 - (p.discount || 0) / 100)
                                ).toLocaleString("fa-IR")}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={goToSearch}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-medium text-primary-600 hover:bg-primary-50 border-t border-border transition-colors"
                      >
                        مشاهده همه نتایج
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-muted">
                      محصولی با این عبارت پیدا نشد
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* آیکون‌ها */}
          <div className="flex items-center gap-1 mr-auto lg:mr-0">
            <IconButton to="/wishlist" label="علاقه‌مندی‌ها" count={wishlistCount}>
              <Heart className="w-5 h-5" />
            </IconButton>
            <IconButton to="/cart" label="سبد خرید" count={cartCount}>
              <ShoppingCart className="w-5 h-5" />
            </IconButton>
            <IconButton to="/auth" label="ورود / ثبت‌نام">
              <User className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصول..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-100 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 border border-transparent focus:border-primary-400"
                />
              </form>

              <nav className="flex flex-col">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  خانه
                </NavLink>

                {/* محصولات با زیرمنو */}
                <div>
                  <button
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    محصولات
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pr-3 pt-1 pb-1 space-y-0.5">
                          <Link
                            to="/products"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
                          >
                            <Grid3x3 className="w-4 h-4" />
                            همه محصولات
                          </Link>
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              to={`/category/${c.slug}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <c.Icon className="w-4 h-4 text-slate-400" />
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* پایان محصولات موبایل */}

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  درباره ما
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  تماس با ما
                </NavLink>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({ to, label, count, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-primary-600 transition-colors duration-200"
    >
      {children}
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
}
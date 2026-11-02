import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Camera, MessageCircle, Send } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* درباره */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">د</span>
              </div>
              <span className="text-lg font-bold text-slate-900">دیجی‌شاپ</span>
            </div>
            <p className="text-sm text-muted leading-7">
              فروشگاه آنلاین لوازم دیجیتال با بهترین قیمت و ارسال سریع به سراسر
              کشور. کیفیت و رضایت شما اولویت ماست.
            </p>
          </div>

{/* دسترسی سریع */}
<div>
  <h4 className="font-bold text-slate-900 mb-4">دسترسی سریع</h4>
  <ul className="space-y-2.5">
    <FooterLink to="/">صفحه اصلی</FooterLink>
    <FooterLink to="/products">همه محصولات</FooterLink>
    <FooterLink to="/about">درباره ما</FooterLink>
    <FooterLink to="/contact">تماس با ما</FooterLink>
    <FooterLink to="/cart">سبد خرید</FooterLink>
    <FooterLink to="/wishlist">علاقه‌مندی‌ها</FooterLink>
  </ul>
</div>

          {/* دسته‌بندی */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/category/mobile">موبایل</FooterLink>
              <FooterLink to="/category/laptop">لپ‌تاپ</FooterLink>
              <FooterLink to="/category/headphone">هدفون</FooterLink>
              <FooterLink to="/category/watch">ساعت هوشمند</FooterLink>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">تماس با ما</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                <span>info@digishop.ir</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>

<div className="flex items-center gap-2 mt-4">
  <SocialButton label="اینستاگرام">
    <Camera className="w-4 h-4" />
  </SocialButton>
  <SocialButton label="توییتر">
    <MessageCircle className="w-4 h-4" />
  </SocialButton>
  <SocialButton label="تلگرام">
    <Send className="w-4 h-4" />
  </SocialButton>
</div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted">
          © {new Date().getFullYear()} دیجی‌شاپ — تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-muted hover:text-primary-600 transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialButton({ label, children }) {
  return (
    <button
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-300 transition-colors duration-200"
    >
      {children}
    </button>
  );
}
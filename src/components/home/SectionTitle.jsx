import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function SectionTitle({ title, subtitle, link, linkText = "مشاهده همه" }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {linkText}
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
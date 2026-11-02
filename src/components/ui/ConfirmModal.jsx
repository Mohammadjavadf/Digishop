import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";
import { useEffect } from "react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "تأیید حذف",
  message = "آیا از انجام این عمل مطمئن هستید؟",
  confirmText = "بله، حذف کن",
  cancelText = "انصراف",
}) {
  // بستن با Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // قفل اسکرول
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
          >
            <button
              onClick={onClose}
              aria-label="بستن"
              className="absolute top-4 left-4 w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted leading-6 mb-6">{message}</p>

              <div className="flex gap-2 w-full">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                >
                  {cancelText}
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
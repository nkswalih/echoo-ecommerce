import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Headphones,
  Search,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const primaryLinks = [
  { path: "/store", label: "Store" },
  { path: "/apple", label: "Apple" },
  { path: "/laptop", label: "Laptops" },
  { path: "/accessories", label: "Accessories" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
};

const staggerVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.35, ease: "easeOut" },
  }),
};

const featureVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.38, duration: 0.35, ease: "easeOut" },
  },
};

export default function MobileDrawer({ open, onClose }) {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="drawer-panel"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed right-0 top-0 bottom-0 z-[70] w-[85vw] max-w-[380px] bg-white border-l border-gray-200 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-3 shrink-0">
              <Link to="/" onClick={onClose}>
                <img
                  src="/Echoo-transparent.png"
                  alt="EchOo"
                  className="h-7"
                />
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-[4px] hover:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <span className="block w-4 h-[2px] bg-gray-400 rounded-full rotate-45 translate-y-[1px]" />
                <span className="block w-4 h-[2px] bg-gray-400 rounded-full -rotate-45 -translate-y-[1px]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-1">
                {primaryLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={staggerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center justify-between py-4 border-b border-gray-100 transition-colors ${
                          isActive
                            ? "text-gray-900 font-semibold"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      <span className="text-2xl font-bold tracking-tight">
                        {item.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="h-px bg-gray-200 my-6" />

              <motion.div
                custom={4}
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
              >
                <NavLink
                  to="/support"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between py-3 transition-colors ${
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "text-gray-400 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="text-sm font-medium">Support</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                </NavLink>
              </motion.div>

              <motion.div
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Sparkles className="w-4 h-4 text-gray-500" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em]">
                    Trending
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Premium Accessories
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Up to 20% off — limited time
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <Link
                  to="/accessories"
                  onClick={onClose}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Shop now
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>

            <div className="px-6 pb-3 shrink-0">
              <Link
                to="/store"
                onClick={onClose}
                className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-200 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Search products...
                </span>
              </Link>
            </div>

            <div className="px-6 pb-8 pt-4 border-t border-gray-200 shrink-0">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center justify-center w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-colors active:scale-[0.98]"
                >
                  My Profile
                </Link>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/sign_in"
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-colors active:scale-[0.98]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign_up"
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-3.5 border border-gray-300 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

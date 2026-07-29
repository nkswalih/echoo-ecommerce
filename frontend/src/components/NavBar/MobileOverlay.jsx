import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronRight, Search, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getProducts } from "../../api/apiService";
import { useDebounce } from "../../hooks/useDebounce";

const overlayVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 280, mass: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.05, duration: 0.35, ease: "easeOut" },
  }),
};

const navLinks = [
  { path: "/store", label: "Store" },
  { path: "/apple", label: "Apple" },
  { path: "/laptop", label: "Laptops" },
  { path: "/accessories", label: "Accessories" },
  { path: "/support", label: "Support" },
];

export default function MobileOverlay({ open, onClose }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedQuery.trim().length <= 1) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const fetchResults = async () => {
      setSearching(true);
      try {
        const res = await getProducts({ q: debouncedQuery.trim(), limit: 5 });
        setSearchResults(res.data.results || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleProductClick = (slug) => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
    setTimeout(() => navigate(`/product/${slug}`), 150);
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
        >
          <div className="flex flex-col min-h-screen p-6">
            <div className="flex items-center justify-between shrink-0">
              <Link to="/" onClick={onClose}>
                <img
                  src="/Echoo-transparent.png"
                  alt="EchOo"
                  className="h-7"
                />
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="relative mt-6 mb-8">
              <div className="flex items-center gap-3 w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus-within:border-gray-400 transition-colors">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                  {searching ? (
                    <div className="px-4 py-3 text-sm text-gray-400">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <img
                          src={
                            product.images?.[0]?.image_url ||
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%23e5e7eb'%3E%3Crect width='40' height='40' rx='4'/%3E%3C/svg%3E"
                          }
                          alt={product.name}
                          className="w-10 h-10 object-contain rounded-lg bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ₹{Number(product.price).toLocaleString()}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-400">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.path}
                  custom={i}
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-4 border-b border-gray-100 transition-colors ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="text-xl font-bold tracking-tight">
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-3 pt-8 pb-4">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full items-center justify-center ${
                        user?.avatar ? "hidden" : "flex"
                      }`}
                    >
                      <span className="text-sm font-bold text-gray-600">
                        {initials}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || "My Profile"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      View profile
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign_in"
                    onClick={onClose}
                    className="block w-full bg-gray-900 border border-gray-800 py-3.5 rounded-xl font-medium text-white text-center hover:bg-gray-800 transition-colors active:scale-[0.98]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign_up"
                    onClick={onClose}
                    className="block w-full bg-white text-gray-900 border border-gray-300 py-3.5 rounded-xl font-semibold shadow-md text-center hover:bg-gray-50 transition-colors active:scale-[0.98]"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

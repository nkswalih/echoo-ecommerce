import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import AuthButton from "../ui/AuthButton";
import SearchDropdown from "../ui/SearchDropDown.jsx";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext.jsx";
import MobileOverlay from "./MobileOverlay";
import useScrollDirection from "../../hooks/useScrollDirection";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300
      ${isActive
        ? "text-white bg-gradient-to-b from-gray-500 to-gray-800 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),_0px_4px_8px_rgba(0,0,0,0.4)] ring-1 ring-gray-600"
        : "text-gray-900 hover:bg-gray-100/50 dark:text-white dark:hover:bg-white/10"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollDirection();
  const { isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  const navState = mobileMenuOpen ? "overlay" : isScrolled ? "capsule" : "default";

  const navVariants = {
    default: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      borderRadius: "0px",
    },
    capsule: {
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      borderRadius: "9999px",
    },
    overlay: {
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      borderRadius: "9999px",
    },
  };

  const navItems = [
    { path: "/store", label: "Store" },
    { path: "/apple", label: "Apple" },
    { path: "/laptop", label: "Lap" },
    { path: "/accessories", label: "Accessories" },
    { path: "/support", label: "Support" },
  ];

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-40
          ${navState !== "default"
            ? "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-white/20 dark:border-neutral-800/40 shadow-lg"
            : "bg-transparent border border-transparent"
          }`}
        animate={navState}
        variants={navVariants}
        transition={{ type: "spring", damping: 30, stiffness: 260, mass: 0.8 }}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-10">
              <Link to="/">
                <img
                  src="/Echoo-transparent.png"
                  alt="EchOo"
                  className="h-7"
                />
              </Link>

              <div className="hidden lg:flex gap-2">
                {navItems.map((item) => (
                  <NavItem key={item.path} to={item.path} label={item.label} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <SearchDropdown />

              <Link to="/cart" className="relative flex items-center">
                <ShoppingBagIcon className="h-5 w-5 stroke-gray-900 dark:stroke-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Link to="/profile">
                  <UserCircleIcon className="h-5 w-5 stroke-gray-900 dark:stroke-white" />
                </Link>
              ) : (
                <AuthButton />
              )}

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 stroke-gray-900 dark:stroke-white" />
              ) : (
                <Bars3Icon className="h-5 w-5 stroke-gray-900 dark:stroke-white" />
              )}
            </button>
            </div>
          </div>
        </nav>
      </motion.div>

      <MobileOverlay
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  Flag,
  ChevronDown,
  ChevronUp,
  List,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { cartCount } = useCart();

  const categories = useMemo(
    () => [
      { name: "Fashion", href: "/products?category=fashion" },
      { name: "Electronic", href: "/products?category=electronic" },
      { name: "Jewellery", href: "/products?category=jewellery" },
    ],
    []
  );

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuVisible(true);
    }
  }, [isMenuOpen]);

  const handleMenuClose = useCallback(() => {
    setIsMenuVisible(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  }, []);

  return (
    <div className="pt-4">
      <nav className="bg-yellow-400 shadow-lg rounded-2xl mx-4 max-w-6xl mx-auto">
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white">
                Shopping Center
              </Link>
            </div>
            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/products?tag=best-sellers"
                  className="text-white hover:text-yellow-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Best Sellers
                </Link>
                <Link
                  href="/products"
                  className="text-white hover:text-yellow-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/products?tag=offers"
                  className="text-white hover:text-yellow-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Offers
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Flag className="h-5 w-5 text-white" />
              <select className="text-sm text-white bg-transparent border-none focus:outline-none">
                <option value="en" className="text-gray-900">
                  English
                </option>
                <option value="fr" className="text-gray-900">
                  French
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-yellow-300">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-yellow-100 transition-colors cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex-1 max-w-md mx-4">
              <SearchBar compact={true} />
            </div>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 text-white hover:text-yellow-100 transition-colors relative cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-opacity-10 z-[100] transition-opacity duration-300"
                onClick={handleMenuClose}
                aria-label="Close menu overlay"
              />
              <div
                className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out z-[110] flex flex-col overflow-hidden`}
                style={{
                  boxShadow: "0 0 40px 0 rgba(0,0,0,0.15)",
                  transform: isMenuVisible
                    ? "translateX(0)"
                    : "translateX(-100%)",
                }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 space-y-1">
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:bg-yellow-600 transition-colors mb-2"
                    onClick={handleMenuClose}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products?tag=best-sellers"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:bg-yellow-500 transition-colors"
                    onClick={handleMenuClose}
                  >
                    Best Sellers
                  </Link>
                  <Link
                    href="/products"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:bg-yellow-500 transition-colors"
                    onClick={handleMenuClose}
                  >
                    Products
                  </Link>
                  <Link
                    href="/products?tag=offers"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:bg-yellow-500 transition-colors mb-2"
                    onClick={handleMenuClose}
                  >
                    Offers
                  </Link>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-600 transition-colors mb-2 cursor-pointer"
                    onClick={() => setShowCategories((prev) => !prev)}
                  >
                    <span className="flex items-center gap-2">
                      <List className="h-5 w-5" /> Categories
                    </span>
                    {showCategories ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {showCategories && (
                    <div className="space-y-1 mb-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block px-6 py-2 text-black hover:text-yellow-100 rounded-md text-base font-medium  hover:bg-yellow-500 transition-colors"
                          onClick={handleMenuClose}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    href="/add-product"
                    className="block w-full mt-4 px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-600 transition-colors "
                    onClick={handleMenuClose}
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        {isCartOpen && (
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
      </nav>
    </div>
  );
};

export default Navbar;

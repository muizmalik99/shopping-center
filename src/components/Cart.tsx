"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cartItems, updateQuantity, removeFromCart, total } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-5 z-[100] transition-opacity duration-300"
        onClick={handleClose}
        aria-label="Close cart overlay"
      />

      <div
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[110] flex flex-col"
        style={{
          boxShadow: "0 0 40px 0 rgba(165, 84, 84, 0.15)",
          transform: isVisible ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-yellow-600 font-semibold">
                      ${item.price}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300 transition-all duration-200 hover:scale-110 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300 transition-all duration-200 hover:scale-110 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Total:
              </span>
              <span className="text-xl font-bold text-yellow-600">
                ${total}
              </span>
            </div>
            <a
              href="/checkout"
              className="w-full inline-block text-center bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Cart);

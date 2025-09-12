"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import ProductCardServer from "./ProductCardServer";
import { Product } from "@/types/types";

interface CardButtonProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const CardButton = ({ product, onAddToCart }: CardButtonProps) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = useCallback(() => {
    setClicked(true);
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  }, [addToCart, onAddToCart, product]);

  const handleBuyNow = useCallback(() => {
    addToCart(product);
    router.push("/checkout");
  }, [addToCart, product, router]);

  return (
    <div className="relative">
      <ProductCardServer product={product} />

      <div className="absolute bottom-4 right-4  flex items-center justify-between space-x-2">
        <button
          onClick={handleAddToCart}
          className={`transition-colors flex items-center space-x-2 cursor-pointer ${
            clicked ? "text-blue-500" : "text-yellow-700"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 cursor-pointer }"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default CardButton;

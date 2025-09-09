"use client";

import { useCallback, useMemo, useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    if (onAddToCart) {
      onAddToCart(product);
    }
  }, [addToCart, onAddToCart, product]);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted((w) => !w);
  }, []);

  const handleBuyNow = useCallback(() => {
    addToCart(product);
    router.push("/checkout");
  }, [addToCart, product, router]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        <div className="absolute top-3 left-3">
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-yellow-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-yellow-600">
            ${product.price}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="text-yellow-600 hover:text-yellow-700 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

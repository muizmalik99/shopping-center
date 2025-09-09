"use client";

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { loadProducts } from "@/data/products";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

type Product = ReturnType<typeof loadProducts>[number];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const allProducts = useMemo(() => loadProducts(), []);
  const product = allProducts.find((p) => p.id === productId) || null;

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  type MaybeStock = { stock?: number };
  const stock: number = (product as MaybeStock).stock ?? 100;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    router.push("/checkout");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating ?? 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.reviews ?? 0} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-blue-600">
              ${product.price}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Availability:</span>
              {stock > 0 ? (
                <span className="text-sm font-medium text-green-600">
                  In Stock
                </span>
              ) : (
                <span className="text-sm font-medium text-red-600">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={stock === 0}
                className="flex-1 bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  isWishlisted
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

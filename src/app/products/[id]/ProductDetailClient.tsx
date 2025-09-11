"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/types";

function Price({ price }: { price: number }) {
  return <div className="text-3xl font-bold text-yellow-600">${price}</div>;
}

function Reviews({ rating = 0, reviews = 0 }: { rating?: number; reviews?: number }) {
  const filled = Math.floor(rating ?? 0);
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-5 w-5 ${i < filled ? "text-yellow-400" : "text-gray-300"}`}
          >
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.519 3.651a1.25 1.25 0 001.01.765l3.993.37c1.164.108 1.636 1.545.749 2.307l-3.02 2.57a1.25 1.25 0 00-.41 1.28l.95 3.877c.277 1.13-.964 2.033-1.96 1.425l-3.437-2.07a1.25 1.25 0 00-1.298 0l-3.437 2.07c-.996.608-2.237-.295-1.96-1.425l.95-3.876a1.25 1.25 0 00-.41-1.281l-3.02-2.57c-.887-.762-.415-2.2.749-2.308l3.993-.37a1.25 1.25 0 001.01-.765l1.52-3.65z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-600">({reviews ?? 0} reviews)</span>
    </div>
  );
}

function Stock({ stock }: { stock: number }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Availability:</span>
      {stock > 0 ? (
        <span className="text-sm font-medium text-green-600">In Stock</span>
      ) : (
        <span className="text-sm font-medium text-red-600">Out of Stock</span>
      )}
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const stock = product.stock ?? 100;

  const clampQuantity = (q: number) => {
    const max = stock > 0 ? stock : 1;
    return Math.max(1, Math.min(q, max));
  };

  const incrementQty = () => setQuantity((q) => clampQuantity(q + 1));
  const decrementQty = () => setQuantity((q) => clampQuantity(q - 1));
  const changeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value || "1", 10);
    setQuantity(clampQuantity(Number.isNaN(val) ? 1 : val));
  };

  const addProductNTimes = (n: number) => {
    for (let i = 0; i < n; i += 1) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  const handleAddToCart = () => addProductNTimes(quantity);
  const handleBuyNow = () => { addProductNTimes(quantity); router.push("/checkout"); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-yellow-600">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/products" className="text-gray-700 hover:text-yellow-600">Products</Link>
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
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{product.category}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <Reviews rating={product.rating ?? 0} reviews={product.reviews ?? 0} />

            <Price price={product.price} />

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <Stock stock={stock} />

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button onClick={decrementQty} className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" aria-label="Decrease quantity">-</button>
                <input type="number" min={1} max={stock} value={quantity} onChange={changeQty} className="w-16 text-center outline-none text-black" />
                <button onClick={incrementQty} className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" aria-label="Increase quantity">+</button>
              </div>

              <button onClick={handleAddToCart} className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2 cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button onClick={handleBuyNow} className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 cursor-pointer">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



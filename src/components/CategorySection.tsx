"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CategorySectionProps {
  title: string;
  category: string;
  products: CategoryProduct[];
  bgColor?: string;
}

const CategorySection = ({ title, category, products, bgColor = 'bg-gray-50' }: CategorySectionProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (product: CategoryProduct) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    router.push('/checkout');
  };
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    {category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    ${product.price}
                  </div>
                  <button onClick={() => handleBuyNow(product)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/products?category=${category.toLowerCase()}`}
            className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            <span>See More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

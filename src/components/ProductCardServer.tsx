import Link from "next/link";
import { Product } from "@/types/types";

interface ProductCardServerProps {
  product: Product;
}

const ProductCardServer = ({ product }: ProductCardServerProps) => {
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


        </div>
      </div>
    </div>
  );
};

export default ProductCardServer;

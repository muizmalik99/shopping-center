import { getProductsServer } from "@/lib/api/server";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsServer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tag =
    typeof searchParams.tag === "string" ? searchParams.tag : undefined;
  const products = await getProductsServer({ tag });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {tag === "best-sellers"
              ? "Best Sellers"
              : tag === "offers"
              ? "Offers"
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            Discover amazing products in our collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <p className="text-gray-600">Showing {products.length} products</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={192} 
                      className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-48"
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
                    <div className="flex space-x-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                      >
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

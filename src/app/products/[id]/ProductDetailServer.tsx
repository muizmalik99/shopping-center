import { getProductServer, getAllProductIds } from "@/lib/api/server";
 
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailServer({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await getProductServer(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Home</span>
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link
                  href="/products"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
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
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.519 3.651a1.25 1.25 0 001.01.765l3.993.37c1.164.108 1.636 1.545.749 2.307l-3.02 2.57a1.25 1.25 0 00-.41 1.28l.95 3.877c.277 1.13-.964 2.033-1.96 1.425l-3.437-2.07a1.25 1.25 0 00-1.298 0l-3.437 2.07c-.996.608-2.237-.295-1.96-1.425l.95-3.876a1.25 1.25 0 00-.41-1.281l-3.02-2.57c-.887-.762-.415-2.2.749-2.308l3.993-.37a1.25 1.25 0 001.01-.765l1.52-3.65z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-yellow-600">
              ${product.price}
            </div>

            <div className="text-gray-700">
              <p className="text-sm text-gray-500 mb-2">Description:</p>
              <p>{product.description || "No description available."}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Stock:</span>
              <span className={`text-sm font-medium ${
                (product.stock || 0) > 0 ? "text-green-600" : "text-red-600"
              }`}>
                {(product.stock || 0) > 0 ? `${product.stock} available` : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const productIds = await getAllProductIds();
  
  return productIds.map((id) => ({
    id: id.toString(),
  }));
}

export const revalidate = 3600; 

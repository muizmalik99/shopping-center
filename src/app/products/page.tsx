"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

const seedProducts: Product[] = [
  {
    id: "1",
    name: "Man T-shirt",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Comfortable and stylish t-shirt for men",
  },
  {
    id: "2",
    name: "Man Shirt",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Elegant formal shirt for professional look",
  },
  {
    id: "3",
    name: "Woman Scarf",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Beautiful and warm scarf for women",
  },
  {
    id: "4",
    name: "Woman Dress",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Elegant dress for special occasions",
  },
  {
    id: "5",
    name: "Sneakers",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Comfortable and stylish sneakers",
  },

  {
    id: "6",
    name: "Laptop",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    category: "electronic",
    description: "High-performance laptop for work and gaming",
  },
  {
    id: "7",
    name: "Mobile",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Latest smartphone with advanced features",
  },
  {
    id: "8",
    name: "Computers",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Powerful desktop computers for professionals",
  },
  {
    id: "9",
    name: "Headphones",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "electronic",
    description: "High-quality wireless headphones",
  },
  {
    id: "10",
    name: "Smartwatch",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Feature-rich smartwatch for fitness tracking",
  },

  // Jewellery Products
  {
    id: "11",
    name: "Jumkas",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Traditional Indian earrings for special occasions",
  },
  {
    id: "12",
    name: "Necklaces",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Elegant necklaces to enhance your beauty",
  },
  {
    id: "13",
    name: "Kangans",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Beautiful bangles for traditional look",
  },
  {
    id: "14",
    name: "Rings",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Stunning rings for special moments",
  },
  {
    id: "15",
    name: "Bracelets",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Elegant bracelets for daily wear",
  },
];

function loadProducts(): Product[] {
  if (typeof window === "undefined") return seedProducts;
  try {
    const userRaw = localStorage.getItem("userProducts");
    const userProducts: Product[] = userRaw ? JSON.parse(userRaw) : [];
    return [...userProducts, ...seedProducts];
  } catch {
    return seedProducts;
  }
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(seedProducts);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
    "name"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const merged = loadProducts();
    setProducts(merged);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange, sortBy, products]);

  const handleAddToCart = (product: Product) => {
    // Handle add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover amazing products in our collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className={`${isFilterOpen ? "block" : "hidden"} lg:col-span-1`}>
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {["all", "fashion", "electronic", "jewellery"].map(
                    (category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2"
                        />
                        <span className="capitalize">{category}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`${isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className={`p-2 rounded border ${
                      isFilterOpen ? "bg-blue-100 text-blue-600 border-blue-200" : "text-gray-600"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2"><Filter className="h-5 w-5" /> Filters</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length}{" "}
                products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

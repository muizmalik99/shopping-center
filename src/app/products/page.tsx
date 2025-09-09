"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { seedProducts, loadProducts, Product } from "@/data/products";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const tagParam = searchParams.get("tag");

  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(seedProducts);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
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
    setSelectedCategory(categoryParam || "all");
  }, [categoryParam]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range (only when filters are open)
    if (isFilterOpen) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    filtered.sort((a, b) => {
      if (tagParam === "best-sellers") {
        const aReviews = a.reviews ?? 0;
        const bReviews = b.reviews ?? 0;
        return bReviews - aReviews;
      }
      if (tagParam === "offers") {
        return a.price - b.price;
      }

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
  }, [selectedCategory, searchQuery, priceRange, sortBy, products, tagParam, isFilterOpen]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleAddToCart = useCallback((product: Product) => {}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {tagParam === "best-sellers"
              ? "Best Sellers"
              : tagParam === "offers"
              ? "Offers"
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            Discover amazing products in our collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {isFilterOpen && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                <div className="mb-6">
                  <h4 className="font-medium text-black mb-3">Category</h4>
                  <div className="space-y-2">
                    {["all", "fashion", "electronic", "jewellery"].map(
                      (category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="mr-2"
                          />
                          <span className="capitalize text-black">
                            {category}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
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
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div
            className={`${isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}`}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFilterOpen((v) => !v)}
                    className={`p-2 rounded border ${
                      isFilterOpen
                        ? "bg-blue-100 text-blue-600 border-blue-200"
                        : "text-gray-600 border-gray-300"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Filter className="h-5 w-5" />{" "}
                      {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    </span>
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
                Showing {filteredProducts.length} of {products.length} products
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
};

export default memo(ProductsPage);

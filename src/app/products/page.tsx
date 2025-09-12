"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid, List } from "lucide-react";
import { Product } from "@/types/types";
import { listProducts } from "@/lib/api/products";
import ProductsFilter from "@/components/ProductsFilter";
import ProductCardClient from "@/components/ProductCardClient";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const tagParam = searchParams.get("tag");

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await listProducts({ tag: tagParam || undefined });
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [tagParam]);

  useEffect(() => {
    setSelectedCategory(categoryParam || "all");
  }, [categoryParam]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (isFilterOpen) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    if (tagParam === "best-sellers") {
      filtered.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
    } else if (tagParam === "offers") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setFilteredProducts(filtered);
  }, [
    selectedCategory,
    searchQuery,
    priceRange,
    sortBy,
    products,
    tagParam,
    isFilterOpen,
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleAddToCart = useCallback((product: Product) => {
    console.log("Add to cart:", product);
  }, []);

  if (loading) return null;

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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {isFilterOpen && (
            <div
              className="lg:col-span-1 transition-transform duration-300 ease-in-out z-[110]"
              style={{
                transform: isFilterOpen ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <ProductsFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceMax={priceRange.max}
                setPriceMax={(val) =>
                  setPriceRange((prev) => ({ ...prev, max: val }))
                }
                sortBy={sortBy}
                setSortBy={(val) => setSortBy(val)}
              />
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
                    className={`p-2 rounded border cursor-pointer ${
                      isFilterOpen
                        ? "bg-yellow-100 text-yellow-600 border-yellow-200"
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
                    className={`p-2 rounded cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-400"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded cursor-pointer ${
                      viewMode === "list"
                        ? "bg-yellow-100 text-yellow-600"
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
                  <ProductCardClient
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

"use client";

import { useState } from "react";
import { Filter, Grid, List } from "lucide-react";

const ProductsLoadingPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const placeholderProducts = Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className={`bg-gray-200 animate-pulse rounded-lg h-60 ${
        viewMode === "grid" ? "" : "h-24"
      }`}
    />
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loading...</h1>
          <p className="text-gray-600">
            Discover amazing products in our collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div
            className={`${isFilterOpen ? "lg:col-span-1" : "lg:col-span-4"}`}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
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
              <div className="flex items-center space-x-2">
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

          <div
            className={`${isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}`}
          >
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {placeholderProducts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsLoadingPage;

"use client";

import { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  compact?: boolean;
}

const SearchBar = ({ compact = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (!compact && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }, [searchQuery, selectedCategory, compact, router]);

  if (compact) {
    return (
      <div className="w-full">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="block w-full pl-9 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm text-black bg-white"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-yellow-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-black"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-yellow-600"
          >
            <Search className="h-5 w-5" />
          </button>
          <Search className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <Filter className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none bg-white text-black"
          >
            <option value="all">All Categories</option>
            <option value="fashion">Fashion</option>
            <option value="electronic">Electronic</option>
            <option value="jewellery">Jewellery</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default memo(SearchBar);

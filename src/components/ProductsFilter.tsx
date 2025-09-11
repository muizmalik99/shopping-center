"use client";

import { memo } from "react";
import { Filter } from "lucide-react";
import { SortKey } from "@/types/types";


const ProductsFilter = ({
  selectedCategory,
  setSelectedCategory,
  priceMax,
  setPriceMax,
  sortBy,
  setSortBy,
}: ProductsFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24 ">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Filters
      </h3>

      <div className="mb-6">
        <h4 className="font-medium text-black mb-3">Category</h4>
        <div className="space-y-2">
          {["all", "fashion", "electronic", "jewellery"].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <span className="capitalize text-black">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceMax}
            onChange={(e) => setPriceMax(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceMax}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default memo(ProductsFilter);

interface ProductsFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
  sortBy: SortKey;
  setSortBy: (value: SortKey) => void;
}
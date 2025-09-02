"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import FileUpload from "@/app/add-product/FileUpload";
import ProductInput from "./ProductInput";

export default function AddProductPage() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      setFormData((p) => ({ ...p, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        description: formData.description,
      };

      const storageKey = "userProducts";
      const existingRaw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      const existing: any[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem(storageKey, JSON.stringify([newProduct, ...existing]));

      console.log("Product added:", newProduct);
      resetForm();
      alert("Product added successfully!");
      router.push("/products");
    } catch {
      alert("Error adding product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(formData).every((v) => v.trim());

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Product
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProductInput
              id="name"
              label="Product Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-black"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductInput
                id="price"
                label="Price *"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="text-black"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ProductInput
              id="stock"
              label="Stock Quantity *"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
              className="text-black"
            />

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <FileUpload
              label="Product Image *"
              preview={imagePreview}
              onChange={handleImageChange}
              onClear={() => setImagePreview("")}
            />

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border text-gray-700 rounded-md hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                           disabled:bg-gray-400 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? "Adding..." : "Add Product"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
interface ProductForm {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  stock: string;
}

const initialForm: ProductForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  stock: "",
};

const categories = [
  { value: "fashion", label: "Fashion" },
  { value: "electronic", label: "Electronic" },
  { value: "jewellery", label: "Jewellery" },
];

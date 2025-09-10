import { Product } from "@/types/types";

export async function listProducts(params?: { tag?: string }) {
  const url = new URL("/api/products", typeof window === "undefined" ? "http://localhost" : window.location.origin);
  if (params?.tag) url.searchParams.set("tag", params.tag);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return (await res.json()) as Product[];
}

export async function getProduct(id: number | string) {
  const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return (await res.json()) as Product;
}

export async function createProduct(input: {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock?: number;
}) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create product');
  }
  return (await res.json()) as Product;
}



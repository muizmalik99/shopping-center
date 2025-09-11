import ProductDetailClient from "./ProductDetailClient";
import { getProductServer, getAllProductIds } from "@/lib/api/server";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductServer(params.id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  const productIds = await getAllProductIds();
  return productIds.map((id) => ({ id: id.toString() }));
}

// Enable ISR for product pages
export const revalidate = 3600; // 1 hour
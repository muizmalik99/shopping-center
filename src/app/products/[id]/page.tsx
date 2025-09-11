import ProductDetailServer from "./ProductDetailServer";
import ProductDetailClient from "./ProductDetailClient";
import { getProductServer } from "@/lib/api/server";
import { notFound } from "next/navigation";

// Server component for initial data fetching and static generation
export default async function ProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await getProductServer(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetailServer params={params} />
      <ProductDetailClient product={product} />
    </div>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  const { getAllProductIds } = await import("@/lib/api/server");
  const productIds = await getAllProductIds();
  
  return productIds.map((id) => ({
    id: id.toString(),
  }));
}

// Enable ISR for product pages
export const revalidate = 3600; // 1 hour
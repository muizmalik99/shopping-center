import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import BrandLogos from "@/components/BrandLogos";
import { getProductsServer } from "@/lib/api/server";
import { Product } from "@/types/types";

// Server component with data fetching
export default async function Home() {
  // Fetch products server-side for better performance and SEO
  const allProducts = await getProductsServer();
  
  // Filter products by category
  const fashionProducts = allProducts.filter(p => p.category.toLowerCase() === 'fashion').slice(0, 3);
  const electronicProducts = allProducts.filter(p => p.category.toLowerCase() === 'electronic').slice(0, 3);
  const jewelleryProducts = allProducts.filter(p => p.category.toLowerCase() === 'jewellery').slice(0, 3);

  return (
    <div>
      <Hero />
      <CategorySection
        title="Man & Woman Fashion"
        category="Fashion"
        products={fashionProducts}
        bgColor="bg-white"
      />
      <CategorySection
        title="Electronic"
        category="Electronic"
        products={electronicProducts}
        bgColor="bg-gray-50"
      />
      <CategorySection
        title="Accessories"
        category="Jewellery"
        products={jewelleryProducts}
        bgColor="bg-white"
      />
      <BrandLogos />
    </div>
  );
}

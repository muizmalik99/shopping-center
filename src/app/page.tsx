import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BrandLogos from '@/components/BrandLogos';
import { fashionProducts, electronicProducts, jewelleryProducts } from '@/data/homeData';

export default function Home() {
  return (
    <div>
      <Hero />
      {/* Fashion Section */}
      <CategorySection
        title="Man & Woman Fashion"
        category="Fashion"
        products={fashionProducts}
        bgColor="bg-white"
      />
      {/* Electronic Section */}
      <CategorySection
        title="Electronic"
        category="Electronic"
        products={electronicProducts}
        bgColor="bg-gray-50"
      />
      {/* Jewellery Section */}
      <CategorySection
        title="Accessories"
        category="Jewellery"
        products={jewelleryProducts}
        bgColor="bg-white"
      />
      {/* Brand Logos Section at the end */}
      <BrandLogos />
    </div>
  );
}

import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BrandLogos from '@/components/BrandLogos';
import { fashionProducts, electronicProducts, jewelleryProducts } from '@/data/homeData';
import { Suspense } from 'react';

export default function Home() {
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
      <Suspense fallback={<div className="py-8"><div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" /><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{Array.from({length:4}).map((_,i)=>(<div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />))}</div></div>}>
        <BrandLogos />
      </Suspense>
    </div>
  );
}

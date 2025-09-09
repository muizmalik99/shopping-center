import Image from 'next/image';
import { memo, useMemo } from 'react';
import { brands } from '@/data/brands';

const BrandLogos = () => {
  const repeatedBrands = useMemo(() => [...brands, ...brands, ...brands], []);
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"> Brands
          </h2>
         
        </div>
        <div className="relative">
          <div className="flex animate-scroll-left items-center w-max">
            {repeatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center w-28 h-16 relative"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name + ' logo'}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BrandLogos);

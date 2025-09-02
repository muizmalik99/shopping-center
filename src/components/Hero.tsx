import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-yellow-200 to-yellow-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Get Started
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-2 opacity-90">
                Your Favorite Shopping
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover amazing deals on fashion, electronics, and jewellery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=fashion"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-yellow-600 transition-colors"
              >
                Explore Fashion
              </Link>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Floating Product Cards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="w-24 h-24 bg-white/20 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Fashion</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="w-24 h-24 bg-white/20 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Electronics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="w-24 h-24 bg-white/20 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Jewellery</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="w-24 h-24 bg-white/20 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Accessories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

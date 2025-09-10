export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="inline-block h-5 w-24 bg-yellow-100 rounded-full animate-pulse" />
            </div>

            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-300"
                  >
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.519 3.651a1.25 1.25 0 001.01.765l3.993.37c1.164.108 1.636 1.545.749 2.307l-3.02 2.57a1.25 1.25 0 00-.41 1.28l.95 3.877c.277 1.13-.964 2.033-1.96 1.425l-3.437-2.07a1.25 1.25 0 00-1.298 0l-3.437 2.07c-.996.608-2.237-.295-1.96-1.425l.95-3.876a1.25 1.25 0 00-.41-1.281l-3.02-2.57c-.887-.762-.415-2.2.749-2.308l3.993-.37a1.25 1.25 0 001.01-.765l1.52-3.65z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="text-3xl font-bold text-yellow-600">$ 00</div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="px-3 py-2 bg-gray-100 text-transparent">-</div>
                <div className="w-16 h-10 bg-gray-200" />
                <div className="px-3 py-2 bg-gray-100 text-transparent">+</div>
              </div>

              <div className="px-20 py-3 bg-gray-200 rounded-md animate-pulse" />
              <div className="px-16 py-3 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

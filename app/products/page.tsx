import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';

// This page uses Server-Side Rendering (SSR)
// The page is rendered on each request with fresh data
// This is useful for pages that need to display real-time data or personalized content

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  
  // In a real app, you would fetch from the API or database
  // For demonstration, we'll filter mock data based on query params
  const filteredProducts = category
    ? mockProducts.filter(p => p.category === category)
    : mockProducts;

  // Get unique categories for the filter
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">
            Browse our complete collection of {filteredProducts.length} products
            {category && ` in ${category}`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href="/products"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/products?category=${cat}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// This tells Next.js to use SSR for this page
export const dynamic = 'force-dynamic';

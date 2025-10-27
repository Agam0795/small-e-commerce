import { mockProducts } from '@/lib/mockData';
import Link from 'next/link';
import DashboardActions from '@/components/DashboardActions';

// Force dynamic rendering (SSR)
// This page fetches fresh data on every request
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // In a real app, this would fetch from MongoDB on every request
  // For now, we use mock data to demonstrate SSR
  const products = mockProducts;
  
  // Calculate real-time statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => (p.stock || p.inventory || 0) < 10);
  const outOfStock = products.filter(p => (p.stock || p.inventory || 0) === 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * (p.stock || p.inventory || 0)), 0);
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  
  // Category breakdown
  const categoryStats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time product inventory and statistics (SSR)</p>
          <p className="text-sm text-blue-600 mt-1">
            ⚡ This page is rendered on every request with fresh data
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{lowStockProducts.length}</p>
                <p className="text-xs text-gray-500 mt-1">{"< 10 units"}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{outOfStock.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Inventory Value */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${totalInventoryValue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(categoryStats)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{category}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Low Stock Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
            <p className="text-sm text-gray-600 mt-1">Products with less than 10 units in stock</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-orange-600">{product.stock || product.inventory || 0} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        (product.stock || product.inventory || 0) === 0 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {(product.stock || product.inventory || 0) === 0 ? 'Out of Stock' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link 
                        href={`/admin?edit=${product.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Restock
                      </Link>
                    </td>
                  </tr>
                ))}
                {lowStockProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      ✅ All products are well stocked!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Average Price:</dt>
                <dd className="text-sm font-semibold text-gray-900">${averagePrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Total Categories:</dt>
                <dd className="text-sm font-semibold text-gray-900">{Object.keys(categoryStats).length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">In Stock Products:</dt>
                <dd className="text-sm font-semibold text-gray-900">{totalProducts - outOfStock.length}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">SSR Information</h3>
            <p className="text-sm text-blue-800">
              This dashboard uses <strong>Server-Side Rendering (SSR)</strong> to ensure you always see 
              the most up-to-date inventory data. The page is generated fresh on every request.
            </p>
            <DashboardActions />
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Page generated at: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

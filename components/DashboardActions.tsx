'use client';

import Link from 'next/link';

export default function DashboardActions() {
  return (
    <div className="mt-4 flex gap-4">
      <Link 
        href="/admin"
        className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Manage Inventory →
      </Link>
      <button 
        onClick={() => window.location.reload()}
        className="text-sm bg-white text-blue-600 px-4 py-2 rounded border border-blue-300 hover:bg-blue-50 transition-colors"
      >
        Refresh Data
      </button>
    </div>
  );
}

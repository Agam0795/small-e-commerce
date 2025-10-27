import { mockProducts } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

// This page uses Incremental Static Regeneration (ISR)
// Pages are pre-rendered at build time but can be regenerated in the background
// This is ideal for product pages that don't change frequently but need occasional updates

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  
  // In a real app, you would fetch from the API
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

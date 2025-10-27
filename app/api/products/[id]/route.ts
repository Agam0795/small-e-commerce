import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';
import clientPromise from '@/lib/mongodb';

// GET single product by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try to use MongoDB, fallback to mock data
    try {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');
      
      const product = await collection.findOne({ id });
      
      if (!product) {
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p.id === id);
        if (!mockProduct) {
          return NextResponse.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({
          success: true,
          data: mockProduct,
          source: 'mock'
        });
      }
      
      return NextResponse.json({
        success: true,
        data: product,
        source: 'mongodb'
      });
      
    } catch (dbError) {
      console.warn('MongoDB connection failed, using mock data:', dbError);
      
      const product = mockProducts.find(p => p.id === id);
      
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: product,
        source: 'mock'
      });
    }
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

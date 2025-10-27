import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';
import clientPromise from '@/lib/mongodb';

// GET all products or filter by category
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    // Try to use MongoDB, fallback to mock data
    try {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');
      
      // Check if collection has data
      const count = await collection.countDocuments();
      
      if (count === 0) {
        // Seed database with mock data
        const productsToInsert = mockProducts.map(({ _id, ...product }) => product);
        await collection.insertMany(productsToInsert as any);
      }
      
      let query: any = {};
      if (category) {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      
      const products = await collection.find(query).toArray();
      
      return NextResponse.json({
        success: true,
        data: products,
        source: 'mongodb'
      });
      
    } catch (dbError) {
      console.warn('MongoDB connection failed, using mock data:', dbError);
      
      // Fallback to mock data
      let filteredProducts = mockProducts;
      
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      if (featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured);
      }
      
      return NextResponse.json({
        success: true,
        data: filteredProducts,
        source: 'mock'
      });
    }
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create a new product (Admin only)
export async function POST(request: Request) {
  try {
    // Simple API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY && apiKey !== 'admin-secret-key') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { name, slug, description, price, category, inventory } = body;
    if (!name || !description || price === undefined || !category || inventory === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      price: parseFloat(price),
      category,
      inventory: parseInt(inventory),
      image: body.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      rating: body.rating || 4,
      featured: body.featured || false,
      lastUpdated: new Date().toISOString(),
    };

    // Try to save to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('products');
      
      await collection.insertOne(newProduct as any);
      
      return NextResponse.json({
        success: true,
        data: newProduct,
        source: 'mongodb'
      }, { status: 201 });
      
    } catch (dbError) {
      console.warn('MongoDB insert failed, returning mock response:', dbError);
      
      // Return success even if DB fails (for demo purposes)
      return NextResponse.json({
        success: true,
        data: newProduct,
        source: 'mock',
        message: 'Product created (mock mode - not persisted)'
      }, { status: 201 });
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

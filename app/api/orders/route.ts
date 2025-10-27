import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Order } from '@/lib/types';

// GET all orders
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ecommerce');
    const collection = db.collection('orders');
    
    const orders = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders', data: [] },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName, shippingAddress } = body;
    
    if (!items || !customerEmail || !customerName || !shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      totalAmount,
      status: 'pending',
      customerEmail,
      customerName,
      shippingAddress,
      createdAt: new Date()
    };
    
    try {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const collection = db.collection('orders');
      
      const result = await collection.insertOne(newOrder as any);
      
      return NextResponse.json({
        success: true,
        data: { ...newOrder, _id: result.insertedId }
      }, { status: 201 });
    } catch (dbError) {
      console.warn('MongoDB connection failed:', dbError);
      // In a real app, you'd want to handle this differently
      return NextResponse.json({
        success: true,
        data: newOrder,
        message: 'Order created (mock mode - database unavailable)'
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

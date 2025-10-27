export interface Product {
  _id?: string;
  id: string;
  name: string;
  slug?: string; // URL-friendly name
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number; // Also known as inventory
  inventory?: number; // Alias for stock
  featured: boolean;
  rating: number;
  reviews: number;
  lastUpdated?: string; // ISO datetime string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface Order {
  _id?: string;
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  createdAt: Date;
  updatedAt?: Date;
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import { formatCurrency } from '@/lib/utils';

/**
 * Shopping Cart Page
 * Rendering Strategy: Client-Side Rendering (CSR)
 * Reason: Requires client-side state management and localStorage for cart persistence
 * All cart data is managed on the client side using React Context
 */

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link href="/products">
              <Button variant="secondary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatCurrency(getCartTotal() * 0.08)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(getCartTotal() * 1.08)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="large"
              className="w-full mb-3"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <div className="text-xs text-gray-500 text-center">
              Secure checkout • Free returns • 30-day guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

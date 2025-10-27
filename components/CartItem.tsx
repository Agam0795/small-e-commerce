'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  // Defensive check for missing data
  if (!item.image || !item.name) {
    return null;
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.name || 'Product'}
          fill
          className="object-cover rounded-md"
          sizes="96px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{formatCurrency(item.price)} each</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1 border-x border-gray-300 min-w-12 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-bold text-lg text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white dark:bg-[#1a2e1a] rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-green-800/50">
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-md z-10">Mới</span>
        )}
        
        <Link href={`/product/${product.id}`}>
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${product.image}')` }}
          />
        </Link>

        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 h-10 w-10 bg-white dark:bg-green-800 rounded-full flex items-center justify-center shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-black"
        >
          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.unit} • {product.origin}</p>
        
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-black text-primary">
            {product.price.toLocaleString()}₫
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}₫
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <span className="material-symbols-outlined text-yellow-400 text-sm icon-filled">star</span>
          <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
            {product.rating} ({product.reviews} đánh giá)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

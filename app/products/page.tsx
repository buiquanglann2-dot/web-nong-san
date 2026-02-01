'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(500000);
  const [tempMaxPrice, setTempMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState('Mới nhất');

  const categories = ['Tất cả', 'Rau xanh', 'Củ quả', 'Trái cây', 'Nấm & Gia vị'];

  // Calculate filtered products based on APPLIED filters
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const categoryMatch = activeCategory === 'Tất cả' || p.category === activeCategory;
      const priceMatch = p.price <= appliedMaxPrice;
      return categoryMatch && priceMatch;
    });

    // Handle Sorting
    if (sortBy === 'Giá: Thấp đến Cao') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Giá: Cao đến Thấp') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Bán chạy nhất') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [activeCategory, appliedMaxPrice, sortBy]);

  // Preview count based on TEMP filters
  const previewCount = useMemo(() => {
    return PRODUCTS.filter(p => {
      const categoryMatch = activeCategory === 'Tất cả' || p.category === activeCategory;
      return categoryMatch && p.price <= tempMaxPrice;
    }).length;
  }, [activeCategory, tempMaxPrice]);

  const handleApplyFilter = () => {
    setAppliedMaxPrice(tempMaxPrice);
  };

  const handleReset = () => {
    setTempMaxPrice(500000);
    setAppliedMaxPrice(500000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-gray-900 dark:text-white">Danh mục sản phẩm</h1>
          <p className="text-gray-500 dark:text-gray-400">Khám phá hàng trăm loại nông sản sạch đạt chuẩn.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Sắp xếp theo:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-[#1a2e1a] border-[#e5e7eb] dark:border-green-800 rounded-lg text-sm font-bold focus:ring-primary focus:border-primary px-4 py-2 cursor-pointer transition-colors"
          >
            <option>Mới nhất</option>
            <option>Bán chạy nhất</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
          {/* Category Card */}
          <div className="bg-white dark:bg-[#1a2e1a] p-6 rounded-[2rem] border border-gray-100 dark:border-green-800/50 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary icon-filled">category</span>
              Danh mục
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-3 text-sm font-semibold transition-all text-left group ${
                    activeCategory === cat 
                      ? 'text-primary' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                  }`}
                >
                  <span className={`size-4 rounded-full border-2 border-[#dbe6db] dark:border-green-800 transition-colors group-hover:border-primary ${
                    activeCategory === cat ? 'bg-primary border-primary' : ''
                  }`} />
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter Card */}
          <div className="bg-white dark:bg-[#1a2e1a] p-6 rounded-[2rem] border border-gray-100 dark:border-green-800/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary icon-filled">payments</span>
                Khoảng giá
              </h3>
              <button 
                onClick={handleReset}
                className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors"
              >
                Đặt lại
              </button>
            </div>
            
            <div className="px-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400">Tối đa chọn:</span>
                <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {tempMaxPrice === 500000 ? 'Tất cả' : `${tempMaxPrice.toLocaleString()}₫`}
                </span>
              </div>
              
              <input 
                type="range" 
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary mb-6" 
                min="10000" 
                max="500000" 
                step="10000" 
                value={tempMaxPrice}
                onChange={(e) => setTempMaxPrice(parseInt(e.target.value))}
              />
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[50000, 100000, 200000, 500000].map(p => (
                  <button
                    key={p}
                    onClick={() => setTempMaxPrice(p)}
                    className={`text-[10px] font-bold py-2.5 rounded-xl border transition-all ${
                      tempMaxPrice === p 
                        ? 'bg-primary border-primary text-black' 
                        : 'border-gray-100 dark:border-green-800 text-gray-500 hover:border-primary'
                    }`}
                  >
                    {p === 500000 ? 'Tất cả' : `< ${p/1000}k`}
                  </button>
                ))}
              </div>

              {/* Action Search Button */}
              <button
                onClick={handleApplyFilter}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  tempMaxPrice !== appliedMaxPrice 
                  ? 'bg-black dark:bg-primary text-white dark:text-black shadow-primary/20 scale-105' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default'
                }`}
              >
                <span className="material-symbols-outlined text-xl">search</span>
                Tìm ngay ({previewCount})
              </button>
              {tempMaxPrice !== appliedMaxPrice && (
                <p className="text-[10px] text-center mt-3 text-orange-500 font-bold animate-bounce">
                  Bấm để cập nhật kết quả!
                </p>
              )}
            </div>
          </div>

          {/* Featured Badge Card */}
          <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-[2rem] border border-primary/20">
            <h4 className="font-black text-xs text-primary uppercase tracking-widest mb-2">Ưu đãi hôm nay</h4>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Nhập mã <span className="text-primary">FRESH20</span> giảm ngay 20k cho đơn từ 200k.</p>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-bold text-gray-400">Đang hiển thị:</span>
            <span className="bg-white dark:bg-[#1a2e1a] px-3 py-1 rounded-full text-xs font-black border border-gray-100 dark:border-green-800">
              {filteredProducts.length} sản phẩm
            </span>
            {activeCategory !== 'Tất cả' && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                {activeCategory}
              </span>
            )}
            {appliedMaxPrice < 500000 && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                Dưới {appliedMaxPrice.toLocaleString()}₫
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 dark:bg-[#1a2e1a]/20 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-green-800/30">
              <div className="size-20 bg-gray-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-green-800">search_off</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">Không tìm thấy sản phẩm phù hợp.</p>
              <p className="text-gray-400 text-sm mb-8">Thử thay đổi bộ lọc hoặc khoảng giá của bạn.</p>
              <button 
                onClick={() => {
                  setActiveCategory('Tất cả');
                  setTempMaxPrice(500000);
                  setAppliedMaxPrice(500000);
                }}
                className="bg-primary px-8 py-3 rounded-xl font-bold text-black shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

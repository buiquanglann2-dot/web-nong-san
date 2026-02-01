'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-40 py-12">
      <h1 className="text-4xl font-black mb-2">Giỏ hàng & Thanh toán</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Kiểm tra lại đơn hàng và hoàn tất thông tin thanh toán.</p>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1a2e1a] rounded-3xl border border-gray-100 dark:border-green-800 shadow-sm">
          <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">shopping_basket</span>
          <h2 className="text-xl font-bold mb-4">Giỏ hàng đang trống</h2>
          <Link href="/products" className="bg-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">Mua sắm ngay</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a2e1a] rounded-3xl border border-gray-100 dark:border-green-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 dark:border-green-900 flex justify-between items-center">
                <h3 className="text-xl font-bold">Sản phẩm ({cart.length})</h3>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 text-sm font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span>
                  Xóa tất cả
                </button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-green-900">
                {cart.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="size-24 rounded-2xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0 border border-gray-100 dark:border-green-900" style={{ backgroundImage: `url('${item.image}')` }} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.unit} • {item.origin}</p>
                      <p className="text-primary font-black mt-1">{item.price.toLocaleString()}₫</p>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-1 shrink-0 border border-transparent dark:border-green-800">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="size-8 flex items-center justify-center hover:bg-white dark:hover:bg-green-900 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">remove</span>
                      </button>
                      <span className="w-10 text-center font-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="size-8 flex items-center justify-center hover:bg-white dark:hover:bg-green-900 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">add</span>
                      </button>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black text-primary">{(item.price * item.quantity).toLocaleString()}₫</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors mt-2"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Form */}
            <div className="bg-white dark:bg-[#1a2e1a] rounded-3xl border border-gray-100 dark:border-green-800 shadow-sm p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Thông tin giao hàng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Họ và tên</label>
                  <input type="text" className="rounded-xl border-gray-200 dark:border-green-800 dark:bg-[#102210] focus:ring-primary focus:border-primary" placeholder="Nguyễn Văn A" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Số điện thoại</label>
                  <input type="tel" className="rounded-xl border-gray-200 dark:border-green-800 dark:bg-[#102210] focus:ring-primary focus:border-primary" placeholder="0901234567" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Địa chỉ cụ thể</label>
                  <textarea rows={3} className="rounded-xl border-gray-200 dark:border-green-800 dark:bg-[#102210] focus:ring-primary focus:border-primary" placeholder="Số nhà, tên đường, phường/xã..." />
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a2e1a] rounded-3xl border border-gray-100 dark:border-green-800 shadow-xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-8">Tổng đơn hàng</h3>
              <div className="flex flex-col gap-4 pb-6 border-b border-gray-50 dark:border-green-900">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Tạm tính</span>
                  <span className="font-bold">{subtotal.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Phí vận chuyển</span>
                  <span className="font-bold">{shipping.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span className="font-medium">Giảm giá</span>
                  <span className="font-bold">-0₫</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-6">
                <span className="text-lg font-black">Tổng cộng</span>
                <div className="text-right">
                  <span className="block text-3xl font-black text-primary">{total.toLocaleString()}₫</span>
                  <span className="text-[10px] text-gray-400">(Đã bao gồm VAT)</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Bảo hành tươi ngon 100%
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  Giao hàng siêu tốc nội thành
                </div>
              </div>

              <button className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-green-400 hover:-translate-y-1 transition-all active:translate-y-0">
                Xác nhận đặt hàng
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-4">
                Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ của FreshFarm.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;

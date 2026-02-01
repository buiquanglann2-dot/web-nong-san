'use client';

import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { EVENTS } from '../constants'; // Removed PRODUCTS import
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        if (data) {
          // Map DB snake_case to Frontend camelCase
          const mappedProducts: Product[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.original_price, // map original_price
            unit: item.unit,
            image: item.image,
            category: item.category,
            origin: item.origin,
            rating: item.rating,
            reviews: item.reviews,
            isNew: item.is_new, // map is_new
            isVietGap: item.is_viet_gap, // map is_viet_gap
            description: item.description,
            reviewsList: [] // Default empty review list for now
          }));
          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter for new products
  const newProducts = useMemo(() => products.filter(p => p.isNew), [products]);

  // Filter for discount products (Flash Sale)
  const discountProducts = useMemo(() =>
    products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 5),
    [products]);

  // Get a subset of products for featured section
  const featuredProducts = useMemo(() =>
    products.filter(p => !p.isNew && (!p.originalPrice || p.originalPrice <= p.price)).slice(0, 8),
    [products]);

  return (
    <div className="flex flex-col">
      {/* Member Vouchers Section - Only for Logged In Users */}
      {user && (
        <section className="py-10 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-y border-green-100 dark:border-green-800/30">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white dark:bg-[#1a2e1a] rounded-xl shadow-sm text-primary">
                <span className="material-symbols-outlined text-2xl">confirmation_number</span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Voucher thành viên</h2>
                <p className="text-sm font-medium text-gray-500 max-w-xl">Dành riêng cho bạn! Lưu mã ngay để áp dụng khi thanh toán.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { code: 'FREESHIP', value: 'Freeship', desc: 'Đơn từ 300k', color: 'bg-blue-500' },
                { code: 'HELLO', value: 'Giảm 20k', desc: 'Cho đơn đầu tiên', color: 'bg-orange-500' },
                { code: 'ORGANIC', value: 'Giảm 10%', desc: 'Tối đa 50k', color: 'bg-primary' }
              ].map((voucher, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a2e1a] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-green-800/50 flex items-center justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className={`absolute -left-3 top-0 bottom-0 w-6 ${voucher.color} skew-x-[-10deg]`}></div>
                  <div className="pl-6 flex flex-col">
                    <span className="font-black text-xl text-gray-800 dark:text-white">{voucher.value}</span>
                    <span className="text-xs font-bold text-gray-400">{voucher.desc}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2 z-10">
                    <span className="text-xs font-bold bg-gray-100 dark:bg-black/20 px-2 py-1 rounded text-gray-500">{voucher.code}</span>
                    <button className="text-xs font-black text-primary hover:underline">Lưu mã</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop')" }}
            />
          </div>
          <div className="relative z-20 px-8 py-16 sm:px-16 sm:py-24 lg:py-32 flex flex-col items-start gap-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-primary border border-primary/30">
              <span className="material-symbols-outlined text-sm icon-filled">verified</span>
              100% Hữu Cơ - Tươi Sạch
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl leading-tight">
              Rau Củ Tươi Ngon <br /> <span className="text-primary">Mới Về Mỗi Ngày</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Ưu đãi <span className="text-white font-bold">Giảm 20%</span> cho khách hàng mới. Chúng tôi cam kết mang lại nguồn thực phẩm sạch, an toàn cho bữa cơm gia đình bạn.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-black shadow-lg shadow-primary/30 hover:bg-green-400 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Mua Ngay
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white ring-1 ring-white/30 hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined">play_circle</span> Xem Giới Thiệu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      {discountProducts.length > 0 && (
        <section className="py-16 bg-white dark:bg-background-dark overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#fff5f5] dark:bg-red-900/10 rounded-[3rem] p-8 md:p-12 border border-red-100 dark:border-red-900/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/30 animate-pulse">
                    <span className="material-symbols-outlined font-black text-3xl">bolt</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-red-600 dark:text-red-400 italic uppercase">Flash Sale</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">Ưu đãi cực khủng chỉ trong hôm nay!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Kết thúc sau:</span>
                  <div className="flex gap-2">
                    {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                      <div key={i} className="bg-black text-white px-3 py-2 rounded-xl font-black text-xl min-w-[3rem] text-center shadow-lg">
                        {unit.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {discountProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-background-light dark:bg-gray-900/30">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-black shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined font-black">new_releases</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Sản phẩm mới nhập</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Nông sản tươi nhất vừa cập bến FreshFarm</p>
                </div>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm font-black text-primary hover:gap-3 transition-all">
                Xem thêm
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Sự kiện & Hoạt động</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Cùng FreshFarm lan tỏa lối sống xanh thông qua các buổi Workshop và hành trình tham quan trang trại thực tế.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map(event => (
              <div key={event.id} className="group flex flex-col bg-background-light dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-green-800/30 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                    {event.tag}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3">
                    <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">{event.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {event.location}
                  </div>
                  <button className="w-full py-4 bg-black dark:bg-primary text-white dark:text-black font-black rounded-2xl hover:bg-primary transition-colors hover:text-black group-hover:shadow-xl group-hover:shadow-primary/20">
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background-light dark:bg-gray-900/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Sản phẩm nổi bật</h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mt-2"></div>
            </div>
            <Link href="/products" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Tại sao chọn FreshFarm?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Chất lượng vượt trội, nguồn gốc minh bạch và phục vụ tận tâm là những gì chúng tôi mang lại.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-background-light dark:bg-gray-800 rounded-3xl p-10 text-center shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-primary/20">
              <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary">
                <span className="material-symbols-outlined text-4xl icon-filled">verified</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Nguồn Gốc Rõ Ràng</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                100% nông sản có chứng chỉ VietGAP hoặc Hữu cơ, truy xuất nguồn gốc từng trang trại.
              </p>
            </div>
            <div className="bg-background-light dark:bg-gray-800 rounded-3xl p-10 text-center shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-blue-500/20">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-500">
                <span className="material-symbols-outlined text-4xl icon-filled">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Giao Hàng Nhanh 2H</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                Cam kết giao hàng tươi mới nhất chỉ trong vòng 2 giờ đồng hồ nội thành.
              </p>
            </div>
            <div className="bg-background-light dark:bg-gray-800 rounded-3xl p-10 text-center shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-orange-500/20">
              <div className="h-16 w-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-8 text-orange-500">
                <span className="material-symbols-outlined text-4xl icon-filled">temp_preferences_eco</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Tươi Ngon Tự Nhiên</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                Sản phẩm được thu hoạch hằng ngày, không thuốc bảo quản hay chất kích thích.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product, Review } from '../types';

interface ProductDetailProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(product?.reviewsList || []);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <h2 className="text-2xl font-black mb-4">Sản phẩm không tồn tại</h2>
        <Link to="/products" className="bg-primary px-8 py-3 rounded-xl font-bold">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    setSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('vi-VN')
      };

      setReviews([review, ...reviews]);
      setNewReview({ userName: '', rating: 5, comment: '' });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-40 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium mb-10">
        <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Trang chủ</Link>
        <span className="material-symbols-outlined text-sm text-gray-400">chevron_right</span>
        <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">Sản phẩm</Link>
        <span className="material-symbols-outlined text-sm text-gray-400">chevron_right</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Gallery */}
        <div className="flex flex-col gap-6">
          <div 
            className="aspect-square rounded-3xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center border border-gray-100 dark:border-green-800 shadow-xl"
            style={{ backgroundImage: `url('${product.image}')` }}
          />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center border cursor-pointer hover:border-primary transition-all ${i === 1 ? 'border-primary' : 'border-transparent'}`}
                style={{ backgroundImage: `url('${product.image}')` }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                VietGAP Certified
              </span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                Giao nhanh 2h
              </span>
            </div>
            <h1 className="text-4xl font-black mb-2">{product.name} - {product.origin}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`material-symbols-outlined ${i <= product.rating ? 'icon-filled' : ''}`}>star</span>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-400 border-l border-gray-200 dark:border-green-800 pl-4">
                {reviews.length + (product.reviews - (product.reviewsList?.length || 0))} đánh giá
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-green-800/50">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">{product.price.toLocaleString()}₫</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString()}₫</span>
              )}
              <span className="text-lg text-gray-500">/ {product.unit}</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description || 'Sản phẩm mọng nước, vị ngọt thanh tự nhiên từ vườn. Thích hợp cho bữa cơm hằng ngày, bổ sung Vitamin C tăng sức đề kháng.'}
            </p>
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">Số lượng</span>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden p-1 border border-transparent dark:border-green-800">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-green-900 transition-all rounded-lg"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center bg-transparent border-none font-black text-lg focus:ring-0"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-green-900 transition-all rounded-lg"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex items-center justify-center gap-2 border-2 border-primary text-black dark:text-primary font-black py-4 rounded-2xl hover:bg-primary/10 transition-all"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Thêm giỏ hàng
              </button>
              <button className="bg-primary text-black font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-green-400 transition-all transform hover:-translate-y-1 active:translate-y-0">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-100 dark:border-green-800 pt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Review List */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-black mb-10 flex items-center gap-3">
              Đánh giá từ khách hàng
              <span className="text-sm font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-500">{reviews.length}</span>
            </h2>

            {reviews.length > 0 ? (
              <div className="flex flex-col gap-10">
                {reviews.map(review => (
                  <div key={review.id} className="flex gap-6">
                    <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-3xl icon-filled">account_circle</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">{review.userName}</h4>
                        <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                      </div>
                      <div className="flex items-center text-yellow-400 mb-3">
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className={`material-symbols-outlined text-sm ${i <= review.rating ? 'icon-filled' : ''}`}>star</span>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-12 text-center border-2 border-dashed border-gray-100 dark:border-green-800/30">
                <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-green-800 mb-4">rate_review</span>
                <p className="text-gray-500 font-bold">Chưa có đánh giá nào cho sản phẩm này.</p>
                <p className="text-gray-400 text-sm">Hãy là người đầu tiên chia sẻ cảm nhận của bạn!</p>
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-[#1a2e1a] rounded-3xl p-8 border border-gray-100 dark:border-green-800 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6">Viết đánh giá của bạn</h3>
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Đánh giá của bạn</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`material-symbols-outlined text-3xl transition-colors ${star <= newReview.rating ? 'text-yellow-400 icon-filled' : 'text-gray-200 dark:text-green-900'}`}
                      >
                        star
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Tên của bạn</label>
                  <input
                    type="text"
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    placeholder="Nhập tên của bạn..."
                    className="w-full rounded-xl border-gray-100 dark:border-green-800 dark:bg-[#102210] focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Cảm nhận của bạn</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Chia sẻ trải nghiệm về sản phẩm..."
                    className="w-full rounded-xl border-gray-100 dark:border-green-800 dark:bg-[#102210] focus:ring-primary focus:border-primary px-4 py-3 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black dark:bg-primary text-white dark:text-black font-black py-4 rounded-xl hover:bg-gray-900 dark:hover:bg-green-400 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  ) : (
                    <>Gửi đánh giá</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

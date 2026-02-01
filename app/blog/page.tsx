'use client';

import React, { useState, useMemo } from 'react';
import { BLOG_ARTICLES } from '../../constants';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return BLOG_ARTICLES;
    return BLOG_ARTICLES.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.excerpt.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-40 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-4">Chuyện Nhà Nông</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
          Nơi chia sẻ kiến thức nông nghiệp hữu cơ, hành trình từ nông trại đến bàn ăn và các mẹo sống xanh mỗi ngày.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full rounded-2xl border-gray-200 dark:border-green-800 dark:bg-[#1a2e1a] py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all dark:text-white placeholder-gray-400 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#1a2e1a] rounded-[2.5rem] border border-gray-100 dark:border-green-800 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="lg:col-span-7 relative h-[400px] lg:h-auto overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
                <div className="absolute top-6 left-6 bg-primary text-black text-xs font-black px-4 py-1.5 rounded-full uppercase">
                  {article.category}
                </div>
              </div>
              <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-3xl font-black leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <img src={article.authorAvatar} alt={article.author} className="size-10 rounded-full border-2 border-primary/20" />
                  <span className="font-black text-sm">{article.author}</span>
                  <button className="ml-auto flex items-center gap-2 text-sm font-black text-primary hover:gap-4 transition-all group/btn">
                    Đọc tiếp
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-[#1a2e1a]/20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-green-800/30">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-green-800 mb-4">search_off</span>
            <p className="text-gray-500 dark:text-gray-400 font-bold">Không tìm thấy bài viết nào phù hợp với "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {['Kiến thức', 'Mẹo chọn rau', 'Sống xanh', 'Nông trại'].map(cat => (
            <div key={cat} className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1a2e1a]/40 border border-gray-100 dark:border-green-800 flex flex-col items-center gap-4 hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="size-16 rounded-2xl bg-white dark:bg-green-800 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-black transition-colors">
                <span className="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <span className="font-black text-lg">{cat}</span>
              <span className="text-xs text-gray-400 font-bold">15 bài viết</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

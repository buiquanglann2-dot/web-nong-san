'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#102210]/95 backdrop-blur-md border-b border-[#f0f5f0] dark:border-green-900/30 px-4 md:px-10 py-3 shadow-sm transition-all">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="size-8 sm:size-10 text-primary flex items-center justify-center rounded-xl bg-primary/20">
            <span className="material-symbols-outlined text-2xl sm:text-3xl icon-filled">eco</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#111811] dark:text-white">
            Fresh<span className="text-primary">Farm</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
          >
            Trang chủ
          </Link>
          <Link
            href="/products"
            className={`text-sm font-bold transition-colors ${isActive('/products') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
          >
            Sản phẩm
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-bold transition-colors ${isActive('/blog') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-sm font-bold transition-colors ${isActive('/about') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
          >
            Về chúng tôi
          </Link>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm rau củ, trái cây..."
              className="w-full rounded-full border-none bg-gray-100 dark:bg-[#1a2e1a] py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-background-dark">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className={`flex items-center gap-2 p-1.5 pl-2 pr-4 rounded-full transition-colors border border-transparent ${isActive('/account') ? 'bg-primary text-black' : 'bg-gray-100 dark:bg-[#1a2e1a] hover:bg-gray-200 dark:hover:bg-green-900/30 dark:border-green-800/50 text-gray-900 dark:text-white'}`}
          >
            <div className={`size-8 rounded-full flex items-center justify-center shadow-sm ${isActive('/account') ? 'bg-black/10' : 'bg-white dark:bg-green-800'}`}>
              {user ? (
                <span className="font-bold text-xs text-primary">
                  {user.user_metadata.full_name ? user.user_metadata.full_name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </span>
              ) : (
                <span className="material-symbols-outlined text-sm">person</span>
              )}
            </div>
            <span className="text-sm font-bold hidden sm:block">
              {user ? (user.user_metadata.full_name || 'Tài khoản') : 'Tài khoản'}
            </span>
          </Link>

          {user && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 p-1.5 pl-2 pr-4 rounded-full transition-colors border border-transparent ${isActive('/admin') ? 'bg-primary text-black' : 'bg-gray-100 dark:bg-[#1a2e1a] hover:bg-gray-200 dark:hover:bg-green-900/30 dark:border-green-800/50 text-gray-900 dark:text-white'}`}
            >
              <div className={`size-8 rounded-full flex items-center justify-center shadow-sm ${isActive('/admin') ? 'bg-black/10' : 'bg-white dark:bg-green-800'}`}>
                <span className="material-symbols-outlined text-sm">settings</span>
              </div>
              <span className="text-sm font-bold hidden sm:block">Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

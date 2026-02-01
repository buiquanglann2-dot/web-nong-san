'use client';

import React, { useState } from 'react';

const Account: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Registration Form State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Đăng ký thành công! (Mockup)');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Đăng nhập thành công! (Mockup)');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background-light dark:bg-background-dark/50">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2e1a] rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-green-800/50">
        {/* Toggle Header */}
        <div className="flex p-2 bg-gray-50 dark:bg-black/20 m-6 rounded-2xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-primary text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
          >
            Đăng nhập
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-primary text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
          >
            Đăng ký
          </button>
        </div>

        <div className="px-10 pb-12">
          <div className="text-center mb-8">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl icon-filled">
                {isLogin ? 'lock_open' : 'person_add'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {isLogin 
                ? 'Đăng nhập để nhận nhiều ưu đãi hơn từ FreshFarm' 
                : 'Tham gia cộng đồng nông sản sạch ngay hôm nay'}
            </p>
          </div>

          {isLogin ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    type="email" 
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="example@gmail.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Mật khẩu</label>
                  <button type="button" className="text-[10px] font-black text-primary hover:underline">Quên mật khẩu?</button>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-1">
                <input type="checkbox" className="rounded-md border-gray-300 text-primary focus:ring-primary" id="remember" />
                <label htmlFor="remember" className="text-xs font-bold text-gray-500 dark:text-gray-400 cursor-pointer">Ghi nhớ đăng nhập</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-black dark:bg-primary text-white dark:text-black font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? <span className="animate-spin material-symbols-outlined">progress_activity</span> : 'Đăng nhập'}
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Họ và tên</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                  <input 
                    type="text" 
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    type="email" 
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    placeholder="example@gmail.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Mật khẩu</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Nhập lại mật khẩu</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">verified_user</span>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-black dark:bg-primary text-white dark:text-black font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? <span className="animate-spin material-symbols-outlined">progress_activity</span> : 'Tạo tài khoản'}
              </button>
            </form>
          )}

          {/* Social Login Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-green-900"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#1a2e1a] px-4 text-gray-400 font-bold">Hoặc tiếp tục với</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-100 dark:border-green-800 hover:bg-gray-50 dark:hover:bg-green-900/30 transition-all font-bold text-xs">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="size-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-100 dark:border-green-800 hover:bg-gray-50 dark:hover:bg-green-900/30 transition-all font-bold text-xs">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="size-4" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;


import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#102210] border-t border-[#f0f5f0] dark:border-[#2a4a2a] pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-text-main-light dark:text-text-main-dark mb-2">
              <span className="material-symbols-outlined text-3xl text-primary icon-filled">eco</span>
              <span className="text-xl font-bold">FreshFarm</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Cung cấp thực phẩm hữu cơ, sạch từ nông trại đến bàn ăn. Vì sức khỏe cộng đồng và nông nghiệp bền vững.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Về chúng tôi</h4>
            <ul className="flex flex-col gap-3 text-gray-500 dark:text-gray-400 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Câu chuyện thương hiệu</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Đội ngũ</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Tuyển dụng</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Hỗ trợ khách hàng</h4>
            <ul className="flex flex-col gap-3 text-gray-500 dark:text-gray-400 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Trung tâm trợ giúp</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Chính sách giao hàng</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Chính sách đổi trả</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Bảo mật thông tin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
            <ul className="flex flex-col gap-3 text-gray-500 dark:text-gray-400 text-sm">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">location_on</span> 123 Đường Xanh, Đà Lạt</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">call</span> 1900 123 456</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">mail</span> hello@freshfarm.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#f0f5f0] dark:border-[#2a4a2a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs text-center md:text-left">© 2024 FreshFarm Organic Market. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">VISA</div>
            <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">MOMO</div>
            <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">COD</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

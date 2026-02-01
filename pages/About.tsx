
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Organic Farm" 
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Sứ Mệnh <span className="text-primary">Xanh</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed">
            Kết nối con người với nguồn thực phẩm thuần khiết nhất từ mẹ thiên nhiên, mang lại sức khỏe và hạnh phúc cho mọi gia đình Việt.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full z-0 animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop" 
                alt="Farmer" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
            </div>
            <div>
              <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Câu chuyện của chúng tôi</span>
              <h2 className="text-4xl font-black mb-6 leading-tight">Từ một vườn rau nhỏ đến hệ thống nông sản sạch</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                FreshFarm bắt đầu từ niềm đam mê nông nghiệp bền vững của một nhóm kỹ sư trẻ tại Đà Lạt vào năm 2015. Chúng tôi nhận thấy sự thiếu hụt niềm tin vào thực phẩm sạch trên thị trường và quyết tâm thay đổi điều đó.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                Hôm nay, chúng tôi hợp tác với hơn 50 trang trại đạt chuẩn VietGAP và Organic, cung cấp thực phẩm cho hàng ngàn hộ gia đình mỗi tháng với cam kết không bao giờ thỏa hiệp về chất lượng.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background-light dark:bg-gray-800 rounded-3xl">
                  <span className="block text-3xl font-black text-primary">50+</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">Trang trại</span>
                </div>
                <div className="text-center p-4 bg-background-light dark:bg-gray-800 rounded-3xl">
                  <span className="block text-3xl font-black text-primary">10k+</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">Khách hàng</span>
                </div>
                <div className="text-center p-4 bg-background-light dark:bg-gray-800 rounded-3xl">
                  <span className="block text-3xl font-black text-primary">100%</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">Hữu cơ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background-light dark:bg-gray-900/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Giá trị cốt lõi</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: 'spa',
                title: 'Chất lượng tuyệt đối',
                desc: 'Mỗi sản phẩm đều trải qua quy trình kiểm soát 3 lớp trước khi giao đến tay khách hàng.'
              },
              {
                icon: 'auto_awesome_motion',
                title: 'Bền vững',
                desc: 'Chúng tôi ưu tiên phương pháp canh tác không hóa chất, bảo vệ nguồn đất và nước cho thế hệ mai sau.'
              },
              {
                icon: 'visibility',
                title: 'Minh bạch',
                desc: 'Khách hàng có thể truy xuất nguồn gốc, ngày thu hoạch và quy trình chăm sóc của từng loại rau củ.'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1a2e1a] p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-green-800/50 group">
                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined text-4xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm to Table Process */}
      <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-16 text-center">Hành trình từ Trang trại đến Bàn ăn</h2>
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed border-t-2 border-dashed border-primary/30 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: '01', title: 'Canh tác', icon: 'agriculture', desc: 'Sử dụng phân bón hữu cơ, không thuốc trừ sâu.' },
                { step: '02', title: 'Thu hoạch', icon: 'reaping_hook', desc: 'Hái vào sáng sớm để giữ trọn vẹn độ tươi ngon.' },
                { step: '03', title: 'Kiểm soát', icon: 'biotech', desc: 'Kiểm tra dư lượng và đóng gói chuẩn VietGAP.' },
                { step: '04', title: 'Giao hàng', icon: 'delivery_dining', desc: 'Giao siêu tốc 2H trong thùng bảo quản chuyên dụng.' }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="size-20 bg-white dark:bg-green-800 rounded-full border-4 border-primary flex items-center justify-center mb-6 shadow-xl">
                    <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                    <div className="absolute -top-2 -right-2 size-8 bg-black dark:bg-primary rounded-full flex items-center justify-center text-white dark:text-black font-black text-xs">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="text-xl font-black mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto bg-primary rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-96 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">Bắt đầu lối sống lành mạnh ngay hôm nay</h2>
            <p className="text-black/70 text-lg mb-10 max-w-2xl mx-auto font-medium">
              Tham gia cùng cộng đồng FreshFarm để nhận được những ưu đãi đặc biệt và nguồn nông sản sạch nhất mỗi tuần.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-10 py-5 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl"
            >
              Xem Sản Phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

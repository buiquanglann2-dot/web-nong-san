
import { Product, BlogArticle, AppEvent } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cà chua bi hữu cơ',
    price: 39000,
    originalPrice: 52000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop',
    category: 'Rau củ',
    origin: 'Đà Lạt',
    rating: 4.9,
    reviews: 128,
    isVietGap: true,
    description: 'Cà chua bi mọng nước, vị ngọt thanh tự nhiên. Thích hợp để vắt nước uống hàng ngày.',
    reviewsList: [
      {
        id: 'r1',
        userName: 'Trần Thị Hạnh',
        rating: 5,
        comment: 'Cà chua rất tươi, ngọt và mọng nước. Đóng gói rất cẩn thận.',
        date: '15/10/2023'
      }
    ]
  },
  {
    id: '2',
    name: 'Súp lơ xanh',
    price: 15000,
    originalPrice: 25000,
    unit: '1 bắp (~400g)',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 95,
    isVietGap: true,
    reviewsList: []
  },
  {
    id: '3',
    name: 'Khoai lang mật',
    price: 20000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Lâm Đồng',
    rating: 4.7,
    reviews: 210,
    reviewsList: []
  },
  {
    id: '4',
    name: 'Cam sành hữu cơ',
    price: 35000,
    originalPrice: 53000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Vĩnh Long',
    rating: 4.8,
    reviews: 128,
    isVietGap: true,
    isNew: true,
    reviewsList: []
  },
  {
    id: '5',
    name: 'Cải thìa baby',
    price: 18000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Đà Lạt',
    rating: 4.6,
    reviews: 42,
    isVietGap: true
  },
  {
    id: '6',
    name: 'Bắp cải tím',
    price: 32000,
    unit: '1 cái (~800g)',
    image: 'https://images.unsplash.com/photo-1611574547214-e5883833d772?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Đà Lạt',
    rating: 4.7,
    reviews: 56
  },
  {
    id: '7',
    name: 'Cà rốt hữu cơ',
    price: 25000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Lâm Đồng',
    rating: 4.9,
    reviews: 89,
    isVietGap: true
  },
  {
    id: '8',
    name: 'Dưa leo baby',
    price: 28000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đà Lạt',
    rating: 4.5,
    reviews: 67
  },
  {
    id: '9',
    name: 'Ớt chuông đỏ',
    price: 35000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1588722744386-89689f506456?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 34,
    isNew: true
  },
  {
    id: '10',
    name: 'Bơ sáp 034',
    price: 65000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Bảo Lộc',
    rating: 4.9,
    reviews: 156,
    isVietGap: true
  },
  {
    id: '11',
    name: 'Xoài cát Hòa Lộc',
    price: 85000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Tiền Giang',
    rating: 5.0,
    reviews: 203
  },
  {
    id: '12',
    name: 'Chuối già Nam Mỹ',
    price: 22000,
    unit: '1 nải',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Đồng Nai',
    rating: 4.7,
    reviews: 78
  },
  {
    id: '13',
    name: 'Nấm đùi gà',
    price: 45000,
    unit: '300g',
    image: 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 55,
    isVietGap: true
  },
  {
    id: '14',
    name: 'Nấm kim châm',
    price: 15000,
    unit: '150g',
    image: 'https://images.unsplash.com/photo-1512429234300-1c0130f14660?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Việt Nam',
    rating: 4.6,
    reviews: 92
  },
  {
    id: '15',
    name: 'Tỏi cô đơn',
    price: 120000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Lý Sơn',
    rating: 5.0,
    reviews: 45
  },
  {
    id: '16',
    name: 'Bí đỏ hồ lô',
    price: 25000,
    unit: '1 quả (~1kg)',
    image: 'https://images.unsplash.com/photo-1506807803488-8eafc15316c7?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Gia Lai',
    rating: 4.7,
    reviews: 63
  },
  {
    id: '17',
    name: 'Khoai tây Đà Lạt',
    price: 30000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 112,
    isVietGap: true
  },
  {
    id: '18',
    name: 'Rau muống hữu cơ',
    price: 12000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Hồ Chí Minh',
    rating: 4.5,
    reviews: 156
  },
  {
    id: '19',
    name: 'Mướp hương',
    price: 20000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Long An',
    rating: 4.6,
    reviews: 48
  },
  {
    id: '20',
    name: 'Đậu cove Nhật',
    price: 35000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1550411294-b3b1bd5fce12?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Đà Lạt',
    rating: 4.7,
    reviews: 39,
    isNew: true
  },
  {
    id: '21',
    name: 'Thanh long ruột đỏ',
    price: 40000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Bình Thuận',
    rating: 4.8,
    reviews: 84
  },
  {
    id: '22',
    name: 'Bưởi da xanh',
    price: 55000,
    unit: '1 quả (~1.2kg)',
    image: 'https://images.unsplash.com/photo-1550506389-1981e4b9745e?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Bến Tre',
    rating: 4.9,
    reviews: 120
  },
  {
    id: '23',
    name: 'Nho xanh Ninh Thuận',
    price: 75000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369b40189?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Ninh Thuận',
    rating: 4.7,
    reviews: 95
  },
  {
    id: '24',
    name: 'Dưa hấu không hạt',
    price: 18000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Long An',
    rating: 4.6,
    reviews: 134
  },
  {
    id: '25',
    name: 'Chanh không hạt',
    price: 25000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Hậu Giang',
    rating: 4.8,
    reviews: 58
  },
  {
    id: '26',
    name: 'Gừng sẻ hữu cơ',
    price: 60000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Đắk Lắk',
    rating: 4.9,
    reviews: 27
  },
  {
    id: '27',
    name: 'Hành tây trắng',
    price: 22000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đà Lạt',
    rating: 4.5,
    reviews: 81
  },
  {
    id: '28',
    name: 'Cần tây hữu cơ',
    price: 45000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1597839384406-8d0092994982?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 44,
    isVietGap: true
  },
  {
    id: '29',
    name: 'Cà tím organic',
    price: 20000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đồng Tháp',
    rating: 4.7,
    reviews: 36
  },
  {
    id: '30',
    name: 'Bắp Mỹ ngọt',
    price: 15000,
    unit: '1 quả',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Gia Lai',
    rating: 4.9,
    reviews: 168
  },
  {
    id: '31',
    name: 'Khoai môn sáp',
    price: 45000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Đồng Tháp',
    rating: 4.8,
    reviews: 52
  },
  {
    id: '32',
    name: 'Măng tây baby',
    price: 65000,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1515471204579-28400df75077?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Ninh Thuận',
    rating: 4.9,
    reviews: 31,
    isNew: true
  },
  {
    id: '33',
    name: 'Rau tần ô',
    price: 15000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Hồ Chí Minh',
    rating: 4.6,
    reviews: 62
  },
  {
    id: '34',
    name: 'Khổ qua rừng',
    price: 55000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?q=80&w=800&auto=format&fit=crop',
    category: 'Củ quả',
    origin: 'Bình Phước',
    rating: 4.7,
    reviews: 29
  },
  {
    id: '35',
    name: 'Nấm đùi gà baby',
    price: 40000,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Đà Lạt',
    rating: 4.8,
    reviews: 41
  },
  {
    id: '36',
    name: 'Hành tím Vĩnh Châu',
    price: 45000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Sóc Trăng',
    rating: 5.0,
    reviews: 88
  },
  {
    id: '37',
    name: 'Dưa lưới Huỳnh Long',
    price: 95000,
    unit: '1 quả (~1.5kg)',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Long An',
    rating: 4.9,
    reviews: 142,
    isNew: true
  },
  {
    id: '38',
    name: 'Vú sữa Lò Rèn',
    price: 65000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Tiền Giang',
    rating: 4.8,
    reviews: 77
  },
  {
    id: '39',
    name: 'Sầu riêng Ri6',
    price: 150000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Bến Tre',
    rating: 5.0,
    reviews: 256,
    isVietGap: true
  },
  {
    id: '40',
    name: 'Táo Ninh Thuận',
    price: 35000,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Ninh Thuận',
    rating: 4.6,
    reviews: 110
  },
  {
    id: '41',
    name: 'Nghệ tươi hữu cơ',
    price: 30000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Gia Lai',
    rating: 4.7,
    reviews: 19
  },
  {
    id: '42',
    name: 'Sả chanh',
    price: 15000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop',
    category: 'Nấm & Gia vị',
    origin: 'Long An',
    rating: 4.5,
    reviews: 64
  },
  {
    id: '43',
    name: 'Rau dền đỏ',
    price: 10000,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    category: 'Rau xanh',
    origin: 'Hồ Chí Minh',
    rating: 4.4,
    reviews: 32
  },
  {
    id: '44',
    name: 'Lê Hàn Quốc',
    price: 85000,
    unit: '1 quả (~400g)',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop',
    category: 'Trái cây',
    origin: 'Nhập khẩu',
    rating: 4.9,
    reviews: 94
  }
];

export const EVENTS: AppEvent[] = [
  {
    id: 'e1',
    title: 'Workshop: Nấu ăn thực dưỡng',
    date: '15/11/2024',
    location: 'Chi nhánh Quận 1, TP.HCM',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    description: 'Học cách chế biến các món ăn từ rau củ hữu cơ để giữ trọn vẹn dinh dưỡng.',
    tag: 'Workshop'
  },
  {
    id: 'e2',
    title: 'Tour tham quan nông trại Đà Lạt',
    date: '20/11/2024',
    location: 'Farm Fresh 1, Đà Lạt',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop',
    description: 'Trải nghiệm thu hoạch rau quả tận vườn và thưởng thức tiệc BBQ ngoài trời.',
    tag: 'Farm Tour'
  },
  {
    id: 'e3',
    title: 'Ngày hội sống xanh 2024',
    date: '05/12/2024',
    location: 'Công viên Gia Định, TP.HCM',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    description: 'Trao đổi đồ cũ, mua sắm nông sản sạch và các sản phẩm thân thiện môi trường.',
    tag: 'Lễ hội'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'b1',
    title: 'Hành trình Rau Sạch tại Đà Lạt: Từ Đất Mẹ Đến Bữa Cơm Nhà',
    excerpt: 'Theo chân chúng tôi đến thăm nông trại đối tác tại Đà Lạt, nơi quy trình canh tác hữu cơ được thực hiện nghiêm ngặt.',
    category: 'Câu chuyện nông trại',
    author: 'Minh Anh',
    date: '12 Tháng 10, 2023',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  }
];

-- Create products table
create table public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  unit text not null,
  image text not null,
  category text not null,
  origin text not null,
  rating numeric default 0,
  reviews integer default 0,
  is_viet_gap boolean default false,
  is_new boolean default false,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access" on public.products for select using (true);

-- Insert initial data
insert into public.products (id, name, price, original_price, unit, image, category, origin, rating, reviews, is_viet_gap, is_new, description)
values
  ('1', 'Cà chua bi hữu cơ', 39000, 52000, '500g', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop', 'Rau củ', 'Đà Lạt', 4.9, 128, true, false, 'Cà chua bi mọng nước, vị ngọt thanh tự nhiên. Thích hợp để vắt nước uống hàng ngày.'),
  ('2', 'Súp lơ xanh', 15000, 25000, '1 bắp (~400g)', 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Đà Lạt', 4.8, 95, true, false, null),
  ('3', 'Khoai lang mật', 20000, null, '1kg', 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Lâm Đồng', 4.7, 210, false, false, null),
  ('4', 'Cam sành hữu cơ', 35000, 53000, '1kg', 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Vĩnh Long', 4.8, 128, true, true, null),
  ('5', 'Cải thìa baby', 18000, null, '500g', 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Đà Lạt', 4.6, 42, true, false, null),
  ('6', 'Bắp cải tím', 32000, null, '1 cái (~800g)', 'https://images.unsplash.com/photo-1611574547214-e5883833d772?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Đà Lạt', 4.7, 56, false, false, null),
  ('7', 'Cà rốt hữu cơ', 25000, null, '1kg', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Lâm Đồng', 4.9, 89, true, false, null),
  ('8', 'Dưa leo baby', 28000, null, '500g', 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đà Lạt', 4.5, 67, false, false, null),
  ('9', 'Ớt chuông đỏ', 35000, null, '500g', 'https://images.unsplash.com/photo-1588722744386-89689f506456?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đà Lạt', 4.8, 34, false, true, null),
  ('10', 'Bơ sáp 034', 65000, null, '1kg', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Bảo Lộc', 4.9, 156, true, false, null),
  ('11', 'Xoài cát Hòa Lộc', 85000, null, '1kg', 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Tiền Giang', 5.0, 203, false, false, null),
  ('12', 'Chuối già Nam Mỹ', 22000, null, '1 nải', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Đồng Nai', 4.7, 78, false, false, null),
  ('13', 'Nấm đùi gà', 45000, null, '300g', 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Đà Lạt', 4.8, 55, true, false, null),
  ('14', 'Nấm kim châm', 15000, null, '150g', 'https://images.unsplash.com/photo-1512429234300-1c0130f14660?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Việt Nam', 4.6, 92, false, false, null),
  ('15', 'Tỏi cô đơn', 120000, null, '500g', 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Lý Sơn', 5.0, 45, false, false, null),
  ('16', 'Bí đỏ hồ lô', 25000, null, '1 quả (~1kg)', 'https://images.unsplash.com/photo-1506807803488-8eafc15316c7?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Gia Lai', 4.7, 63, false, false, null),
  ('17', 'Khoai tây Đà Lạt', 30000, null, '1kg', 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đà Lạt', 4.8, 112, true, false, null),
  ('18', 'Rau muống hữu cơ', 12000, null, '500g', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Hồ Chí Minh', 4.5, 156, false, false, null),
  ('19', 'Mướp hương', 20000, null, '1kg', 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Long An', 4.6, 48, false, false, null),
  ('20', 'Đậu cove Nhật', 35000, null, '500g', 'https://images.unsplash.com/photo-1550411294-b3b1bd5fce12?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Đà Lạt', 4.7, 39, false, true, null),
  ('21', 'Thanh long ruột đỏ', 40000, null, '1kg', 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Bình Thuận', 4.8, 84, false, false, null),
  ('22', 'Bưởi da xanh', 55000, null, '1 quả (~1.2kg)', 'https://images.unsplash.com/photo-1550506389-1981e4b9745e?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Bến Tre', 4.9, 120, false, false, null),
  ('23', 'Nho xanh Ninh Thuận', 75000, null, '1kg', 'https://images.unsplash.com/photo-1537640538966-79f369b40189?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Ninh Thuận', 4.7, 95, false, false, null),
  ('24', 'Dưa hấu không hạt', 18000, null, '1kg', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Long An', 4.6, 134, false, false, null),
  ('25', 'Chanh không hạt', 25000, null, '1kg', 'https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Hậu Giang', 4.8, 58, false, false, null),
  ('26', 'Gừng sẻ hữu cơ', 60000, null, '500g', 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Đắk Lắk', 4.9, 27, false, false, null),
  ('27', 'Hành tây trắng', 22000, null, '1kg', 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đà Lạt', 4.5, 81, false, false, null),
  ('28', 'Cần tây hữu cơ', 45000, null, '500g', 'https://images.unsplash.com/photo-1597839384406-8d0092994982?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Đà Lạt', 4.8, 44, true, false, null),
  ('29', 'Cà tím organic', 20000, null, '500g', 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đồng Tháp', 4.7, 36, false, false, null),
  ('30', 'Bắp Mỹ ngọt', 15000, null, '1 quả', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Gia Lai', 4.9, 168, false, false, null),
  ('31', 'Khoai môn sáp', 45000, null, '1kg', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Đồng Tháp', 4.8, 52, false, false, null),
  ('32', 'Măng tây baby', 65000, null, '250g', 'https://images.unsplash.com/photo-1515471204579-28400df75077?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Ninh Thuận', 4.9, 31, false, true, null),
  ('33', 'Rau tần ô', 15000, null, '500g', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Hồ Chí Minh', 4.6, 62, false, false, null),
  ('34', 'Khổ qua rừng', 55000, null, '500g', 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?q=80&w=800&auto=format&fit=crop', 'Củ quả', 'Bình Phước', 4.7, 29, false, false, null),
  ('35', 'Nấm đùi gà baby', 40000, null, '250g', 'https://images.unsplash.com/photo-1628151474939-952467d5e16b?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Đà Lạt', 4.8, 41, false, false, null),
  ('36', 'Hành tím Vĩnh Châu', 45000, null, '1kg', 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Sóc Trăng', 5.0, 88, false, false, null),
  ('37', 'Dưa lưới Huỳnh Long', 95000, null, '1 quả (~1.5kg)', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Long An', 4.9, 142, false, true, null),
  ('38', 'Vú sữa Lò Rèn', 65000, null, '1kg', 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Tiền Giang', 4.8, 77, false, false, null),
  ('39', 'Sầu riêng Ri6', 150000, null, '1kg', 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Bến Tre', 5.0, 256, true, false, null),
  ('40', 'Táo Ninh Thuận', 35000, null, '1kg', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Ninh Thuận', 4.6, 110, false, false, null),
  ('41', 'Nghệ tươi hữu cơ', 30000, null, '500g', 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Gia Lai', 4.7, 19, false, false, null),
  ('42', 'Sả chanh', 15000, null, '500g', 'https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=800&auto=format&fit=crop', 'Nấm & Gia vị', 'Long An', 4.5, 64, false, false, null),
  ('43', 'Rau dền đỏ', 10000, null, '500g', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', 'Rau xanh', 'Hồ Chí Minh', 4.4, 32, false, false, null),
  ('44', 'Lê Hàn Quốc', 85000, null, '1 quả (~400g)', 'https://images.unsplash.com/photo-1611080626919-7cf5a9caab5b?q=80&w=800&auto=format&fit=crop', 'Trái cây', 'Nhập khẩu', 4.9, 94, false, false, null);

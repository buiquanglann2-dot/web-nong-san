
export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  category: string;
  origin: string;
  rating: number;
  reviews: number;
  reviewsList?: Review[];
  isNew?: boolean;
  isVietGap?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  authorAvatar: string;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  tag: string;
}

export enum Page {
  Home = 'home',
  Products = 'products',
  ProductDetail = 'product-detail',
  Cart = 'cart',
  Blog = 'blog'
}

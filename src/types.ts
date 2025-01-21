export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[]; // Array of image URLs
  stock: number;
  ratings: number; // Rating out of 5
}

export interface OrderItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  ratings: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  shippingPrice: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetails {
  email: string;
  items_IDs: string;
  totalPrice: number;
  shippingPrice: number;
}
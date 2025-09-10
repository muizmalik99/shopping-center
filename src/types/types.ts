export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string | null;
  rating?: number;
  reviews?: number;
  stock?: number;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutRequest {
  name: string;
  email: string;
  address: string;
  contact: string;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}
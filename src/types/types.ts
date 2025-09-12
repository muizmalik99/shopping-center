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
export type SortKey = "name" | "price-low" | "price-high";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: number; name: string; price: number; image: string }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  total: number;
}

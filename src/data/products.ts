export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export const seedProducts: Product[] = [
  {
    id: "1",
    name: "Man T-shirt",
    price: 30,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Comfortable and stylish t-shirt for men",
    rating: 4.5,
    reviews: 128
  },
  {
    id: "2",
    name: "Man Shirt",
    price: 30,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Elegant formal shirt for professional look",
    rating: 4.3,
    reviews: 95
  },
  {
    id: "3",
    name: "Woman Scarf",
    price: 30,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Beautiful and warm scarf for women",
    rating: 4.7,
    reviews: 156
  },
  {
    id: "4",
    name: "Woman Dress",
    price: 45,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Elegant dress for special occasions",
    rating: 4.6,
    reviews: 89
  },
  {
    id: "5",
    name: "Sneakers",
    price: 60,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    category: "fashion",
    description: "Comfortable and stylish sneakers",
    rating: 4.4,
    reviews: 203
  },
  {
    id: "6",
    name: "Laptop",
    price: 100,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    category: "electronic",
    description: "High-performance laptop for work and gaming",
    rating: 4.8,
    reviews: 342
  },
  {
    id: "7",
    name: "Mobile",
    price: 100,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Latest smartphone with advanced features",
    rating: 4.6,
    reviews: 267
  },
  {
    id: "8",
    name: "Computers",
    price: 100,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Powerful desktop computers for professionals",
    rating: 4.7,
    reviews: 189
  },
  {
    id: "9",
    name: "Headphones",
    price: 80,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "electronic",
    description: "High-quality wireless headphones",
    rating: 4.5,
    reviews: 156
  },
  {
    id: "10",
    name: "Smartwatch",
    price: 120,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "electronic",
    description: "Feature-rich smartwatch for fitness tracking",
    rating: 4.4,
    reviews: 98
  },
  {
    id: "11",
    name: "Jumkas",
    price: 100,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Traditional Indian earrings for special occasions",
    rating: 4.6,
    reviews: 134
  },
  {
    id: "12",
    name: "Necklaces",
    price: 100,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Elegant necklaces to enhance your beauty",
    rating: 4.5,
    reviews: 87
  },
  {
    id: "13",
    name: "Kangans",
    price: 100,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Beautiful bangles for traditional look",
    rating: 4.3,
    reviews: 112
  },
  {
    id: "14",
    name: "Rings",
    price: 150,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Stunning rings for special moments",
    rating: 4.7,
    reviews: 76
  },
  {
    id: "15",
    name: "Bracelets",
    price: 80,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    category: "jewellery",
    description: "Elegant bracelets for daily wear",
    rating: 4.4,
    reviews: 93
  }
];

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return seedProducts;
  try {
    const userRaw = localStorage.getItem("userProducts");
    const userProducts: Product[] = userRaw ? JSON.parse(userRaw) : [];
    return [...userProducts, ...seedProducts];
  } catch {
    return seedProducts;
  }
}

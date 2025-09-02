export interface HomeProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const fashionProducts: HomeProduct[] = [
  {
    id: '1',
    name: 'Man T-shirt',
    price: 30,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    description: 'Comfortable and stylish t-shirt for men'
  },
  {
    id: '2',
    name: 'Man Shirt',
    price: 30,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
    description: 'Elegant formal shirt for professional look'
  },
  {
    id: '3',
    name: 'Woman Scarf',
    price: 30,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    description: 'Beautiful and warm scarf for women'
  }
];

export const electronicProducts: HomeProduct[] = [
  {
    id: '4',
    name: 'Laptop',
    price: 100,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    description: 'High-performance laptop for work and gaming'
  },
  {
    id: '5',
    name: 'Mobile',
    price: 100,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    description: 'Latest smartphone with advanced features'
  },
  {
    id: '6',
    name: 'Computers',
    price: 100,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'Powerful desktop computers for professionals'
  }
];

export const jewelleryProducts: HomeProduct[] = [
  {
    id: '7',
    name: 'Jumkas',
    price: 100,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop',
    description: 'Traditional Indian earrings for special occasions'
  },
  {
    id: '8',
    name: 'Necklaces',
    price: 100,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    description: 'Elegant necklaces to enhance your beauty'
  },
  {
    id: '9',
    name: 'Kangans',
    price: 100,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
    description: 'Beautiful bangles for traditional look'
  }
];

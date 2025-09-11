import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Men's T-Shirt",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Comfortable and stylish t-shirt for men",
        rating: 4.5,
        reviews: 128,
      },
      {
        name: "Men's Shirt",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Elegant formal shirt for professional look",
        rating: 4.3,
        reviews: 95,
      },
      {
        name: "Women's Scarf",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Beautiful and warm scarf for women",
        rating: 4.7,
        reviews: 156,
      },
      {
        name: "Women's Dress",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Elegant dress for special occasions",
        rating: 4.6,
        reviews: 89,
      },
      {
        name: "Sneakers",
        price: 60,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Comfortable and stylish sneakers",
        rating: 4.4,
        reviews: 203,
      },
      {
        name: "Laptop",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        category: "electronic",
        description: "High-performance laptop for work and gaming",
        rating: 4.8,
        reviews: 342,
      },
      {
        name: "Smartphone",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        category: "electronic",
        description: "Latest smartphone with advanced features",
        rating: 4.6,
        reviews: 267,
      },
      {
        name: "Desktop Computer",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        category: "electronic",
        description: "Powerful desktop computers for professionals",
        rating: 4.7,
        reviews: 189,
      },
      {
        name: "Headphones",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "electronic",
        description: "High-quality wireless headphones",
        rating: 4.5,
        reviews: 156,
      },
      {
        name: "Smartwatch",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "electronic",
        description: "Feature-rich smartwatch for fitness tracking",
        rating: 4.4,
        reviews: 98,
      },
      {
        name: "Earrings",
        price: 100,
        image:
          "https://meerzah.pk/cdn/shop/files/en-554..jpg?v=1702126736&width=1040",
        category: "jewellery",
        description: "Traditional Indian earrings for special occasions",
        rating: 4.6,
        reviews: 134,
      },
      {
        name: "Necklaces",
        price: 100,
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
        category: "jewellery",
        description: "Elegant necklaces to enhance your beauty",
        rating: 4.5,
        reviews: 87,
      },
      {
        name: "Bangle",
        price: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMpF-Hip6QStAbU73IjH2rL8hBYEBoAVxYg&s",
        category: "jewellery",
        description: "Beautiful bangles for traditional look",
        rating: 4.3,
        reviews: 112,
      },
      {
        name: "Rings",
        price: 150,
        image:
          "https://t4.ftcdn.net/jpg/00/71/67/87/360_F_71678766_kPinbw5YXRSJrlwwT8SmA90TgjBu64Ng.jpg",
        category: "jewellery",
        description: "Stunning rings for special moments",
        rating: 4.7,
        reviews: 76,
      },
      {
        name: "Bracelet",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=300&fit=crop",
        category: "jewellery",
        description: "Elegant bracelets for daily wear",
        rating: 4.4,
        reviews: 93,
      },
    ],
  });
}

main()
  .then(() => console.log("Database seeded!"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

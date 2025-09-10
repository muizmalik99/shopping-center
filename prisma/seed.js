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
          "data:image/jpeg;base64,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",
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

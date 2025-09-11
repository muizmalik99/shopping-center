import { prisma } from "@/lib/prisma";
import { Product } from "@/types/types";

// Server-side data fetching functions for static generation

export async function getProductsServer(params?: { tag?: string }): Promise<Product[]> {
  try {
    let products;
    
    if (params?.tag === "best-sellers") {
      products = await prisma.product.findMany({
        orderBy: { reviews: "desc" },
        take: 12,
      });
    } else if (params?.tag === "offers") {
      products = await prisma.product.findMany({
        orderBy: { price: "asc" },
        take: 12,
      });
    } else {
      products = await prisma.product.findMany({
        orderBy: { id: "desc" },
      });
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductServer(id: number | string): Promise<Product | null> {
  try {
    const productId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (isNaN(productId)) {
      return null;
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getAllProductIds(): Promise<number[]> {
  try {
    const products = await prisma.product.findMany({
      select: { id: true },
      orderBy: { id: "desc" }
    });
    
    return products.map(product => product.id);
  } catch (error) {
    console.error("Error fetching product IDs:", error);
    return [];
  }
}

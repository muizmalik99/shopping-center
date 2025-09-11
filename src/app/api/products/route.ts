import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");

  let products;
  if (tag === "best-sellers") {
    products = await prisma.product.findMany({
      orderBy: { reviews: "desc" },
      take: 12,
    });
  } else if (tag === "offers") {
    products = await prisma.product.findMany({
      orderBy: { price: "asc" },
      take: 12,
    });
  } else {
    products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
  }

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, image, category, description } = body;

    if (!name || !price || !image || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const created = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
        category,
        description,
        rating: 0,
        reviews: 0,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

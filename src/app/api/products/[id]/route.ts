import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: Params) {
  const idString = params.id;
  const id = Number(idString);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

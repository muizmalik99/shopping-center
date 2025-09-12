import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNumber = Number(id);

  if (Number.isNaN(idNumber)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: idNumber } });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

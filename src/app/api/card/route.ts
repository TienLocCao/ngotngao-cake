import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, sizeId, quantity } = await req.json();

  const existing = await prisma.cartItem.findFirst({
    where: {
      userId: session.user.id,
      cakeId: productId,
      sizeId: sizeId || undefined,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        cakeId: productId,
        sizeId: sizeId || undefined,
        quantity,
      },
    });
  }

  return NextResponse.json({ success: true });
}

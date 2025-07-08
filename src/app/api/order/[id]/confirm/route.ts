import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const updated = await prisma.order.update({
      where: { id },
      data: { status: 'paid' }, // hoặc 'completed', tuỳ logic
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error('Update payment status error:', err);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

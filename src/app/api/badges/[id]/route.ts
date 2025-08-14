// app/api/badge/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Lấy badge theo ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const badge = await prisma.badge.findUnique({
      where: { id: Number(params.id) },
    });

    if (!badge) {
      return NextResponse.json({ error: 'Không tìm thấy badge' }, { status: 404 });
    }

    return NextResponse.json(badge);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lấy badge' }, { status: 500 });
  }
}

// PUT - Cập nhật badge
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name } = body;

    const existingBadge = await prisma.badge.findFirst({
      where: {
        name: name.trim(),
        id: { not: Number(id) }, 
      },
    });

    if (existingBadge) {
      return NextResponse.json({ error: 'Badge đã tồn tại' }, { status: 400 });
    }

    const updatedBadge = await prisma.badge.update({
      where: { id: Number(id) },
      data: { name: name.trim() },
    });

    return NextResponse.json(updatedBadge);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể cập nhật badge' }, { status: 500 });
  }
}

// DELETE - Xóa badge
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.badge.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: 'Xóa thành công' });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa badge' }, { status: 500 });
  }
}

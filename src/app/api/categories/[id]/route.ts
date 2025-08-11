// app/api/category/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Lấy category theo ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json({ error: 'Không tìm thấy category' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lấy category' }, { status: 500 });
  }
}

// PUT - Cập nhật category
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name } = body;

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name.trim(),
        id: { not: id }, 
      },
    });

    if (existingCategory) {
      return NextResponse.json({ error: 'Category đã tồn tại' }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: { name: name.trim() },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể cập nhật category' }, { status: 500 });
  }
}

// DELETE - Xóa category
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Xóa thành công' });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa category' }, { status: 500 });
  }
}

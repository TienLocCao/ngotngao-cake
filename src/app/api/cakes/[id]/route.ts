// app/api/category/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name, description, fullDescription, imageUrl, price, categoryId, badgeId, sizes } = body;

    // Check duplicate name (khác chính nó)
    const existingCake = await prisma.cake.findFirst({
      where: {
        name: name.trim(),
        NOT: { id: params.id },
      },
    });
    if (existingCake) {
      return NextResponse.json({ error: 'Cake name already exists' }, { status: 400 });
    }

    // Check duplicate sizeLabel
    if (sizes && sizes.length > 0) {
      const labels = sizes.map((s: any) => s.sizeLabel.toLowerCase());
      if (new Set(labels).size !== labels.length) {
        return NextResponse.json({ error: 'Duplicate size labels are not allowed' }, { status: 400 });
      }
    }

    // Update cake
    const updatedCake = await prisma.cake.update({
      where: { id: params.id },
      data: {
        name,
        description,
        fullDescription,
        imageUrl,
        price,
        categoryId,
        badgeId: badgeId || null,
        sizes: {
          deleteMany: {}, // Xóa toàn bộ sizes cũ
          create: sizes.map((size: any) => ({
            sizeLabel: size.sizeLabel,
            servings: size.servings,
            price: size.price,
          })),
        },
      },
      include: {
        sizes: true,
        category: true,
        badge: true,
      },
    });

    return NextResponse.json(updatedCake);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update cake' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if cake exists
    const cake = await prisma.cake.findUnique({
      where: { id: params.id },
      include: { sizes: true },
    });

    if (!cake) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }

    // Delete cake (sizes will be deleted automatically if you set `onDelete: Cascade` in schema)
    await prisma.cake.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Cake deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete cake' }, { status: 500 });
  }
}

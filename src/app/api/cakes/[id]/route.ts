import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // 👈 phải await

    const body = await req.json();
    const { name, description, fullDescription, image, imageUrl, price, categoryId, badgeId, sizes } = body;

    // Check duplicate name
    const existingCake = await prisma.cake.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        NOT: { id },
      },
    });

    if (existingCake) {
      return NextResponse.json({ error: 'Cake name already exists' }, { status: 400 });
    }

    // Check duplicate sizeLabel
    if (sizes && sizes.length > 0) {
      const labels = sizes.map((s: any) => s.sizeLabel.toLowerCase().trim());
      if (new Set(labels).size !== labels.length) {
        return NextResponse.json({ error: 'Duplicate size labels are not allowed' }, { status: 400 });
      }
    }

    const updatedCake = await prisma.cake.update({
      where: { id },
      data: {
        name: name.trim(),
        description,
        fullDescription,
        imageUrl: image || imageUrl || null,
        price,
        categoryId,
        badgeId: badgeId || null,
        sizes: sizes
          ? {
              deleteMany: {},
              create: sizes.map((size: any) => ({
                sizeLabel: size.sizeLabel.trim(),
                servings: size.servings,
                price: size.price,
              })),
            }
          : undefined,
      },
      include: { sizes: true, category: true, badge: true },
    });

    return NextResponse.json(updatedCake);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update cake' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const cake = await prisma.cake.findUnique({
      where: { id },
      include: { sizes: true },
    });

    if (!cake) {
      return NextResponse.json({ error: "Cake not found" }, { status: 404 });
    }

    // Xoá file ảnh
    if (cake.imageUrl) {
      const fileName = cake.imageUrl.replace(/^\/?uploads\//, "");
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("File not found:", filePath);
      }
    }

    // Nếu chưa set onDelete: Cascade → xoá sizes thủ công
    await prisma.cakeSize.deleteMany({ where: { cakeId: id } });

    // Xoá cake
    await prisma.cake.delete({ where: { id } });

    return NextResponse.json({ message: "Cake deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete cake" }, { status: 500 });
  }
}

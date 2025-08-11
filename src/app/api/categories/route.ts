// app/api/category/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Lấy tất cả category
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageParam =searchParams.get('page');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';

    console.log("Fetching all categories");

    

    const where: any = {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    };
    let orderBy = {};
    orderBy = { name: 'asc' };
    
    if (pageParam === 'all') {
      const category = await prisma.category.findMany({ where, orderBy });
      return NextResponse.json({ items: category, total: category.length });
    }
    const page = parseInt(pageParam || '1');
    const skip = (page - 1) * limit;
    
    const [category, total] = await Promise.all([
      prisma.category.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.category.count({ where }),
    ]);

    // return NextResponse.json(categories);
    return NextResponse.json({ items: category, total });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// POST - Tạo mới category
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Tên category là bắt buộc' }, { status: 400 });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name.trim(),
      },
    });
    if (existingCategory) {
      return NextResponse.json({ error: 'Category đã tồn tại' }, { status: 400 });
    }


    const newCategory = await prisma.category.create({
      data: {
        id: crypto.randomUUID(),
        name: name.trim(),
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể tạo category' }, { status: 500 });
  }
}

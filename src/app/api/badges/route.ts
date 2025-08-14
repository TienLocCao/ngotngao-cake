// app/api/badge/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Lấy tất cả badge
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageParam =searchParams.get('page');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';

    console.log("Fetching all badges");

    

    const where: any = {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    };
    let orderBy = {};
    orderBy = { name: 'asc' };
    
    if (pageParam === 'all') {
      const badge = await prisma.badge.findMany({ where, orderBy });
      return NextResponse.json({ items: badge, total: badge.length });
    }
    const page = parseInt(pageParam || '1');
    const skip = (page - 1) * limit;
    
    const [badge, total] = await Promise.all([
      prisma.badge.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.badge.count({ where }),
    ]);

    // return NextResponse.json(badges);
    return NextResponse.json({ items: badge, total });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch badge' }, { status: 500 });
  }
}

// POST - Tạo mới badge
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Tên badge là bắt buộc' }, { status: 400 });
    }

    const existingBadge = await prisma.badge.findFirst({
      where: {
        name: name.trim(),
      },
    });
    if (existingBadge) {
      return NextResponse.json({ error: 'Badge đã tồn tại' }, { status: 400 });
    }


    const newBadge = await prisma.badge.create({
      data: {
        // id: crypto.randomUUID(),
        name: name.trim(),
      },
    });

    return NextResponse.json(newBadge, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể tạo badge' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const search = searchParams.get('search') || '';
  const categories = searchParams.getAll('category'); // ✅ MULTI
  // const diets = searchParams.getAll('diet');           // ✅ MULTI
  const priceRange = searchParams.get('price') || 'all';
  const sort = searchParams.get('sort') || 'featured';

  const skip = (page - 1) * limit;

  const where: any = {
    title: {
      contains: search,
      mode: 'insensitive',
    },
  };

  // ✅ Multi-category support
  if (categories.length > 0 && !categories.includes('all')) {
    where.category = {
      name: {
        in: categories,
      },
    };
  }

  // ✅ Multi-dietary support
  // if (diets.length > 0) {
  //   where.dietary = {
  //     hasEvery: diets, // Prisma supports string[] if dietary is a string[]
  //   };
  // }

  if (priceRange !== 'all') {
    const priceConditions: Record<string, [number, number]> = {
      under25: [0, 25],
      '25-50': [25, 50],
      '50-100': [50, 100],
      over100: [100, 9999],
    };
    const [min, max] = priceConditions[priceRange];
    where.price = {
      gte: min,
      lt: max,
    };
  }

  let orderBy = {};
  switch (sort) {
    case 'low-to-high':
      orderBy = { price: 'asc' };
      break;
    case 'high-to-low':
      orderBy = { price: 'desc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'best-selling':
      orderBy = { sold: 'desc' };
      break;
    default:
      orderBy = {};
  }

  try {
    const [cakes, total] = await Promise.all([
      prisma.cake.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
          sizes: true,
        },
      }),
      prisma.cake.count({ where }),
    ]);

    return NextResponse.json({ items: cakes, total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch cakes' }, { status: 500 });
  }
}

// [POST] Tạo bánh mới
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, description, imageUrl, categoryId } = body;

//     const newCake = await prisma.cake.create({
//       data: {
//         name,
//         description,
//         imageUrl,
//         categoryId,
//       },
//     });

//     return NextResponse.json(newCake, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create cake' }, { status: 500 });
//   }
// }

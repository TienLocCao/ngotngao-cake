import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Pagination and filtering parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const search = searchParams.get('search') || '';
  const categories = searchParams.getAll('category'); // ✅ MULTI
  // const diets = searchParams.getAll('diet');           // ✅ MULTI
  const priceRange = searchParams.get('price') || 'all';
  const sort = searchParams.get('sort') || 'featured';
  const status = searchParams.get('status') || '';

  const skip = (page - 1) * limit;

  const where: any = {
    name: {
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
  if (status) {
    const badgeMap: Record<string, string> = {
      'best-selling': 'Best Seller',
      'newest': 'New',
    };
    where.badge = {
      name: {
        equals: badgeMap[status],
        mode: 'insensitive',
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
          badge: true,
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      fullDescription,
      imageUrl,
      price,
      categoryId,
      badgeId,
      sizes, // array [{ sizeLabel, servings, price }]
    } = body;

    // Validate required fields
    if (!name || !description || !fullDescription || !imageUrl || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check duplicate name
    const existingCake = await prisma.cake.findFirst({
      where: { name: name.trim() },
    });
    if (existingCake) {
      return NextResponse.json({ error: 'Cake name already exists' }, { status: 400 });
    }

    // Check duplicate sizes in request
    if (sizes && sizes.length > 0) {
      const labels = sizes.map((s: any) => s.sizeLabel.toLowerCase());
      if (new Set(labels).size !== labels.length) {
        return NextResponse.json({ error: 'Duplicate size labels are not allowed' }, { status: 400 });
      }
    }

    // Create cake
    const newCake = await prisma.cake.create({
      data: {
        name: name.trim(),
        description,
        fullDescription,
        imageUrl,
        price,
        categoryId,
        badgeId: badgeId || null,
        sizes: {
          create: sizes?.map((size: any) => ({
            sizeLabel: size.sizeLabel,
            servings: size.servings,
            price: size.price,
          })) || [],
        },
      },
      include: {
        sizes: true,
        category: true,
        badge: true,
      },
    });

    return NextResponse.json(newCake, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create cake' }, { status: 500 });
  }
}

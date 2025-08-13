const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { name: 'Birthday' },
            { name: 'Wedding' },
            { name: 'Custom' },
            { name: 'Cupcakes' },
        ],
    });

    await prisma.badge.createMany({
        data: [
            { name: 'Best Seller' },
            { name: 'New' }
        ]
    });
    // 2. Find one category to link cake to
    const birthdayCategory = await prisma.category.findFirst({ where: { name: 'Birthday' } });
    const weddingCategory = await prisma.category.findFirst({ where: { name: 'Wedding' } });
    const customCategory = await prisma.category.findFirst({ where: { name: 'Custom' } });
    const cupcakesCategory = await prisma.category.findFirst({ where: { name: 'Cupcakes' } });


    const bestSellerBadge = await prisma.badge.findFirst({ where: { name: 'Best Seller' } });
    const newBadge = await prisma.badge.findFirst({ where: { name: 'New' } });

    // 3. Create cake linked to category
    // const cake = await prisma.cake.create({
    //     data: {
    //         name: "Chocolate Dream",
    //         imageUrl:
    //             "https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=13&orientation=squarish",
    //         price: 1000000,
    //         description: "Rich chocolate layers with ganache",
    //         fullDescription: "", categoryId: birthdayCategory.id,
    //         badgeId: bestSellerBadge.id
    //     }
    //     });

    const baseCakes = [
    {
      name: 'Chocolate Dream',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=13&orientation=squarish",
      price: 1000000,
      description: 'Rich chocolate layers with ganache',
    },
    {
      name: 'Red Velvet',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20red%20velvet%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20red%20velvet%20crumbs%20and%20white%20chocolate%20pieces.%20The%20cake%20has%20a%20striking%20red%20color%20and%20elegant%20presentation&width=400&height=400&seq=14&orientation=squarish",
      price: 1000000,
      description: 'Classic red velvet with cream cheese',
    },
    {
      name: 'Strawberry Delight',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20vanilla%20strawberry%20cake%20with%20fresh%20strawberries%20and%20light%20cream%20frosting.%20The%20cake%20features%20layers%20of%20fresh%20fruit%20and%20a%20light%2C%20airy%20texture&width=400&height=400&seq=15&orientation=squarish",
      price: 1000000,
      description: 'Fresh strawberries and cream',
    },
    {
      name: 'Tiramisu Cake',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20tiramisu%20cake%20with%20coffee-soaked%20layers%20and%20mascarpone%20cream%2C%20dusted%20with%20cocoa%20powder.%20The%20cake%20has%20visible%20layers%20and%20an%20elegant%2C%20sophisticated%20appearance&width=400&height=400&seq=16&orientation=squarish",
      price: 1000000,
      description: 'Italian classic with coffee twist',
    },
    {
      name: 'Lemon Blueberry',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20lemon%20blueberry%20cake%20with%20light%20lemon%20buttercream%20frosting%20and%20fresh%20blueberries.%20The%20cake%20has%20a%20bright%2C%20fresh%20appearance%20with%20natural%20decorations&width=400&height=400&seq=17&orientation=squarish",
      price: 1000000,
      description: 'Zesty lemon with fresh blueberries',
    },
    {
      name: 'Carrot Cake',
      imageUrl: "https://readdy.ai/api/search-image?query=A%20carrot%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20chopped%20nuts%20and%20caramel%20drizzle.%20The%20cake%20has%20a%20rustic%2C%20homemade%20appearance%20with%20elegant%20finishing&width=400&height=400&seq=18&orientation=squarish",
      price: 1000000,
      description: 'Classic carrot with cream cheese',
    },
  ];

  const cakes: any[] = [];
  const categories = [
    birthdayCategory,
    weddingCategory,
    customCategory,
    cupcakesCategory,
  ];
  for (let i = 0; i < 90; i++) {
    const base = baseCakes[i % baseCakes.length];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    cakes.push({
      name: `${base.name} ${i + 1}`,
      imageUrl: base.imageUrl,
      price: parseInt(`${Math.floor((Math.random() * 9) + 1)}00000`, 10),
      description: base.description,
      fullDescription: 'This is a seeded full description for cake.',
      categoryId: randomCategory.id,
      badgeId: i % 3 === 0 ? bestSellerBadge?.id : newBadge?.id,
    });
  }

  await prisma.cake.createMany({
    data: cakes,
    skipDuplicates: true,
  });
    // 4. Add sizes to cake
    // 5. Lấy tất cả cake vừa insert
  const allCakes = await prisma.cake.findMany();

    // 6. Gán size cho từng bánh
    const cakeSizes = allCakes.flatMap((cake: any) => [
      {
        cakeId: cake.id,
        sizeLabel: 'Small',
        price: (+cake.price),
        servings: '4-6',
      },
      {
        cakeId: cake.id,
        sizeLabel: 'Medium',
        price: (+cake.price) + 50000,
        servings: '6-8',
      },
      {
        cakeId: cake.id,
        sizeLabel: 'Large',
        price: (+cake.price)+ 100000,
        servings: '8-12',
      },
    ]);

  await prisma.cakeSize.createMany({ data: cakeSizes });

    // 5. Create user
    await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {}, // không update nếu đã có
        create: {
            name: 'Demo User',
            email: 'admin@gmail.com',
            password: '123456', 
        },
        });

    console.log('✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());



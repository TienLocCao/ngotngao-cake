import { prisma } from '@/lib/prisma'; // prisma client
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("1", req.body)
    const body = await req.json();
//   if (req.method !== 'POST') return res.status(405).end();

  const { userId, cartItems, totalPrice, paymentMethod, receiverName, phone, address, province,district,ward } = body;

//   if (!userId || !cartItems || !paymentMethod) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }
    console.log("zô222222", {userId, cartItems, totalPrice, paymentMethod, receiverName, phone, address, province,district,ward})
  try {
    console.log("Bắt đầu tạo đơn hàng");

    // 1. Tạo Order
    const order = await prisma.order.create({
        data: {
            userId: userId || null,
            totalPrice,
            paymentMethod,
            status: 'pending',
            receiverName,
            phone,
            address,
            province,
            district,
            ward,
            items: {
            create: cartItems.map((item: any) => ({
                cakeId: item.id,
                sizeId: item.sizeId,
                quantity: item.quantity,
                price: item.price,
            })),
            },
        },
    });
    console.log("Tạo đơn hàng thành công", order);

    // 2. Xoá cart nếu muốn
    // await prisma.cartItem.deleteMany({
    //   where: { userId },
    // });
     console.log("Đã xóa giỏ hàng");

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

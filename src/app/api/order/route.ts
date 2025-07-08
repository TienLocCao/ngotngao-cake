// /app/api/order/route.ts

import { prisma } from '@/lib/prisma';
import { PaymentMethod } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    userId,
    cartItems,
    totalPrice,
    paymentMethod,
    receiverName,
    phone,
    address,
    province,
    district,
    ward,
  } = body;

  try {
    const order = await prisma.order.create({
      data: {
        ...(userId ? { userId } : {}),
        totalPrice,
        paymentMethod: paymentMethod as PaymentMethod,
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

    return NextResponse.json(
      {
        order,
        paymentInfo:
          paymentMethod === 'bank_transfer'
            ? {
                bankName: 'Vietcombank',
                accountNumber: '0123456789',
                accountName: 'CTY TNHH ABC',
                content: `TT_${order.id}`,
              }
            : null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

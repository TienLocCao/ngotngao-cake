'use client';
import React, { useState } from 'react';
import {
  RiMoneyDollarCircleLine,
  RiBankLine,
  RiWallet3Line,
} from '@remixicon/react';
type PaymentMethod = 'cod' | 'bank_transfer' | 'momo';

interface Props {
  selectedMethod: string;
  setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

const PaymentMethodForm = ({ selectedMethod, setSelectedMethod }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Phương thức thanh toán
      </h2>

      <form className="space-y-4">
        {/* COD */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedMethod === 'cod'}
            onChange={() => setSelectedMethod('cod')}
            className="mt-1 w-5 h-5 text-primary"
          />
          <div>
            <div className="flex items-center space-x-2 font-medium text-gray-800">
              <RiMoneyDollarCircleLine className="text-xl text-green-500" />
              <span>Thanh toán khi giao hàng (COD)</span>
            </div>
            <p className="text-sm text-gray-500">
              Nhận hàng - Kiểm tra hàng - Thanh toán
            </p>
          </div>
        </label>

        {/* Bank Transfer */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="bank_transfer"
            checked={selectedMethod === 'bank_transfer'}
            onChange={() => setSelectedMethod('bank_transfer')}
            className="mt-1 w-5 h-5 text-primary"
          />
          <div>
            <div className="flex items-center space-x-2 font-medium text-gray-800">
              <RiBankLine className="text-xl text-blue-500" />
              <span>Chuyển khoản qua ngân hàng</span>
            </div>
            <p className="text-sm text-gray-500">
              Vui lòng chuyển khoản đến tài khoản ngân hàng được cung cấp sau khi đặt hàng.
            </p>
          </div>
        </label>

        {/* Momo */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={selectedMethod === 'momo'}
            onChange={() => setSelectedMethod('momo')}
            className="mt-1 w-5 h-5 text-primary"
          />
          <div>
            <div className="flex items-center space-x-2 font-medium text-gray-800">
              <RiWallet3Line className="text-xl text-pink-500" />
              <span>Ví MoMo</span>
            </div>
            <p className="text-sm text-gray-500">
              Quét mã QR và thanh toán qua ứng dụng MoMo sau khi xác nhận đơn hàng.
            </p>
          </div>
        </label>
      </form>
    </div>
  );
};

export default PaymentMethodForm;

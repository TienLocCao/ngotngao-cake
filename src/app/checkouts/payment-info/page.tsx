
'use client';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/public/Layout';
const PaymentInfoPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const bankName = searchParams.get('bankName');
  const accountNumber = searchParams.get('accountNumber');
  const accountName = searchParams.get('accountName');
  const content = searchParams.get('content');

  return (
    <Layout>
    <div className="max-w-xl mx-auto py-10 px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Thông tin chuyển khoản</h2>
      <p className="mb-2">Vui lòng chuyển khoản theo thông tin dưới đây để hoàn tất đơn hàng:</p>
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Ngân hàng:</strong> {bankName}</p>
        <p><strong>Số tài khoản:</strong> {accountNumber}</p>
        <p><strong>Tên chủ tài khoản:</strong> {accountName}</p>
        <p><strong>Nội dung chuyển khoản:</strong> <span className="text-red-600">{content}</span></p>
      </div>
      <p className="mt-6 text-sm text-gray-600">Lưu ý: Đơn hàng sẽ được xử lý sau khi chúng tôi nhận được thanh toán.</p>
    </div>
    </Layout>
  );
};

export default PaymentInfoPage;


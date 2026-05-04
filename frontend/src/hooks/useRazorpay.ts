import { useCallback } from 'react';
import { toast } from 'sonner';

interface RazorpayOptions {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerContact: string;
  customerAddress: string;
  items: any[];
}

export const useRazorpay = () => {
  const displayRazorpay = useCallback(async (options: RazorpayOptions) => {
    const res = await fetch('http://localhost:9200/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: 'INR',
        receipt: `receipt_${options.orderId}`,
      }),
    });

    const order = await res.json();

    const razorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SlArglbR0hLNF0',
      amount: order.amount,
      currency: order.currency,
      name: 'AS Fashion',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response: any) => {
        const verifyRes = await fetch('http://localhost:9200/api/orders/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderDetails: {
              orderId: options.orderId,
              customerName: options.customerName,
              customerEmail: options.customerEmail,
              customerPhone: options.customerContact,
              customerAddress: (options as any).customerAddress,
              totalAmount: options.amount,
              items: options.items,
            },
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.status === 'success') {
          toast.success('Payment successful! Order placed.');
          window.location.href = '/'; // Or a success page
        } else {
          toast.error('Payment verification failed.');
        }
      },
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerContact,
      },
      theme: {
        color: '#000000',
      },
    };

    const rzp = new (window as any).Razorpay(razorpayOptions);
    rzp.open();
  }, []);

  return { displayRazorpay };
};

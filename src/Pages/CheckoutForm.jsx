import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const CheckoutForm = ({ booking, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('https://bongo-tour-server.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: booking.price }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [booking.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    console.log(clientSecret);

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      // ✅ update booking
      await fetch(`https://bongo-tour-server.vercel.app/api/bookings/${booking._id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: paymentIntent.id }),
      });

      toast.success('Payment successful!');
      navigate('/tourist-dashboard/my-bookings');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-4 border rounded mb-4" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || !clientSecret}
      >
        Pay ৳{booking.price}
      </button>
    </form>
  );
};

export default CheckoutForm;

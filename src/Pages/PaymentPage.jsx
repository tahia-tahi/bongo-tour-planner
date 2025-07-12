import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

const PaymentPage = () => {
  const booking = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Pay for {booking.packageName}</h2>

      <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} navigate={navigate} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;

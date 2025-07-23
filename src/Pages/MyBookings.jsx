import React, { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/bookings?email=${user.email}`)
        .then(res => {
          setBookings(res.data);
          if (res.data.length >= 3) {
            setShowCongrats(true);
          }
        })
        .catch(err => console.error(err));
    }
  }, [user, axios]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {showCongrats && (
        <>
          <Confetti />
          <motion.div
            className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded shadow mb-6 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            🎉 <strong>Congratulations!</strong> You've booked more than 3 tours. You're an explorer now! 🌍
          </motion.div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((booking, idx) => (
          <div key={idx} className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold">{booking.packageName}</h3>
            <p>Date: {booking.tourDate}</p>
            <p>Price: ${booking.price}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

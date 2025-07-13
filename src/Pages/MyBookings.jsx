import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { useNavigate } from 'react-router';
import Confetti from 'react-confetti';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/bookings?email=${user.email}`);
        const data = await res.json();
        setBookings(data);

        // 🎉 Show confetti if user has more than 3 bookings
        if (data.length > 3) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 6000); // Hide after 6 sec
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure to cancel this booking?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  const handlePay = (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="p-6 overflow-x-auto relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Package</th>
              <th>Guide</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.packageName}</td>
                <td>{b.selectedGuide || 'N/A'}</td>
                <td>{new Date(b.tourDate).toLocaleDateString()}</td>
                <td>৳{b.price}</td>
                <td className="capitalize">{b.status}</td>
                <td>
                  {b.status === 'pending' ? (
                    <>
                      <button
                        className="btn btn-sm btn-success mr-2"
                        onClick={() => handlePay(b._id)}
                      >
                        Pay
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleCancel(b._id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;

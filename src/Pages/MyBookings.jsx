import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { useNavigate } from 'react-router';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/api/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure to cancel this booking?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const handlePay = (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

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
              <td>{b.selectedGuide}</td>
              <td>{new Date(b.tourDate).toLocaleDateString()}</td>
              <td>৳{b.price}</td>
              <td className="capitalize">{b.status}</td>
              <td>
                {b.status === 'pending' && (
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
                )}
                {b.status !== 'pending' && (
                  <span className="text-gray-500">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;

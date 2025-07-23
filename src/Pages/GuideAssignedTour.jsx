import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const GuideAssignedTour = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const res = await axios.get(`/api/assigned-tours?email=${user.email}`);
      setTours(res.data);
    } catch (err) {
      toast.error('Failed to fetch assigned tours',err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTours();
    }
  }, [user]);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`/api/assigned-tours/accept/${id}`);
      toast.success('Tour Accepted');
      fetchTours();
    } catch {
      toast.error('Failed to accept tour');
    }
  };

  const handleReject = async (id) => {
    const confirm = window.confirm('Are you sure you want to reject this tour?');
    if (!confirm) return;

    try {
      await axios.patch(`/api/assigned-tours/reject/${id}`);
      toast.success('Tour Rejected');
      fetchTours();
    } catch {
      toast.error('Failed to reject tour');
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
      {loading ? (
        <p>Loading...</p>
      ) : tours.length === 0 ? (
        <p>No assigned tours found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Tourist</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour._id}>
                <td>{index + 1}</td>
                <td>{tour.packageName}</td>
                <td>{tour.touristName}</td>
                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td>${tour.price}</td>
                <td>
                  <span
                    className={`badge ${
                      tour.status === 'accepted'
                        ? 'badge-success'
                        : tour.status === 'in-review'
                        ? 'badge-warning'
                        : tour.status === 'pending'
                        ? 'badge-neutral'
                        : 'badge-error'
                    }`}
                  >
                    {tour.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleAccept(tour._id)}
                    disabled={tour.status !== 'in-review'}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(tour._id)}
                    disabled={tour.status === 'accepted' || tour.status === 'rejected'}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuideAssignedTour;

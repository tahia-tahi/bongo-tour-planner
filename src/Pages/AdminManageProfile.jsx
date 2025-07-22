import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminManageProfile = () => {
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [adminInfo, setAdminInfo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', photo: '' });
  const [stats, setStats] = useState({
    totalPayment: 0,
    totalGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
  });

  useEffect(() => {
    if (user?.email) {
      // FETCH Admin info from your API
      axios.get(`/api/users/${user.email}`)
        .then(res => {
          // Expect res.data to be the admin object with name, email, photo, role etc.
          setAdminInfo(res.data);
          setFormData({ name: res.data.name, photo: res.data.photo });
        })
        .catch(err => {
          console.error('Failed to fetch admin info:', err);
        });

      // FETCH Stats from your API
      axios.get('/api/admin/stats')
        .then(res => setStats(res.data))
        .catch(err => {
          console.error('Failed to fetch stats:', err);
        });
    }
  }, [user]);

  // Handle changes to editable form inputs (name, photo)
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save updated admin profile info to your API
  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${user.email}`, {
        name: formData.name,
        photo: formData.photo,
        email: user.email, // Keep email consistent, but it's not editable
      });
      toast.success('Profile updated!');
      setAdminInfo(prev => ({ ...prev, ...formData }));
      setEditModal(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow text-center">
          <h4 className="text-xl font-semibold">Total Payment</h4>
          <p className="text-2xl font-bold">৳ {stats.totalPayment.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow text-center">
          <h4 className="text-xl font-semibold">Tour Guides</h4>
          <p className="text-2xl font-bold">{stats.totalGuides}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow text-center">
          <h4 className="text-xl font-semibold">Packages</h4>
          <p className="text-2xl font-bold">{stats.totalPackages}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow text-center">
          <h4 className="text-xl font-semibold">Clients</h4>
          <p className="text-2xl font-bold">{stats.totalClients}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded shadow text-center">
          <h4 className="text-xl font-semibold">Stories</h4>
          <p className="text-2xl font-bold">{stats.totalStories}</p>
        </div>
      </div>

      {/* Admin Information */}
      {adminInfo && (
        <div className="bg-white p-6 rounded shadow flex items-center gap-6">
          <img
            src={adminInfo.photo || 'https://i.ibb.co/yfM5vFZ/avatar.png'}
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-semibold">{adminInfo.name}</h3>
            <p className="text-gray-600">{adminInfo.email}</p>
            <span className="badge badge-success mt-1 capitalize">{adminInfo.role}</span>
          </div>
          <button className="btn btn-primary" onClick={() => setEditModal(true)}>
            Edit Profile
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-4"
              placeholder="Your Name"
            />

            <label className="block mb-1 font-semibold">Photo URL</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-4"
              placeholder="Photo URL"
            />

            <label className="block mb-1 font-semibold">Email (not editable)</label>
            <input
              type="text"
              value={adminInfo.email}
              disabled
              className="input input-bordered w-full mb-4 bg-gray-100 cursor-not-allowed"
            />

            <label className="block mb-1 font-semibold">Role (not editable)</label>
            <input
              type="text"
              value={adminInfo.role}
              disabled
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button className="btn btn-ghost" onClick={() => setEditModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageProfile;

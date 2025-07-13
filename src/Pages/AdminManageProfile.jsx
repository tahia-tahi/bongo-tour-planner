import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminManageProfile = () => {
    const axios = useAxiosSecure()
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
      // Fetch admin info
      axios.get(`/api/users/${user.email}`).then(res => {
        setAdminInfo(res.data);
        setFormData({ name: res.data.name, photo: res.data.photo });
      });

      // Fetch stats
      axios.get('/api/admin/stats').then(res => {
        setStats(res.data);
      });
    }
  }, [user]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/users/${user.email}`, {
        name: formData.name,
        photo: formData.photo,
        email: user.email, // include to keep schema consistent
      });
      toast.success('Profile updated!');
      setEditModal(false);
      setAdminInfo(prev => ({ ...prev, ...formData }));
    } catch (err) {
        console.log(err);
      toast.error('Failed to update');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h4 className="text-xl font-semibold">Total Payments</h4>
          <p className="text-2xl font-bold">৳ {stats.totalPayment}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h4 className="text-xl font-semibold">Tour Guides</h4>
          <p className="text-2xl font-bold">{stats.totalGuides}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h4 className="text-xl font-semibold">Packages</h4>
          <p className="text-2xl font-bold">{stats.totalPackages}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h4 className="text-xl font-semibold">Clients</h4>
          <p className="text-2xl font-bold">{stats.totalClients}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded shadow">
          <h4 className="text-xl font-semibold">Stories</h4>
          <p className="text-2xl font-bold">{stats.totalStories}</p>
        </div>
      </div>

      {/* Admin Info */}
      {adminInfo && (
        <div className="bg-white p-6 shadow rounded">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={adminInfo.photo || 'https://i.ibb.co/yfM5vFZ/avatar.png'}
              alt="admin"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold">{adminInfo.name}</h3>
              <p className="text-gray-600">{adminInfo.email}</p>
              <span className="badge badge-success mt-1 capitalize">{adminInfo.role}</span>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setEditModal(true)}
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <input
              className="input input-bordered w-full mb-4"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              className="input input-bordered w-full mb-4"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              placeholder="Photo URL"
            />
            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageProfile;

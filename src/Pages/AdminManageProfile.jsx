import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const AdminManageProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalPayment: 0,
    totalGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
  });
  const [adminInfo, setAdminInfo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', photo: '' });

  // Fetch stats and admin info
  useEffect(() => {
    if (!user?.email) return;

    axios.get('https://bongo-tour-server.vercel.app/api/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Stats fetch failed:', err));

    axios.get(`https://bongo-tour-server.vercel.app/api/users-by-email/${encodeURIComponent(user.email)}`)
      .then(res => {
        setAdminInfo(res.data);
        setFormData({ name: res.data.name, photo: res.data.photo });
      })
      .catch(err => {
        console.error('Admin info fetch failed:', err);
        toast.error('Failed to load admin profile.');
      });
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://bongo-tour-server.vercel.app/api/users/${user.email}`, {
        name: formData.name,
        photo: formData.photo,
      });

      setAdminInfo(prev => ({ ...prev, ...formData }));
      setUser(prev => ({
        ...prev,
        displayName: formData.name,
        photoURL: formData.photo,
      }));

      toast.success('Profile updated!');
      setEditModal(false);
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to update profile');
    }
  };

  if (!adminInfo) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded text-center">
          <h4>Total Payment</h4>
          <p>৳{stats.totalPayment.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-100 rounded text-center">
          <h4>Tour Guides</h4>
          <p>{stats.totalGuides}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded text-center">
          <h4>Packages</h4>
          <p>{stats.totalPackages}</p>
        </div>
        <div className="p-4 bg-red-100 rounded text-center">
          <h4>Clients</h4>
          <p>{stats.totalClients}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded text-center">
          <h4>Stories</h4>
          <p>{stats.totalStories}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <img
          src={adminInfo.photo || 'https://i.ibb.co/yfM5vFZ/avatar.png'}
          alt="Admin"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h3 className="text-2xl">{adminInfo.name}</h3>
          <p>{adminInfo.email}</p>
          <p className="capitalize badge badge-success">{adminInfo.role}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditModal(true)}>
          Edit Profile
        </button>
      </div>

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl mb-4">Edit Profile</h3>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full mb-3"
              placeholder="Name"
            />
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="input w-full mb-3"
              placeholder="Photo URL"
            />
            <input value={adminInfo.email} className="input w-full mb-3 bg-gray-200" disabled />
            <input value={adminInfo.role} className="input w-full mb-3 bg-gray-200" disabled />
            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={() => setEditModal(false)}>
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

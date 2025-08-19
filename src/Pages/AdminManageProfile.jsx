import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

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

  // Simulated payments over last 5 months for line chart
  const [paymentsOverTime, setPaymentsOverTime] = useState([
    { month: 'Jan', payment: 12000 },
    { month: 'Feb', payment: 15000 },
    { month: 'Mar', payment: 18000 },
    { month: 'Apr', payment: 10000 },
    { month: 'May', payment: 20000 },
  ]);

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

  // Prepare chart data
  const barData = [
    { name: 'Payment', value: stats.totalPayment },
    { name: 'Guides', value: stats.totalGuides },
    { name: 'Packages', value: stats.totalPackages },
    { name: 'Clients', value: stats.totalClients },
    { name: 'Stories', value: stats.totalStories },
  ];

  const pieData = [
    { name: 'Guides', value: stats.totalGuides },
    { name: 'Clients', value: stats.totalClients },
    { name: 'Packages', value: stats.totalPackages },
    { name: 'Stories', value: stats.totalStories },
  ];

  return (
    <div className="mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

      {/* Profile */}
      <div className="flex items-center gap-6 mb-10">
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
        <button
          className="btn bg-gray-950 hover:bg-gray-600 text-white rounded-lg"
          onClick={() => setEditModal(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Bar Chart */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Statistics Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4B5563" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Payments Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentsOverTime}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="payment" stroke="#4B5563" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Edit Modal */}
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

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const ManageProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate server update or call actual update endpoint
    // Example only - in real apps update Firebase or backend
    toast.success("Profile updated successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName} 👋</h2>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div>
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role || 'Tourist'}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={handleEditClick} className="btn btn-primary">Edit Profile</button>
        <button
          onClick={() => navigate('/tourist-dashboard/join-as-tourguide')}
          className="btn btn-outline"
        >
          Apply for Tour Guide
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Photo URL</label>
                <input
                  name="photoURL"
                  type="text"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;

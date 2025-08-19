import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const ManageProfile = () => {
const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state for editable fields (initialize from user)
  const [formData, setFormData] = useState({
    name: '',
    photo: '',

  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Populate form data when user loads or updates
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.displayName || '',
        photo: user.photo || user.photoURL || '',
        gender: user.gender || '',
        contact: user.contact || '',
        address: user.address || '',
        age: user.age || '',
        nationality: user.nationality || '',
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const photo = form.photo.value;

  const formData = {
    name,
    photo,
    email: user?.email, // very important to include
  };

  const res = await fetch(`https://bongo-tour-server.vercel.app/api/users/${user.email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (data.modifiedCount || data.upsertedCount) {
    toast.success('Profile updated successfully!');
    
    // 👇 Update frontend user state
    setUser(prev => ({
      ...prev,
      displayName: name,
      photoURL: photo,
      name,
      photo,
    }));

    setIsModalOpen(false);
  }
};


  return (
    <div className=" mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || user?.name} 👋</h1>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.photoURL || user?.photo || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <p><strong>Name:</strong> {user?.displayName || user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role || 'Tourist'}</p>

        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn  bg-gray-950 hover:bg-gray-600 text-white rounded-lg"
        >
          Edit Profile
        </button>

        <button
          onClick={() => navigate('/tourist-dashboard/join-as-tourguide')}
          className="btn btn-outline"
        >
          Apply for Tour Guide
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Image URL"
                />
              </div>


              <div>
                <label className="block font-medium mb-1">Email (cannot change)</label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Role (cannot change)</label>
                <input
                  type="text"
                  value={user?.role || 'Tourist'}
                  disabled
                  className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn  bg-gray-950 hover:bg-gray-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;

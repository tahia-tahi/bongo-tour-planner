import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import toast from 'react-hot-toast';

const GuideManageProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://bongo-tour-server.vercel.app/api/users`)
      .then(res => res.json())
      .then(data => {
        const matched = data.users.find(u => u.email === user?.email);
        setProfile(matched);
        setLoading(false);
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    const updatedProfile = { name, photo, email: profile.email, role: profile.role };

    const res = await fetch(`https://bongo-tour-server.vercel.app/api/users/${profile.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile)
    });

    const data = await res.json();
    console.log('PUT response:', data);

    if (res.ok) {
      toast.success("Profile updated successfully");
      setProfile(updatedProfile);
      setIsModalOpen(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {profile?.name || 'Guide'}!</h2>

      <div className="bg-white shadow p-4 rounded max-w-md">
        <img src={profile?.photo} alt="User" className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-xl font-semibold text-center mt-2">{profile?.name}</h3>
        <p className="text-center text-sm text-gray-600">{profile?.email}</p>
        <p className="text-center text-sm text-blue-600 mb-4 capitalize">Role: {profile?.role}</p>

        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-outline btn-sm"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profile.name}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={profile.photo}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-500">Email (readonly)</label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-500">Role (readonly)</label>
                <input
                  type="text"
                  value={profile.role}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 capitalize"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideManageProfile;

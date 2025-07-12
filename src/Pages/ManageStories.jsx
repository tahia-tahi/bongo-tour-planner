// ✅ ManageStories.jsx
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const ManageStories = () => {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/stories?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setStories(data));
  }, [user]);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/stories/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      toast.success("Story deleted");
      setStories(prev => prev.filter(s => s._id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map(story => (
          <div key={story._id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">{story.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{story.text}</p>
            <div className="flex flex-wrap gap-2">
              {story.images?.map((img, i) => (
                <img key={i} src={img} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate(`/update-story/${story._id}`)}
              >Edit</button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(story._id)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
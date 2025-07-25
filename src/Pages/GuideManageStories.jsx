import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const GuideManageStories = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/stories?email=${user.email}`)
        .then(res => setStories(res.data))
        .catch(err => toast.error('Failed to fetch stories',err));
    }
  }, [user, axios]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this story?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/stories/${id}`);
      toast.success("Story deleted");
      setStories(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      toast.error('Something went wrong',err);
    }
  };

  const handleRemoveImage = async (storyId, imageUrl) => {
    try {
      await axios.patch(`/api/stories/remove-image/${storyId}`, { imageUrl });
      toast.success("Image removed");
      setStories(prev =>
        prev.map(story =>
          story._id === storyId
            ? { ...story, images: story.images.filter(img => img !== imageUrl) }
            : story
        )
      );
    } catch (err) {
        console.log(err);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage My Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
            <p className="text-gray-700 text-sm mb-3">{story.text}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {story.images?.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={img}
                    alt="story"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(story._id, img)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate(`/update-stories/${story._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(story._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideManageStories;

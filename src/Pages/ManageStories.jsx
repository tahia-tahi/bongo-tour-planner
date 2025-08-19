import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ManageStories = () => {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const axios = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/stories?email=${user.email}`)
        .then(res => setStories(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axios]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this story?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/stories/${id}`);
      toast.success("Story deleted successfully.");
      setStories(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the story.");
    }
  };

  const handleRemoveImage = async (storyId, imageUrl) => {
    try {
      await axios.patch(`/api/stories/remove-image/${storyId}`, {
        imageUrl
      });
      toast.success("Image removed");

      setStories(prev =>
        prev.map(story =>
          story._id === storyId
            ? { ...story, images: story.images.filter(img => img !== imageUrl) }
            : story
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage My Stories</h2>

      {stories.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-xl mb-4">You have not created any stories yet.</p>
          <Link
            to="/tourist-dashboard/add-stories"
            className="inline-block bg-gray-950 hover:bg-gray-600 text-white rounded-lg px-6 py-3"
          >
            Create a Story
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <div key={story._id} className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
              <p className="text-gray-700 text-sm mb-3">{story.text}</p>

              <div className="flex flex-wrap gap-3 mb-4">
                {story.images?.length ? (
                  story.images.map((img, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={img}
                        alt="story-img"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        onClick={() => handleRemoveImage(story._id, img)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                        title="Remove Image"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No images</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update-stories/${story._id}`)}
                  className="btn btn-sm btn-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthContext';

const UpdateStories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [story, setStory] = useState(null);
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    axios.get(`/api/stories?email=${user?.email}`)
      .then(res => {
        const found = res.data.find(s => s._id === id);
        setStory(found);
      })
      .catch(err => console.error(err));
  }, [id, axios, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const text = form.text.value;
    

    try {
      await axios.patch(`/api/stories/update/${id}`, { title, text });
      toast.success('Story updated!');
      navigate('/community');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update story');
    }
  };

  const handleAddImage = async () => {
    if (!newImage) return toast.error("Please enter image URL");

    try {
      await axios.patch(`/api/stories/add-image/${id}`, { imageUrl: newImage });
      toast.success("Image added");
      setStory(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage('');
    } catch (err) {
      console.error(err);
      toast.error("Failed to add image");
    }
  };

  const handleRemoveImage = async (imgUrl) => {
    try {
      await axios.patch(`/api/stories/remove-image/${id}`, { imageUrl: imgUrl });
      toast.success("Image removed");
      setStory(prev => ({
        ...prev,
        images: prev.images.filter(img => img !== imgUrl)
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove image");
    }
  };

  if (!story) return <div className="p-6">Loading story...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Story</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={story.title}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="text"
          defaultValue={story.text}
          placeholder="Story Text"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary">Update Story</button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Current Images</h3>
        <div className="flex flex-wrap gap-4">
          {story.images?.length ? (
            story.images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  alt="story-img"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                  title="Remove Image"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No images</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="New Image URL"
            className="input input-bordered w-full"
          />
          <button onClick={handleAddImage} className="btn btn-accent">
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStories;

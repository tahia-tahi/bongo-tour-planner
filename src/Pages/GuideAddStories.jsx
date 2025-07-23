import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const GuideAddStories = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const [images, setImages] = useState(['']);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (value, index) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const handleAddImageField = () => {
    setImages([...images, '']);
  };

  const handleRemoveImageField = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const text = form.text.value;
    const filteredImages = images.filter(url => url.trim());

    const newStory = {
      title,
      text,
      images: filteredImages,
      userName: user.displayName,
      userEmail: user.email,
      role: 'tour_guide',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post('/api/stories', newStory);
      if (res.data.success) {
        toast.success('Story added!');
        navigate('/guide-dashboard/managed-stories');
      } else {
        toast.error('Failed to add story');
      }
    } catch (error) {
      toast.error('Error submitting story',error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add a New Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Story Description</label>
          <textarea
            name="text"
            className="textarea textarea-bordered w-full"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URLs</label>
          {images.map((img, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(e.target.value, index)}
                placeholder="Enter image URL"
                className="input input-bordered w-full"
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageField(index)}
                  className="btn btn-sm btn-error"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="btn btn-sm btn-outline mt-2"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Story'}
        </button>
      </form>
    </div>
  );
};

export default GuideAddStories;

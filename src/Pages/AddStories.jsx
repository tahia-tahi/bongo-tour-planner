import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const AddStories = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [images, setImages] = useState([]);

  const handleAddImageUrl = () => {
    if (imageInput.trim()) {
      setImages(prev => [...prev, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const story = {
      title,
      text,
      images,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('https://bongo-tour-server.vercel.app/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story)
      });
      if (res.ok) {
        toast.success("Story added successfully!");
        navigate('/tourist-dashboard/manage-stories');
      } else {
        toast.error("Failed to add story");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Your Travel Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          required
        ></textarea>

        {/* Image URL input */}
        <div className="flex gap-2">
          <input
            className="input input-bordered w-full"
            type="url"
            placeholder="Paste Image URL"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <button type="button" className="btn btn-outline" onClick={handleAddImageUrl}>
            Add
          </button>
        </div>

        {/* Preview URLs */}
        <div className="flex gap-2 flex-wrap">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="Story" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full">Submit Story</button>
      </form>
    </div>
  );
};

export default AddStories;

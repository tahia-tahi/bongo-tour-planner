import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const AdminAddStories = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageLinks, setImageLinks] = useState(['']);

  const handleImageChange = (index, value) => {
    const newLinks = [...imageLinks];
    newLinks[index] = value;
    setImageLinks(newLinks);
  };

  const addImageField = () => {
    setImageLinks([...imageLinks, '']);
  };

  const removeImageField = (index) => {
    const newLinks = imageLinks.filter((_, i) => i !== index);
    setImageLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const story = {
      title,
      text,
      images: imageLinks.filter(link => link.trim() !== ''),
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
        navigate('/admin-dashboard/manage-stories');
      } else {
        toast.error("Failed to add story");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Travel Story (Admin)</h2>
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
          placeholder="Story Content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          required
        ></textarea>

        <div className="space-y-2">
          <p className="font-semibold">Image URLs</p>
          {imageLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className="input input-bordered w-full"
                type="url"
                placeholder={`Image URL ${idx + 1}`}
                value={link}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                required
              />
              {imageLinks.length > 1 && (
                <button type="button" className="btn btn-error btn-sm" onClick={() => removeImageField(idx)}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-outline btn-sm" onClick={addImageField}>
            + Add More
          </button>
        </div>

        <button type="submit" className="btn bg-gray-950 hover:bg-gray-600 text-white rounded-lg w-full">Submit Story</button>
      </form>
    </div>
  );
};

export default AdminAddStories;

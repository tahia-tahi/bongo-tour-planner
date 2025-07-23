import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const AdminManageStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/stories');
      const data = await res.json();
      setStories(data);
    } catch (err) {
      toast.error('Failed to fetch stories',err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this story?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/stories/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Story deleted');
        fetchStories();
      } else {
        toast.error('Failed to delete story');
      }
    } catch (err) {
      toast.error('Something went wrong',err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage All Stories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, index) => (
              <tr key={story._id}>
                <td>{index + 1}</td>
                <td>{story.title}</td>
                <td>{story.userName}</td>
                <td>{story.userEmail}</td>
                <td>{story.role || 'unknown'}</td>
                <td>{new Date(story.createdAt).toLocaleDateString()}</td>
                <td>
                  {story.images?.length > 0 && (
                    <div className="flex gap-1">
                      {story.images.slice(0, 2).map((img, i) => (
                        <img key={i} src={img} alt="story" className="w-12 h-12 rounded object-cover" />
                      ))}
                      {story.images.length > 2 && <span className="text-xs">+{story.images.length - 2}</span>}
                    </div>
                  )}
                </td>
                <td className="flex gap-2">
                  {/* Optional: add a view link */}
                  <Link
                    to={`/stories/${story._id}`}
                    className="btn btn-sm btn-outline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageStories;

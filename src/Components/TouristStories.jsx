import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const TouristStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://bongo-tour-server.vercel.app/api/stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error('Failed to fetch stories:', err));
  }, []);

  const getStoryImage = (story) => {
    if (story.image) return story.image;
    if (Array.isArray(story.images) && story.images.length > 0) return story.images[0];
    return 'https://via.placeholder.com/400x200?text=No+Image+Available';
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Tourist Stories</h2>
          <p className="mt-2 text-lg text-gray-600">
            Discover real experiences shared by fellow travelers.
          </p>
        </div>

        {stories.length === 0 ? (
          <p className="text-center text-gray-500">No stories available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((story) => (
                <div
                  key={story._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src={getStoryImage(story)}
                    alt={story.title || 'Tourist Story'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800">{story.title}</h3>
                    <p className="mt-2 text-gray-600">
                      {story.description?.slice(0, 100)}...
                    </p>
                    <Link
                      to={`/stories/${story._id}`}
                      className="inline-block mt-4 font-bold text-primary hover:underline"
                    >
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default TouristStories;

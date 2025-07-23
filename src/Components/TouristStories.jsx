import React, { useEffect, useState, useContext } from 'react';
import { FacebookShareButton } from 'react-share';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const TouristStories = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios = useAxiosSecure()

  useEffect(() => {
    axios.get('/api/stories/random')
      .then(res => setStories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleShare = (story) => {
    console.log(story);
    if (!user) {
      navigate('/auth/login');
    }
    // share handled by FacebookShareButton
  };

  return (
    <section className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Tourist Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stories?.map((story, idx) => (
          <div key={idx} className="bg-white shadow rounded p-4">
            <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{story.title}</h3>
            <p className="text-sm text-gray-500">By {story.author} on {story.date}</p>
<p className="mt-2 text-gray-700">
  {(story.description ? story.description.slice(0, 100) : 'No description available')}...
</p>

            <div className="mt-4 flex justify-between items-center">
              <FacebookShareButton
                url={window.location.href}
                quote={story.title}
                onClick={() => handleShare(story)}
                className="text-blue-600 hover:underline"
              >
                Share on Facebook
              </FacebookShareButton>

              <button
                onClick={() => navigate('/stories')}
                className="btn btn-sm btn-primary"
              >
                All Stories
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TouristStories;

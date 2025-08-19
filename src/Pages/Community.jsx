import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const Community = () => {
  const stories = useLoaderData();

  // Local state for likes
  const [likes, setLikes] = useState(
    stories.reduce((acc, story) => {
      acc[story._id] = story.likes || 0;
      return acc;
    }, {})
  );

  const [liked, setLiked] = useState({});

  const getImageUrl = (story) => {
    if (Array.isArray(story.images) && story.images.length > 0) {
      return story.images[0];
    } else if (story.image) {
      return story.image;
    }
    return null;
  };

 const handleLike = async (id) => {
  try {
    const alreadyLiked = liked[id];
    const res = await fetch(`https://bongo-tour-server.vercel.app/api/stories/like/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ increment: !alreadyLiked }),
    });

    if (res.ok) {
      setLikes((prev) => ({
        ...prev,
        [id]: prev[id] + (alreadyLiked ? -1 : 1),
      }));
      setLiked((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    } else {
      console.error('Failed to update like count');
    }
  } catch (err) {
    console.error('Error liking story:', err);
  }
};

  return (
    <div className="w-11/12 mx-auto px-4 py-10 mt-40">
      <h1 className="text-3xl font-bold text-center mb-8">Traveler Stories</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => {
          const imageUrl = getImageUrl(story);

          return (
            <div key={story._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={story.title || 'Travel Story'}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 italic">
                  No image available
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold">{story.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{story.location || story.date}</p>
                <p className="text-gray-700 mb-4">{story.text || story.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => handleLike(story._id)}
                    className={`text-xl ${liked[story._id] ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition`}
                  >
                    ❤️
                  </button>
                  <span className="text-sm text-gray-600">{likes[story._id]} likes</span>
                </div>

                {/* React Share Buttons */}
                <div className="flex gap-2">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={`Read ${story.userName || story.author}'s story!`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={window.location.href}
                    title={`Check out this travel story from ${story.userName || story.author}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    url={window.location.href}
                    title={`Read ${story.userName || story.author}'s travel experience`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;

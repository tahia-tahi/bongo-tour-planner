import React from 'react';
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

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">🌍 Traveler Stories</h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{story.title}</h2>
                            <p className="text-sm text-gray-500 mb-2">{story.location}</p>
                            <p className="text-gray-700 mb-4">
                                {story.description}
                            </p>

                            {/* React Share Buttons */}
                            <div className="flex gap-2">
                                <FacebookShareButton
                                    url={window.location.href}
                                    quote={`Read ${story.name}'s story about ${story.location}!`}
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <TwitterShareButton
                                    url={window.location.href}
                                    title={`Check out this travel story from ${story.name}`}
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <WhatsappShareButton
                                    url={window.location.href}
                                    title={`Read ${story.name}'s travel experience`}
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;

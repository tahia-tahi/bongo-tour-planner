import React from 'react';

const Overview = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-12" id="overview">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Video Preview */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          {/* <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          /> */}
        </div>

        {/* Overview Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover the Wonders of Bangladesh
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to <strong>The Tourist Guide</strong> — your go-to companion for exploring Bangladesh's top destinations. From the bustling streets of Dhaka to the serene beaches of Cox’s Bazar and the historic richness of Mahasthangarh, our platform is packed with detailed insights, trip plans, and cultural experiences to help you travel better.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Overview;

import React from 'react';
import { Link } from 'react-router';

const Overview = () => {
  return (
    <section className="bg-white mt-28 w-11/12 py-12 mx-auto" id="overview">
      <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-20 items-center">

        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="https://i.ibb.co/5hxLHQCQ/shorisha.png" alt="Mustard field in Bangladesh" />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover the Wonders of Bangladesh
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to <strong>BONGO TOUR PLANNER</strong> — your go-to companion for exploring Bangladesh's top destinations. From the bustling streets of Dhaka to the serene beaches of Cox’s Bazar and the historic richness of Mahasthangarh, our platform is packed with detailed insights, trip plans, and cultural experiences to help you travel better.
          </p>

          <Link to={'/trips'}>
            <button className="mt-6 px-6 py-2 bg-gray-950 hover:bg-gray-600 text-white rounded-lg">
              Start Exploring
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Overview;

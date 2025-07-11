import React from 'react';
import { useLoaderData, Link } from 'react-router';

const AllTrips = () => {
  const allTrips = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">All Trips</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTrips.map((trip) => (
          <div key={trip._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
            <p className="text-gray-600 mb-2">{trip.description?.slice(0, 100)}...</p>
            <p className="text-primary font-bold mb-4">Price: ৳{trip.price}</p>
            <Link
              to={`/packages/${trip._id}`}
              className="btn btn-outline btn-primary w-full"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;

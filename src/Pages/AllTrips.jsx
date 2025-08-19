import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';

const AllTrips = () => {
  const allTrips = useLoaderData();
  const [sortedTrips, setSortedTrips] = useState(allTrips);
  const [sortOrder, setSortOrder] = useState('asc'); // default ascending

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...allTrips].sort((a, b) => {
      if (order === 'asc') return a.price - b.price;
      else return b.price - a.price;
    });
    setSortedTrips(sorted);
  };

  return (
    <div className="w-11/12 mx-auto px-4 py-8 mt-40">
      <h2 className="text-3xl font-bold text-center mb-6">All Trips</h2>

      {/* Sorting Buttons */}
      <div className="flex justify-end mb-6 gap-4">
        <button
          className={`btn ${sortOrder === 'asc' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleSortChange('asc')}
        >
          Price: Low to High
        </button>
        <button
          className={`btn ${sortOrder === 'desc' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleSortChange('desc')}
        >
          Price: High to Low
        </button>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrips.map((trip) => (
          <div key={trip._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
            <p className="text-gray-600 mb-2">{trip.description?.slice(0, 100)}...</p>
            <p className="text-gray-800 font-bold mb-4">Price: ৳{trip.price}</p>
            <Link
              to={`/packages/${trip._id}`}
              className="btn btn-outline bg-gray-950 hover:bg-gray-600 text-white rounded-lg w-full"
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

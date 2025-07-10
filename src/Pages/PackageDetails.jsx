import React from 'react';
import { useLoaderData } from 'react-router';

const PackageDetails = () => {
  const packageData = useLoaderData();
  console.log(packageData);

  const { title, gallery, longImage, description, tourPlan } = packageData;

  return (
    <div className="w-full">
      {/* Gallery Section */}
      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={longImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 text-primary">{title}</h2>

          <p className="text-gray-700 mb-6">{description}</p>

          <h3 className="text-2xl font-semibold mb-3 text-secondary">Tour Plan</h3>
          <ul className="list-disc list-inside space-y-2">
            {tourPlan.map((plan, index) => (
              <li key={index}>
                <strong>Day {plan.day}:</strong> {plan.plan}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column – Booking Form */}
        <div className="bg-white shadow p-6 rounded-lg border">
          <h3 className="text-2xl font-bold mb-4">Book Your Trip</h3>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Your Name</label>
              <input type="text" className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Select Date</label>
              <input type="date" className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Number of People</label>
              <input type="number" min="1" className="input input-bordered w-full" required />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {/* Optional: Thumbnail Gallery */}
      <div className="w-11/12 mx-auto py-10">
        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              className="w-full h-48 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

import React from 'react';
import { useLoaderData } from 'react-router';
import BookingForm from '../Components/BookingForm';

const PackageDetails = () => {

  
  const packageData = useLoaderData();
  console.log(packageData);

  const { title, gallery,  details, tourPlan } = packageData;

  return (
    <div className="w-full">
      
            {/* Optional: Thumbnail Gallery */}
<div className="w-11/12 mx-auto py-10">
  <h3 className="text-xl font-semibold mb-4">Gallery</h3>
  
  <div className="grid grid-cols-2 gap-4">
    {/* Left Column – First Image */}
    <div>
      {gallery?.[0] && (
        <img
          src={gallery[0]}
          alt="Gallery 0"
          className="w-full h-48 object-cover rounded shadow"
        />
      )}
    </div>

    {/* Right Column – Second Image */}
    <div>
      {gallery?.[1] && (
        <img
          src={gallery[1]}
          alt="Gallery 1"
          className="w-full h-48 object-cover rounded shadow"
        />
      )}
    </div>
  </div>

  {/* Full Width Last Image */}
  {gallery?.[2] && (
    <div className="mt-4">
      <img
        src={gallery[2]}
        alt="Gallery 2"
        className="w-full h-64 object-cover rounded shadow"
      />
    </div>
  )}
</div>



      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 text-primary">{title}</h2>

          <p className="text-gray-700 mb-6">{details}</p>

          <h3 className="text-2xl font-semibold mb-3 text-secondary">Tour Plan</h3>
          <ul className="list-disc list-inside space-y-2">
            {tourPlan?.map((plan, index) => (
              <li key={index}>
                <strong>Day {plan.day}:</strong> {plan.plan}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column – Booking Form */}




<BookingForm></BookingForm>
      </div>


    </div>
  );
};

export default PackageDetails;

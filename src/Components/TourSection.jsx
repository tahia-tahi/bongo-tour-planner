import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TourSection = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);



  // Load packages
  useEffect(() => {
    fetch('http://localhost:3000/api/packages/random')
      .then(res => res.json())
      .then(data => setPackages(data));
  }, []);

  // Load guides
  useEffect(() => {
    fetch('http://localhost:3000/api/guides/random')
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

  return (
    <div className="my-10 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {packages.map((pkg, index) => (
              <div key={index} className="card bg-white shadow p-4 rounded-xl">
                <img src={pkg.image} alt={pkg.title} className="h-40 w-full object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-3">{pkg.title}</h3>
                <p className="text-sm text-gray-500">{pkg.type} · {pkg.days} Days</p>
                <p className="text-lg text-green-600 font-bold">৳ {pkg.price}</p>
<Link to={`/packages/${pkg.detailsId}`} className="btn btn-primary mt-3 w-full">View Package</Link>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Our Tour Guides Tab */}
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {guides.map((guide, index) => (
              <div key={index} className="card bg-white shadow p-4 rounded-xl">
                <img src={guide.photo} alt={guide.name} className="h-40 w-40 object-cover rounded-full mx-auto" />
                <h3 className="text-xl font-semibold mt-3 text-center">{guide.name}</h3>
                <p className="text-sm text-gray-500 text-center">{guide.specialty}</p>
                <p className="text-sm text-center text-gray-400">{guide.location} · {guide.experience} yrs exp</p>
                <p className="text-center mt-1">⭐ {guide.rating}</p>
                <Link to={`/guides/${guide._id}`} className="btn btn-outline btn-secondary mt-3 w-full">View Details</Link>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourSection;

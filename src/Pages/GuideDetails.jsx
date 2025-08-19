import { useLoaderData } from 'react-router';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const GuideDetails = () => {
  const guide = useLoaderData();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 mt-20">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <img
          src={guide.photo}
          alt={guide.name}
          className="w-40 h-40 mx-auto rounded-full border-4 border-gray-950 mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{guide.name}</h2>
        <p className="text-gray-700 mb-1"><strong>Specialty:</strong> {guide.specialty}</p>
        <p className="text-gray-700 mb-1"><strong>Location:</strong> {guide.location}</p>
        <p className="text-gray-700 mb-1"><strong>Experience:</strong> {guide.experience} years</p>
        <p className="text-yellow-400 mb-4"><strong>Rating:</strong> ⭐ {guide.rating}</p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6 text-gray-800">
          <a href={guide.facebook || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebookF size={24} />
          </a>
          <a href={guide.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href={guide.twitter || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
        </div>

        {/* Action Button */}
        <button className="bg-gray-950 hover:bg-gray-600 text-white rounded-lg px-6 py-2 font-semibold">
          Contact Guide
        </button>
      </div>
    </div>
  );
};

export default GuideDetails;

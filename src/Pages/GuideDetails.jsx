import { useLoaderData } from 'react-router';

const GuideDetails = () => {
  const guide = useLoaderData();

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4">{guide.name}</h2>
      <img src={guide.photo} alt={guide.name} className="w-40 h-40 rounded-full" />
      <p className="mt-2">Specialty: {guide.specialty}</p>
      <p>Location: {guide.location}</p>
      <p>Experience: {guide.experience} years</p>
      <p>Rating: ⭐ {guide.rating}</p>
    </div>
  );
};

export default GuideDetails;

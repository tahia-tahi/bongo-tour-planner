import { FaSmile, FaShieldAlt, FaUserTie, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: <FaSmile className="text-4xl text-primary" />,
    title: 'Customer Delight',
    subtitle: 'We go the extra mile to ensure your travel experience is joyful and stress-free.',
  },
  {
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    title: 'Trusted Adventure',
    subtitle: 'Your safety and trust are our priority in every destination we cover.',
  },
  {
    icon: <FaUserTie className="text-4xl text-primary" />,
    title: 'Expert Guides',
    subtitle: 'Our professional guides ensure you experience the local culture authentically.',
  },
  {
    icon: <FaClock className="text-4xl text-primary" />,
    title: 'Time Flexibility',
    subtitle: 'We offer flexible trip schedules tailored to your convenience.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-11/12 mx-auto my-16 text-center">
      <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div key={index} className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition">
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          About Bongo Tour
        </h1>

        {/* Project Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-300 pb-1">
            Project Overview
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Bongo Tour is a full-stack travel management platform that connects tourists with tour guides,
            providing a seamless way to explore curated tour packages, book trips securely, and share travel stories.
            The platform supports role-based user management, real-time booking and payment processing through Stripe,
            and an admin dashboard for monitoring overall activity.
          </p>
        </section>

        {/* About Developer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-300 pb-1">
            About the Developer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            This project was developed by a passionate full-stack developer with a keen interest in building
            scalable and user-friendly web applications. With a focus on clean code, robust backend APIs,
            and intuitive UI, the developer ensures smooth and secure experiences for all users.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-300 pb-1">
            Projects Created
          </h2>
          <ul className="list-disc list-inside space-y-2 text-blue-700 text-lg">
            <li>
              <a
                href="https://github.com/yourusername/bongo-tour"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Bongo Tour 
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tahia-tahi/lawn-shaper"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Lawn Shaper
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tahia-tahi/collab-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Collab Learn
              </a>
            </li>
          </ul>
        </section>

        {/* Important Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-300 pb-1">
            Important Links
          </h2>
          <ul className="list-disc list-inside space-y-2 text-blue-600 text-lg">
            <li>
              <a
                href="https://drive.google.com/file/d/1bMzV8FU6WqlKAInp-1Kn0eIYTAm_dXyR/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                download
              >
                See Resume
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1bMzV8FU6WqlKAInp-1Kn0eIYTAm_dXyR/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                download
              >
                See CV
              </a>
            </li>
            <li>
              <a
                href="#" // Replace with your portfolio URL
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                See Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tahia-tahi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                See GitHub
              </a>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-300 pb-1">
            Contact
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Feel free to reach out via email at{' '}
            <a
              href="mailto:developer@example.com"
              className="text-indigo-600 hover:underline font-medium"
            >
              tahiaofficial1@gmail.com
            </a>{' '}
            or connect on{' '}
            <a
              href="https://linkedin.com/in/kazi-tahia-idris"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-medium"
            >
              LinkedIn
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;

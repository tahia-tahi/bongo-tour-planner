import React from 'react';
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin 
} from 'react-icons/fa';
import { Link } from 'react-router';
import FooterLogo from './FooterLogo';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 border-t border-gray-300">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FooterLogo></FooterLogo>
          </div>
          <p className="text-sm text-gray-500">
            Discover the beauty, culture, and cuisine of Bangladesh. Your adventure starts here!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="link link-hover">Home</Link>
            </li>
            <li>
              <Link to="/about" className="link link-hover">About Us</Link>
            </li>
            <li>
              <Link to="/community" className="link link-hover">Community</Link>
            </li>
            <li>
              <Link to="/trips" className="link link-hover">Trips</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>Email: <a href="mailto:contact@explorebd.com" className="link link-hover">contact@explorebd.com</a></li>
            <li>Phone: <a href="tel:+8801234567890" className="link link-hover">+880 1234-567890</a></li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Developer Links */}
        <div className="mt-6">
          <h3 className="footer-title font-semibold mb-2">Developer</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com/tahia-tahi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/kazi-tahia-idris"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Explore BD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

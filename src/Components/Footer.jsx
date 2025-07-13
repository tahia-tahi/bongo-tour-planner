import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TourLogo from './TourLogo';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 mt-10 border-t border-gray-300">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TourLogo />
            <h1 className="text-xl font-bold">Explore BD</h1>
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

        {/* Social Media */}
        <div>
          <h3 className="footer-title font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-primary"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com"
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

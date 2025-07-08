import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import TourLogo from './TourLogo'; // Reuse your logo component

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
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="link link-hover">Home</a></li>
            <li><a href="/about" className="link link-hover">About Us</a></li>
            <li><a href="/community" className="link link-hover">Community</a></li>
            <li><a href="/trips" className="link link-hover">Trips</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-title">Contact</h3>
          <p>Email: contact@explorebd.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a href="https://facebook.com" className="hover:text-primary"><FaFacebookF /></a>
            <a href="https://instagram.com" className="hover:text-primary"><FaInstagram /></a>
            <a href="https://youtube.com" className="hover:text-primary"><FaYoutube /></a>
            <a href="https://twitter.com" className="hover:text-primary"><FaTwitter /></a>
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

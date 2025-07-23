import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import TourLogo from './TourLogo';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/api/users/role/${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => {
          console.error('Failed to fetch role:', err);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  const getDashboardRoute = () => {
    if (userRole === 'admin') return '/admin-dashboard';
    if (userRole === 'tour_guide') return '/guide-dashboard';
    return '/tourist-dashboard';
  };

  return (
    <div className="bg-primary text-white shadow">
      <div className="w-11/12 mx-auto flex items-center justify-between py-4">
        {/* Logo + Site Name */}
        <div className="flex items-center gap-2">
          <TourLogo />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className="hover:text-secondary">Home</NavLink>
          <NavLink to="/about" className="hover:text-secondary">About Us</NavLink>
          <NavLink to="/community" className="hover:text-secondary">Community</NavLink>
          <NavLink to="/allTrips" className="hover:text-secondary">Trips</NavLink>

          {!user ? (
            <>
              <NavLink to="/auth/login" className="hover:text-secondary">Log In</NavLink>
              <NavLink to="/auth/signup" className="hover:text-secondary">Sign Up</NavLink>
            </>
          ) : (
            <div className="relative">
              <div
                className="cursor-pointer flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <MdArrowDropDown size={24} />
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48 p-3 z-50">
                  <p className="font-semibold">{user.displayName || 'User'}</p>
                  <p className="text-sm mb-2">{user.email}</p>

                  <hr />
                  <NavLink to={getDashboardRoute()} className="block mt-2 hover:text-primary">Dashboard</NavLink>
                  <button onClick={handleLogout} className="mt-3 w-full text-left hover:text-red-600">Log Out</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary text-white px-6 pb-4 space-y-3">
          <NavLink to="/" className="block">Home</NavLink>
          <NavLink to="/about" className="block">About Us</NavLink>
          <NavLink to="/community" className="block">Community</NavLink>
          <NavLink to="/allTrips" className="block">Trips</NavLink>

          {!user ? (
            <>
              <NavLink to="/auth/login" className="block">Log In</NavLink>
              <NavLink to="/auth/signup" className="block">Sign Up</NavLink>
            </>
          ) : (
            <div>
              <hr className="my-2" />
              <p>{user.displayName || 'User'}</p>
              <p className="text-sm">{user.email}</p>
              <NavLink to={getDashboardRoute()} className="block mt-2">Dashboard</NavLink>
              <NavLink to="/announcements" className="block">Offer Announcements</NavLink>
              <button onClick={handleLogout} className="block mt-2 text-red-400">Log Out</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

// TouristDashboard.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaUser, FaBook, FaPen, FaPlusCircle, FaSignInAlt } from 'react-icons/fa';

const TouristDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/tourist-dashboard/manage-profile"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
            }
          >
            <FaUser /> <span>Manage Profile</span>
          </NavLink>
          <NavLink
            to="/tourist-dashboard/my-bookings"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
            }
          >
            <FaBook /> <span>My Bookings</span>
          </NavLink>
          <NavLink
            to="/tourist-dashboard/manage-stories"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
            }
          >
            <FaPen /> <span>Manage Stories</span>
          </NavLink>
          <NavLink
            to="/tourist-dashboard/add-stories"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
            }
          >
            <FaPlusCircle /> <span>Add Story</span>
          </NavLink>
          <NavLink
            to="/tourist-dashboard/join-as-tourguide"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`
            }
          >
            <FaSignInAlt /> <span>Join as Tour Guide</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default TouristDashboard;

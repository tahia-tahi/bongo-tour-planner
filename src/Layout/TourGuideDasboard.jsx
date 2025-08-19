import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';

const TourGuideDashboard = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Manage Profile', path: '/guide-dashboard/guide-manage-profile' },
    { name: 'Add Stories', path: '/guide-dashboard/guide-add-stories' },
    { name: 'Manage Stories', path: '/guide-dashboard/managed-stories' },
    { name: 'Assigned Tours', path: '/guide-dashboard/assigned-tour' },
  ];

  return (
    <div className="flex min-h-screen mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 p-6 border-r min-h-screen">
        <h2 className="text-xl font-bold mb-6 text-white">Tour Guide Panel</h2>
        <ul className="space-y-3">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block w-full p-2 rounded-lg ${pathname === item.path
                    ? 'bg-gray-700 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>


      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TourGuideDashboard;

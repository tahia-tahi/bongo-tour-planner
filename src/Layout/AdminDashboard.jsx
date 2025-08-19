import React from 'react';
import { NavLink, Outlet } from 'react-router';

const AdminDashboard = () => {
    const menuItems = [
        { to: 'admin-manage-profile', label: 'Manage Profile' },
        { to: 'admin-add-stories', label: 'Add Stories' },
        { to: 'admin-manage-stories', label: 'Manage Stories' },
        { to: 'admin-add-package', label: 'Add Package' },
        { to: 'admin-manage-candidates', label: 'Manage Candidates' },
        { to: 'admin-manage-users', label: 'Manage Users' },
    ];

    return (
        <div className="flex min-h-screen mt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-5 border-r">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    {menuItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-primary font-bold'
                                        : 'text-gray-700 hover:text-primary'
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;

import React from 'react';
import { Outlet } from 'react-router';

const TouristDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default TouristDashboard;
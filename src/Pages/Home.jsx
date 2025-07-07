import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;
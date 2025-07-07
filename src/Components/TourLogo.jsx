import React from 'react';
import logo from '../assets/tour-logo.png'
import { Link } from 'react-router';

const TourLogo = () => {
    return (
        <div>
            <Link to={'/'}>
                <img src={logo} alt="" />

            </Link>
        </div>
    );
};

export default TourLogo;
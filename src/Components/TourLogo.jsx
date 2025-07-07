import React from 'react';
import logo from '../assets/tour-logo.png'

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
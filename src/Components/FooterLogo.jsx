import React from 'react';
import logo from '../assets/footer-Bong tour.png'
import { Link } from 'react-router';

const FooterLogo = () => {
    return (
        <div>
            <Link to={'/'}>
                <img src={logo} alt="" />

            </Link>
        </div>
    );
};

export default FooterLogo;
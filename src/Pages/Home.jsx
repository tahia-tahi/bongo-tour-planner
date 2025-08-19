import React from 'react';
import TourSection from '../Components/TourSection';
import BannerSlider from '../Components/BannerSlider';
import Overview from '../Components/Overview';
import TouristStories from '../Components/TouristStories';
import ReviewSlider from '../Components/ReviewSlider';
import WhyChooseUs from '../Components/WhyChooseUs';
import Marquee from '../Components/Marquee';

const Home = () => {
    return (
        <div>
            <BannerSlider></BannerSlider>
            <Overview></Overview>
            <WhyChooseUs></WhyChooseUs>
            <TourSection></TourSection>
            <TouristStories></TouristStories>
            
            <ReviewSlider></ReviewSlider>
            <Marquee></Marquee>

        </div>
    );
};

export default Home;
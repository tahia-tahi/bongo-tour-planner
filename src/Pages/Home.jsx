import React from 'react';
import TourSection from '../Components/TourSection';
import BannerSlider from '../Components/BannerSlider';
import Overview from '../Components/Overview';
import TouristStories from '../Components/TouristStories';
import ReviewSlider from '../Components/ReviewSlider';
import WhyChooseUs from '../Components/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <BannerSlider></BannerSlider>
            <Overview></Overview>
           <TourSection></TourSection> 
           <TouristStories></TouristStories>
           <ReviewSlider></ReviewSlider>
           <WhyChooseUs></WhyChooseUs>
         
        </div>
    );
};

export default Home;
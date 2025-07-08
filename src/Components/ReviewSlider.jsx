import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ReviewSlider = () => {

    const axios = useAxiosSecure()
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Travelers Say</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000 }}
        loop={reviews.length > 3} // loop only if enough slides
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h4 className="font-bold text-lg">{review.name}</h4>
              <p className="text-yellow-500 text-sm mb-2">Rating: {review.rating} ⭐</p>
              <p className="text-gray-600 italic">"{review.review}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;

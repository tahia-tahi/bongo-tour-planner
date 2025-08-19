import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const ReviewSlider = () => {
  const axios = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('https://bongo-tour-server.vercel.app/api/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <motion.div
      className="w-11/12 mx-auto py-10 mt-20 "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        What Our Travelers Say
      </motion.h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 4000 }}
        loop={reviews.length > 3}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-gray-200 shadow-md rounded-lg p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h4 className="font-bold text-lg">{review.name}</h4>
              <p className="text-black font-semibold text-sm mb-2">Rating: {review.rating} ⭐</p>
              <p className="text-gray-600 italic">"{review.review}"</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default ReviewSlider;

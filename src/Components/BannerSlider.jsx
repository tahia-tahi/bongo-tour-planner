// components/BannerSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const images = [
  'https://i.ibb.co/qLQC9MFF/bouddobihar.png',
  'https://i.ibb.co/bjKDH1Sj/bridge.png',
  'https://i.ibb.co/Dg1rykdX/fountain.png',
  'https://i.ibb.co/0R16YX72/guliakhai.png',
  'https://i.ibb.co/5XHD6pZH/heritage.png',
  'https://i.ibb.co/Psd13hXL/hil.png',
  'https://i.ibb.co/XxMwCrry/sea.png',
  'https://i.ibb.co/zTXLBpxg/shatgombuj.png',
  'https://i.ibb.co/4wT5HFnB/shonshod.png',
  
];

const BannerSlider = () => {
  return (
    <div className="w-full h-[500px] relative z-0">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 3500 }}
        effect="fade"
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* Overlay */}
                <div className="w-full h-full bg-opacity-80 flex items-center justify-center">
                  <div className="text-center text-white animate-fadeIn">
                    <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                      Discover Bangladesh
                    </h2>
                    <p className="mt-4 text-lg md:text-xl">
                      Culture • Nature • Adventure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;

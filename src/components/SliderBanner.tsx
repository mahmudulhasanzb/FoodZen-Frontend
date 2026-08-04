'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const banners = [
  'https://i.ibb.co.com/DPf7FCNJ/efc43c341d7536b0a6304462c36b09fa.jpg',
  'https://i.ibb.co.com/gZ402tNj/2e719476cf3db5de92c93accacaa3991.jpg',
  'https://i.ibb.co.com/gZ402tNj/2e719476cf3db5de92c93accacaa3991.jpg',
]

const SliderBanner = () => {
  return (
    <section className="w-full  py-8 md:py-10 border-y border-red-800/30 dark:border-red-900/40">
      {/* Slider Container */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <div className="relative [&_.swiper-pagination]:bg-black/5! [&_.swiper-pagination]:backdrop-blur-xs! [&_.swiper-pagination]:px-3! [&_.swiper-pagination]:py-1! [&_.swiper-pagination]:rounded-full! [&_.swiper-pagination]:w-fit! [&_.swiper-pagination]:left-1/2! [&_.swiper-pagination]:-translate-x-1/2! [&_.swiper-pagination]:bottom-4! [&_.swiper-pagination-bullet]:bg-white/60! [&_.swiper-pagination-bullet-active]:bg-yellow-400! [&_.swiper-pagination-bullet-active]:w-4! [&_.swiper-pagination-bullet-active]:rounded-full! [&_.swiper-pagination-bullet]:transition-all! [&_.swiper-pagination-bullet]:duration-100! [&_.swiper-pagination-bullet]:mx-1!">
          <Swiper
            modules={[Pagination, Autoplay, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-2xl overflow-hidden shadow-sm"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[2.4/1] md:aspect-[3.4/1] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={banner}
                    alt={`banner-${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default SliderBanner




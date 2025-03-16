import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const images = [
    "https://imgs.search.brave.com/tf9EqN3WcKRxE5qTGLOOuo57kc9-9enAZ8b43vpcUbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/cGhvbmUtdGFraW5n/LXBob3RvLW9mLW11/c2V1bS5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w",
    "https://imgs.search.brave.com/ImduMd-ovCdYIpg3cMsFnWcwU6LIMI_0-VDh1fYgHnQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/cGhvdG8tb2YtYS1j/aXR5c2NhcGUtd2l0/aC1hLWZlcnJpcy13/aGVlbC5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w",
    "https://imgs.search.brave.com/6WQTUBqRH8muyKRvLMH4eR0vl3bs2uXZQb-itBjC9Lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjg5/OTExMTcyL3Bob3Rv/L2Fic3RyYWN0LWJs/dXJyZWQtYmFja2dy/b3VuZC1vZi1kZXBh/cnRtZW50LXN0b3Jl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1xc0NuckFBWHg1/UVJoS2FPWWFpYXJD/Z2hZdjk3dGZrMjAw/V1doclZtLWhzPQ"
  ];

const Slider = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[70vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.style.display = "none")} // Hide broken images
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white text-center px-4">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                Find Your Favorite Store & Rate It!
              </h1>
              <p className="text-sm sm:text-lg md:text-xl mt-2">
                Discover amazing places and share your experience.
              </p>
              <button onClick={() => navigate("/stores")} className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-white text-black font-semibold hover:bg-gray-300 transition text-sm sm:text-base">
                Explore Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;

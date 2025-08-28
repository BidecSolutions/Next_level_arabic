"use client"
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./TestimonialSection.css"; // <-- Import your custom CSS

const testimonials = [
  {
    id: 1,
    name: "Rebeka Dawson",
    designation: "Instructor",
    message:
      "Working with Next Level Real Estate was a truly outstanding experience. Their team’s professionalism and deep market knowledge made finding our dream home in Dubai a smooth and enjoyable process. They listened to our needs and were incredibly responsive and helpful throughout every step.",
    image: "/about/person.png", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Malalal Yousuf",
    designation: "Instructor",
    message:
      "I recently sold my property through Next Level Real Estate and was impressed by their efficient and transparent approach. The agents were dedicated, offering personalized advice and support, which was crucial in navigating the market's complexities. Their commitment to achieving the best outcome was evident, resulting in a sale that exceeded my expectations.",
    image: "/about/person2.png", // Replace with actual image URL
  },
  // Add more testimonials here
];

const TestimonialSection = () => {
  // Manage current index state for displaying slide numbers
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-center flex-col md:flex-row items-center gap-[50px] md:gap-0 md:my-20 py-6 bg-gray-50">
      {/* Left Side (Heading and Description) */}
      <div className="md:w-[40%] macbook:w-[25%] flex flex-col items-center md:items-start ">
        <h3 className=" text-center font-newsLetter text-[28px] md:text-[38px]  md:text-start md:leading-[38px] text-[#8F8F8F] md:w-[90%] ">
          What Our Customers Are Saying
        </h3>
        <p className="mt-4 text-[#8F8F8F] font-montserrat text-center md:text-start w-[80%] md:w-[70%] ">
          Real experiences from our valued customers, sharing how we've helped
          them find their perfect property and exceed their expectations.
        </p>
      </div>

      {/* Right Side (Testimonial Slider) */}
      <div className=" w-[100%] md:w-[40%] macbook:w-[35%] ">
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
          slidesPerView={1}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Set active index on slide change
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className=" p-6 md:pl-[0px] w-[90%] md:w-[100%] rounded-lg flex flex-col items-start ">
                <div className="flex gap-[10px] justify-between w-[100%] md:w[50%] ">
                  <div className="flex gap-[10px]">
                    {/* Profile Picture */}
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {/* Testimonial Content */}
                    <div className="flex flex-col ">
                      <p className="text-lg font-montserrat font-semibold">
                        {testimonial.name}
                      </p>
                      {/* <p className="text-sm font-montserrat text-gray-500">
                        {testimonial.designation}
                      </p> */}
                    </div>
                  </div>
                  {/* Quotation Icon */}
                  {/* <div className="text-[90px] text-[black] text-end font-serif">”</div> */}
                  <span className="text-8xl ml-12 font-montserrat text-end font-bold transform rotate-240  ">
                    “
                  </span>
                </div>

                <p className="mt-2 text-[#8F8F8F] font-montserrat text-base">
                  “{testimonial.message}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex gap-[10px] items-center mt-4 justify-center  md:justify-start   ">
          <button className="prev-btn text-black rounded-full p-2">‹</button>
          {/* Display current slide number */}
          <div className="text-gray-500 text-sm">
            {activeIndex + 1} / {testimonials.length}
          </div>
          <button className="next-btn text-black rounded-full p-2">›</button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
"use client";

import { useState, useEffect } from "react";
import { Loader } from "../Loader";


export default function Videos() {
  const [pvideos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMoreVideos = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (isLoading) return <Loader />;

const videos = [
  { src: "https://www.youtube.com/embed/1c6vvs1-EN4", title: "أوكسفورد تيراس | استوديو حديث بإطلالة على المسبح" },
  { src: "https://www.youtube.com/embed/WIACQcJtzEo", title: "أوكسفورد تيراس | شقة استوديو في أوكسفورد تيراس من إيمان ديفيلوبرز" },
  { src: "https://www.youtube.com/embed/RmiHRbo7GiU", title: "بلو ووترز آيلاند | شقة مفروشة بالكامل من غرفتين + غرفة خادمة" },
  { src: "https://www.youtube.com/embed/Aj0FpRrExdQ", title: "إعمار | لايم غاردنز | دبي هيلز إستيت" },
  { src: "https://www.youtube.com/embed/LHSk5IDy4iE", title: "بنغاتي مرسيدس | يقع في قلب دبي" },
  { src: "https://www.youtube.com/embed/qn8-IBDK2T0", title: "فيلانوفا - أمارانتا | تاون هاوس 4 غرف" },
  { src: "https://www.youtube.com/embed/-BS-dMH5Zt0", title: "لكي 1 ريزيدنس" },
  { src: "https://www.youtube.com/embed/Eh7XTiJM26c", title: "قرية جميرا الدائرية (JVC) | مجتمع سكني شهير في دبي" },
];

  return (
    <div className="flex flex-col items-center mt-24 mb-16">
      <h2 className="text-center font-newsLetter text-[#8F8F8F] uppercase text-[25px] md:text-[40px] mb-8">
       مقاطع فيديو شعبية
      </h2>

      <div className="flex flex-wrap md:w-[90%] md:gap-[20px] justify-center">
        {/* {pvideos?.length === 0 && (
          <p className="text-center text-[16px] font-montserrat w-full flex justify-center text-gray-500">
            No Videos available at this moment
          </p>
        )} */}

        {videos.slice(0, visibleCount).map((video, index) => (
          <div key={index} className="md:w-[40%] rounded-lg overflow-hidden">
            <div className="relative">
              <iframe
                width="1280"
                height="720"
                src={video.src}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full rounded-[20px] h-[200px] md:h-[350px] my-8"
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        {visibleCount < videos.length && (
          <button
            onClick={loadMoreVideos}
            className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            تحميل المزيد
          </button>
        )}
      </div>
    </div>
  );
}

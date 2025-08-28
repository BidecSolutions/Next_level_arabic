"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "./GallerySlider.css";

import { Loader } from "@/components/WebsiteComponents/Loader";
import { Image_NotFound, Image_URL } from "@/config/constants";

const GallerySlider = ({ property }) => {
  const [activeCategory, setActiveCategory] = useState("Interior");
  const [media, setMedia] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (property?.meadias) {
      try {
        const parsedMedia =
          typeof property.meadias === "string"
            ? JSON.parse(property.meadias)
            : property.meadias;
        setMedia(parsedMedia);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [property]);

  if (!media) return <Loader />;

  const exteriorImages = media[0]?.exterior_images
    ? JSON.parse(media[0].exterior_images)
    : [];
  const interiorImages = media[0]?.interior_images
    ? JSON.parse(media[0].interior_images)
    : [];

  const mappedExteriorImages = exteriorImages.map((image) => ({
    src: image,
    alt: "Exterior Image",
  }));
  const mappedInteriorImages = interiorImages.map((image) => ({
    src: image,
    alt: "Interior Image",
  }));

  const sliderImages =
    activeCategory === "Interior" ? mappedInteriorImages : mappedExteriorImages;

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setZoomLevel(1);
  };

  const closeModal = () => setModalImage(null);
  const zoomIn = () => setZoomLevel((prev) => prev + 0.1);
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 1));

  return (
    <div className="max-w-full overflow-x-hidden flex flex-col items-center justify-center text-center mb-8">
      <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] font-newsLetter">
        PHOTO GALLERY
      </h2>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["Interior", "Exterior"].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-2 border border-[#A39D9D] rounded-md ${
              activeCategory === category
                ? "bg-[#8F8F8F] text-white"
                : "bg-white text-[#8F8F8F]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Swiper Slider */}
      <div className="slider-effectCoverflow relative w-full macbook:w-[80%]">
        <Swiper
          key={activeCategory}
          effect="coverflow"
          grabCursor
          centeredSlides
          spaceBetween={20}
          slidesPerView={2.2}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500 }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.2,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center swiper-slide-custom"
              onClick={() => openModal(`${Image_URL}/${image.src}`)}
            >
              <Image
                src={`${Image_URL}/${image.src}`}
                alt={image.alt}
                width={800}
                height={450}
                className="rounded-lg min-w-[250px] md:w-[600px] macbook:w-[800px] object-cover h-[300px] md:h-[450px] shadow-lg cursor-pointer"
                onError={(e) => (e.target.src = Image_NotFound)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <Image
              src={modalImage}
              alt="Zoomed"
              width={1200}
              height={800}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-w-[90vw] max-h-[90vh] transition-transform duration-300"
              onError={(e) => (e.target.src = Image_NotFound)}
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              ✖
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={zoomOut}
                className="text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                ➖
              </button>
              <button
                onClick={zoomIn}
                className="text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySlider;

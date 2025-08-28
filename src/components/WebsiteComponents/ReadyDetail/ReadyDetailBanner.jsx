"use client"; // ✅ required if you are using hooks (Next.js App Router)

import { useState } from "react";
import Image from "next/image";
import { Image_NotFound, Image_URL } from "@/config/constants";

const ReadyDetailBanner = ({ property }) => {
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.isArray(property.images)
    ? property.images
    : (() => {
        try {
          return property.images ? JSON.parse(property.images) : [];
        } catch {
          return [];
        }
      })();

  const openPhotosModal = () => setShowPhotosModal(true);
  const closePhotosModal = () => {
    setShowPhotosModal(false);
    setCurrentImageIndex(0);
  };

  const openVideoModal = () => setShowVideoModal(true);
  const closeVideoModal = () => setShowVideoModal(false);

  const goToNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const goToPrev = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMapClick = () => {
    if (property?.map_link) window.open(property.map_link, "_blank");
  };

  const getSrc = (path) =>
    path ? `${Image_URL}${path}` : Image_NotFound;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:max-w-7xl mx-auto md:mt-32 mb-10">
        {/* Main Large Image Section */}
        <div className="relative w-full h-[320px] sm:h-[300px] md:h-[450px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
          <div className="absolute z-10 inset-0 bg-opacity-10" />
          <Image
            src={getSrc(images?.[0]?.path)}
            alt="Main Property View"
            fill
            className="object-cover"
            onError={(e) => (e.currentTarget.src = Image_NotFound)}
          />
          <div className="absolute z-10 bottom-4 left-4 flex space-x-2">
            <button
              onClick={openPhotosModal}
              className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              📷 {images.length} photos
            </button>
            <button
              onClick={handleMapClick}
              className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              🗺️ Map
            </button>
          </div>
        </div>

        {/* Side Images Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          {/* Top Right Image */}
          <div className="relative w-full h-[160px] sm:h-[240px] md:h-[300px] lg:h-[290px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={getSrc(images?.[1]?.path)}
              alt="Type"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={openPhotosModal}
                className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                View All Photos
              </button>
            </div>
          </div>

          {/* Third image with overlay count */}
          {images.length > 2 && (
            <div className="hidden md:block relative w-full h-[160px] sm:h-[240px] md:h-[300px] lg:h-[290px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={getSrc(images?.[2]?.path)}
                alt="Kitchen View"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0  bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  onClick={openPhotosModal}
                  className="text-black text-xl md:text-2xl bg-white bg-opacity-50 px-6 py-3 rounded-full cursor-pointer"
                >
                  {images.length - 1}+
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photos Modal */}
      {showPhotosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            onClick={closePhotosModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          >
            &times;
          </button>
          <div className="relative w-full h-full max-w-screen-lg">
            <Image
              src={getSrc(images?.[currentImageIndex]?.path)}
              alt={`Property image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 pb-2 flex items-center justify-center text-white text-3xl rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors"
            >
              &#8249;
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 pb-2 flex items-center justify-center text-white text-3xl rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors"
            >
              &#8250;
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          >
            &times;
          </button>
          <div className="w-full px-4 flex justify-center">
            <div className="w-[90vw] md:w-[60%] aspect-video overflow-hidden">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: property?.video?.[0]?.path || "",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadyDetailBanner;

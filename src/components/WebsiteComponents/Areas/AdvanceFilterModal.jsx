"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./PriceRangeFilter.css";
import { getAmenities, getAreas, getCommunities, getDevelopers } from "@/lib/api/areas.server";

export default function AdvanceFilterModal({
  handleSubmit,
  show,
  isOpen,
  onClose,
  setSelectedAmenities,
  selectedAmenities,
  setSelectedCommunity,
  selectedCommunity,
  setSelectedArea,
  selectedArea,
  setSelectedDeveloper,
  selectedDeveloper,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  hide,
}) {
  if (!isOpen) return null;

  const min = 0;
  const max = 500_000_000;

  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedAreaSize, setSelectedAreaSize] = useState("");
  const [area, setArea] = useState([]);
  const [community, setCommunity] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [amenities, setAmenities] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [communitiesRes, areaRes, developersRes, amenitiesRes] =
//           await Promise.all([
//             axios.public.get("user/communities"),
//             axios.public.get("user/areas"),
//             axios.public.get("user/developers"),
//             axios.public.get("user/features"),
//           ]);

//         if (communitiesRes.data?.data) {
//           setCommunity(
//             communitiesRes.data.data.filter((p) => p.status === 1)
//           );
//         }
//         if (areaRes.data?.data) {
//           setArea(areaRes.data.data.filter((p) => p.status === 1));
//         }
//         if (developersRes.data?.data) {
//           setDevelopers(
//             developersRes.data.data.filter((p) => p.status === 1)
//           );
//         }
//         if (amenitiesRes.data?.data) {
//           setAmenities(
//             amenitiesRes.data.data.filter((p) => p.status === 1)
//           );
//         }
//       } catch (error) {
//         console.error("APIs Error", error);
//       }
//     };

//     fetchData();
//   }, []);

useEffect(() => {
  const fetchData = async () => {
    const [communityData, areaData, developerData, amenitiesData] = await Promise.all([
      getCommunities(),
      getAreas(),
      getDevelopers(),
      getAmenities(),
    ]);
    setCommunity(communityData);
    setArea(areaData);
    setDevelopers(developerData);
    setAmenities(amenitiesData);
  };

  fetchData();
}, []);

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-start z-20 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative mx-4 mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute z-10 top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          {/* Developer */}
          <div>
            <label className="block text-gray-600 mb-1">المطور</label>
            {hide === "developer" ? (
              <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100 overflow-hidden">
                {selectedDeveloper
                  ? developers.find((d) => d.id === selectedDeveloper)?.name
                  : "قائمة المطورين"}
              </div>
            ) : (
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
              >
                <option value="">قائمة المطورين</option>
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-600 mb-1">المناطق</label>
            {hide === "area" ? (
              <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100 overflow-hidden">
                {selectedArea
                  ? area.find((a) => a.id === selectedArea)?.name
                  : "قائمة المناطق"}
              </div>
            ) : (
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">قائمة المناطق</option>
                {area.map((ar) => (
                  <option key={ar.id} value={ar.id}>
                    {ar.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Community */}
          <div>
            <label className="block text-gray-600 mb-1">مجتمع</label>
            {hide === "community" ? (
              <div className="w-full border h-10 border-gray-300 rounded p-2 bg-gray-100 overflow-hidden">
                {selectedCommunity
                  ? community.find((c) => c.id === selectedCommunity)?.name
                  : "قائمة المجتمع"}
              </div>
            ) : (
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
              >
                <option value="">قائمة المجتمع</option>
                {community.map((com) => (
                  <option key={com.id} value={com.id}>
                    {com.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Amenities */}
          {!show && (
            <div>
              <label className="block text-gray-600 mb-1">وسائل الراحة</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={selectedAmenities}
                onChange={(e) => setSelectedAmenities(e.target.value)}
              >
                <option value="">قائمة المرافق</option>
                {amenities.map((am) => (
                  <option key={am.id} value={am.id}>
                    {am.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">منخفض إلى مرتفع</label>
            <div className="flex justify-start gap-5 py-3">
              <h1 className="text-[#555] text-xs">AED {minPrice}</h1>-
              <h1 className="text-[#555] text-xs">AED {maxPrice}</h1>
            </div>
            <div className="relative mb-3 h-6">
              <input
                type="range"
                min={min}
                max={max}
                value={minPrice}
                onChange={handleMinPriceChange}
                className={`absolute w-full h-[2px] appearance-none ${styles["slider-thumb-custom"]} ${styles["min-thumb"]}`}
                style={{ zIndex: minPrice > maxPrice ? 5 : 3 }}
              />
              <input
                type="range"
                min={min}
                max={max}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className={`absolute w-full h-[2px] appearance-none ${styles["slider-thumb-custom"]} ${styles["max-thumb"]}`}
                style={{ zIndex: minPrice < maxPrice ? 5 : 3 }}
              />
              <div className="absolute top-0 h-[2px] w-full bg-gray-300 rounded"></div>
              <div
                className="absolute top-0 h-[2px] bg-[#555] rounded"
                style={{
                  left: `${((minPrice - min) / (max - min)) * 100}%`,
                  right: `${100 - ((maxPrice - min) / (max - min)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Submit */}
          <div className="mb-4 flex flex-col justify-end items-end">
            <button
              className="border h-fit md:w-52 md:ml-20 text-sm md:text-md border-gray-300 bg-[#8F8F8F] hover:bg-transparent font-montserrat text-white hover:text-gray-500 px-4 py-2 rounded-md"
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              بحث متقدم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

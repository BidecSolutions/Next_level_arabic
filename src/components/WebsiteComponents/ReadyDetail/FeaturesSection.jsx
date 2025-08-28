"use client"
import React, { useState } from "react";
import {
  FaCouch,
  FaSnowflake,
  FaBath,
  FaCarAlt,
  FaSwimmer,
  FaShieldAlt,
  FaDog,
  FaWifi,
  FaUserNurse,
  FaFireAlt,
  FaPlug,
  FaBuilding,
  FaHandsHelping,
  FaHeart,
  FaMosque,
  FaDoorOpen,
  FaUtensils,
  FaTrash,
  FaTools,
  FaBroom,
  FaBriefcase,
  FaChalkboardTeacher,
  FaUserShield,
  FaVideo,
  FaTshirt,
  FaSoap,
  FaBroadcastTower,
  FaSatellite,
  FaPhoneAlt,
  FaUniversity,
  FaClock,
  FaPaw,
  FaFemale,
  FaLayerGroup,
  FaEye,
  FaKey,
  FaTree,
} from "react-icons/fa";

export const FEATURES = [
  { key: "Furnished", label: "Furnished", icon: FaCouch, type: "boolean", category: "Features" },
  { key: "Electricity Backup", label: "Electricity Backup", icon: FaPlug, type: "boolean", category: "Features" },
  { key: "Parking Spaces", label: "Parking Spaces", icon: FaCarAlt, type: "string", category: "Features" },
  { key: "Centrally Air-Conditioned", label: "Centrally Air-Conditioned", icon: FaSnowflake, type: "boolean", category: "Features" },
  { key: "Central Heating", label: "Central Heating", icon: FaFireAlt, type: "boolean", category: "Features" },
  { key: "Double Glazed Windows", label: "Double Glazed Windows", icon: FaBuilding, type: "boolean", category: "Features" },
  { key: "Storage Areas", label: "Storage Areas", icon: FaLayerGroup, type: "boolean", category: "Features" },
  { key: "Study Room", label: "Study Room", icon: FaHeart, type: "boolean", category: "Features" },
  { key: "Balcony or Terrace", label: "Balcony or Terrace", icon: FaDoorOpen, type: "boolean", category: "Building" },
  { key: "Lobby in Building", label: "Lobby in Building", icon: FaBuilding, type: "boolean", category: "Building" },
  { key: "Service Elevators", label: "Service Elevators", icon: FaHandsHelping, type: "boolean", category: "Building" },
  { key: "Completion Year", label: "Completion Year", icon: FaClock, type: "string", category: "Building" },
  { key: "Prayer Room", label: "Prayer Room", icon: FaMosque, type: "boolean", category: "Building" },
  { key: "Reception/Waiting Room", label: "Reception/Waiting Room", icon: FaUserNurse, type: "boolean", category: "Building" },
  { key: "Flooring", label: "Flooring", icon: FaLayerGroup, type: "boolean", category: "Building" },
  { key: "First Aid Medical Center", label: "First Aid Medical Center", icon: FaUserNurse, type: "boolean", category: "Health and Fitness" },
  { key: "Gym or Health Club", label: "Gym or Health Club", icon: FaSwimmer, type: "boolean", category: "Health and Fitness" },
  { key: "Facilities for Disabled", label: "Facilities for Disabled", icon: FaHandsHelping, type: "boolean", category: "Health and Fitness" },
  { key: "Swimming Pool", label: "Swimming Pool", icon: FaSwimmer, type: "boolean", category: "Health and Fitness" },
  { key: "Jacuzzi", label: "Jacuzzi", icon: FaBath, type: "boolean", category: "Health and Fitness" },
  { key: "Sauna", label: "Sauna", icon: FaBath, type: "boolean", category: "Health and Fitness" },
  { key: "Steam Room", label: "Steam Room", icon: FaBath, type: "boolean", category: "Health and Fitness" },
  { key: "Day Care Center", label: "Day Care Center", icon: FaUserNurse, type: "boolean", category: "Recreation and Family" },
  { key: "Kids Play Area", label: "Kids Play Area", icon: FaHeart, type: "boolean", category: "Recreation and Family" },
  { key: "Lawn or Garden", label: "Lawn or Garden", icon: FaTree, type: "boolean", category: "Recreation and Family" },
  { key: "Barbeque Area", label: "Barbeque Area", icon: FaFireAlt, type: "boolean", category: "Recreation and Family" },
  { key: "Cafeteria or Canteen", label: "Cafeteria or Canteen", icon: FaUtensils, type: "boolean", category: "Recreation and Family" },
  { key: "Waste Disposal", label: "Waste Disposal", icon: FaTrash, type: "boolean", category: "Cleaning and Maintenance" },
  { key: "Maintenance Staff", label: "Maintenance Staff", icon: FaTools, type: "boolean", category: "Cleaning and Maintenance" },
  { key: "Cleaning Services", label: "Cleaning Services", icon: FaBroom, type: "boolean", category: "Cleaning and Maintenance" },
  { key: "Business Center", label: "Business Center", icon: FaBriefcase, type: "boolean", category: "Business and Security" },
  { key: "Conference Room", label: "Conference Room", icon: FaChalkboardTeacher, type: "boolean", category: "Business and Security" },
  { key: "Security Staff", label: "Security Staff", icon: FaUserShield, type: "boolean", category: "Business and Security" },
  { key: "CCTV Security", label: "CCTV Security", icon: FaVideo, type: "boolean", category: "Business and Security" },
  { key: "Shared Kitchen", label: "Shared Kitchen", icon: FaUtensils, type: "boolean", category: "Laundry and Kitchen" },
  { key: "Laundry Room", label: "Laundry Room", icon: FaTshirt, type: "boolean", category: "Laundry and Kitchen" },
  { key: "Laundry Facility", label: "Laundry Facility", icon: FaSoap, type: "boolean", category: "Laundry and Kitchen" },
  { key: "Broadband Internet", label: "Broadband Internet", icon: FaBroadcastTower, type: "boolean", category: "Technology" },
  { key: "Satellite/Cable TV", label: "Satellite/Cable TV", icon: FaSatellite, type: "boolean", category: "Technology" },
  { key: "Intercom", label: "Intercom", icon: FaPhoneAlt, type: "boolean", category: "Technology" },
  { key: "ATM Facility", label: "ATM Facility", icon: FaUniversity, type: "boolean", category: "Miscellaneous" },
  { key: "24 Hours Concierge", label: "24 Hours Concierge", icon: FaClock, type: "boolean", category: "Miscellaneous" },
  { key: "Pets Allowed", label: "Pets Allowed", icon: FaPaw, type: "boolean", category: "Miscellaneous" },
  { key: "Maids Room", label: "Maids Room", icon: FaFemale, type: "boolean", category: "Miscellaneous" },
  { key: "Floor", label: "Floor", icon: FaLayerGroup, type: "string", category: "Miscellaneous" },
  { key: "View", label: "View", icon: FaEye, type: "boolean", category: "Miscellaneous" },
  { key: "Freehold", label: "Freehold", icon: FaKey, type: "boolean", category: "Miscellaneous" },
];

const categorizeFeatures = () => {
  const categories = {
    Features: [],
    Building: [],
    "Health and Fitness": [],
    "Recreation and Family": [],
    "Cleaning and Maintenance": [],
    "Business and Security": [],
    "Laundry and Kitchen": [],
    Technology: [],
    Miscellaneous: [],
  };

  FEATURES.forEach((f) => {
    if (categories[f.category]) {
      categories[f.category].push(f);
    }
  });

  return categories;
};

const FeaturesSection = ({ features = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const groupedFeatures = categorizeFeatures();

  const visibleFeatures = FEATURES.filter((f) => {
    const value = features?.[f.key];
    if (f.type === "boolean") return value === true || value === "true";
    return value && value !== "";
  });

  const extraCount = visibleFeatures.length > 4 ? visibleFeatures.length - 4 : 0;

  return (
    <div className="md:pb-4">
      <h2 className="text-xl md:text-3xl font-newsLetter text-[#A39D9D] mb-6">Features / Amenities</h2>
      <div className="flex flex-wrap gap-4">
        {visibleFeatures.slice(0, 4).map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-gray-100 rounded shadow text-center text-xs w-32 flex flex-col justify-center items-center"
            >
              <div className="text-2xl mb-2">
                <Icon />
              </div>
              <div className="font-medium">
                {feature.type === "string"
                  ? `${feature.label}: ${features?.[feature.key]}`
                  : feature.label}
              </div>
            </div>
          );
        })}

        {extraCount > 0 && (
          <div
            onClick={() => setIsOpen(true)}
            className="py-2 macbook:text-[35px] px-[14px] justify-center bg-[#A39D9D] text-white hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] rounded-md mb-8 cursor-pointer"
          >
            + {extraCount} more amenities
          </div>
        )}
      </div>

      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/20 bg-opacity-50 flex justify-center items-center p-4"
        >
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-gray-500 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-xl md:text-3xl text-center font-newsLetter text-[#A39D9D] mb-6">All Amenities</h3>

            {Object.entries(groupedFeatures).map(([category, featuresInCat]) => {
              const valid = featuresInCat.filter((f) => {
                const value = features?.[f.key];
                if (f.type === "boolean") return value === true || value === "true";
                return value && value !== "";
              });

              if (!valid.length) return null;

              return (
                <div key={category} className="mb-8">
                  <h4 className="text-sm md:text-lg font-newsLetter text-[#A39D9D] mb-6">{category}</h4>
                  <div className="flex flex-wrap gap-4">
                    {valid.map((f, idx) => {
                      const Icon = f.icon;
                      return (
                        <div
                          key={idx}
                          className="w-32 p-4 bg-gray-50 border rounded text-center text-sm flex flex-col items-center"
                        >
                          <div className="text-2xl text-gray-600 mb-2">
                            <Icon />
                          </div>
                          <div className="text-gray-800">
                            {f.type === "string"
                              ? `${f.label}: ${features?.[f.key]}`
                              : f.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesSection;

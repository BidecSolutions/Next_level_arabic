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
  { key: "Furnished", label: "مفروش", icon: FaCouch, type: "boolean", category: "المميزات" },
  { key: "Electricity Backup", label: "مولد احتياطي للكهرباء", icon: FaPlug, type: "boolean", category: "المميزات" },
  { key: "Parking Spaces", label: "مواقف سيارات", icon: FaCarAlt, type: "string", category: "المميزات" },
  { key: "Centrally Air-Conditioned", label: "تكييف مركزي", icon: FaSnowflake, type: "boolean", category: "المميزات" },
  { key: "Central Heating", label: "تدفئة مركزية", icon: FaFireAlt, type: "boolean", category: "المميزات" },
  { key: "Double Glazed Windows", label: "نوافذ مزدوجة الزجاج", icon: FaBuilding, type: "boolean", category: "المميزات" },
  { key: "Storage Areas", label: "مساحات تخزين", icon: FaLayerGroup, type: "boolean", category: "المميزات" },
  { key: "Study Room", label: "غرفة دراسة", icon: FaHeart, type: "boolean", category: "المميزات" },

  { key: "Balcony or Terrace", label: "شرفة أو تراس", icon: FaDoorOpen, type: "boolean", category: "المبنى" },
  { key: "Lobby in Building", label: "ردهة في المبنى", icon: FaBuilding, type: "boolean", category: "المبنى" },
  { key: "Service Elevators", label: "مصاعد خدمة", icon: FaHandsHelping, type: "boolean", category: "المبنى" },
  { key: "Completion Year", label: "سنة الإنجاز", icon: FaClock, type: "string", category: "المبنى" },
  { key: "Prayer Room", label: "غرفة صلاة", icon: FaMosque, type: "boolean", category: "المبنى" },
  { key: "Reception/Waiting Room", label: "غرفة استقبال / انتظار", icon: FaUserNurse, type: "boolean", category: "المبنى" },
  { key: "Flooring", label: "أرضيات", icon: FaLayerGroup, type: "boolean", category: "المبنى" },

  { key: "First Aid Medical Center", label: "مركز إسعافات أولية", icon: FaUserNurse, type: "boolean", category: "الصحة واللياقة" },
  { key: "Gym or Health Club", label: "نادي صحي أو رياضي", icon: FaSwimmer, type: "boolean", category: "الصحة واللياقة" },
  { key: "Facilities for Disabled", label: "مرافق لذوي الاحتياجات الخاصة", icon: FaHandsHelping, type: "boolean", category: "الصحة واللياقة" },
  { key: "Swimming Pool", label: "مسبح", icon: FaSwimmer, type: "boolean", category: "الصحة واللياقة" },
  { key: "Jacuzzi", label: "جاكوزي", icon: FaBath, type: "boolean", category: "الصحة واللياقة" },
  { key: "Sauna", label: "ساونا", icon: FaBath, type: "boolean", category: "الصحة واللياقة" },
  { key: "Steam Room", label: "غرفة بخار", icon: FaBath, type: "boolean", category: "الصحة واللياقة" },

  { key: "Day Care Center", label: "مركز رعاية أطفال", icon: FaUserNurse, type: "boolean", category: "الترفيه والعائلة" },
  { key: "Kids Play Area", label: "منطقة لعب للأطفال", icon: FaHeart, type: "boolean", category: "الترفيه والعائلة" },
  { key: "Lawn or Garden", label: "حديقة أو عشب", icon: FaTree, type: "boolean", category: "الترفيه والعائلة" },
  { key: "Barbeque Area", label: "منطقة شواء", icon: FaFireAlt, type: "boolean", category: "الترفيه والعائلة" },
  { key: "Cafeteria or Canteen", label: "كافتيريا أو مقصف", icon: FaUtensils, type: "boolean", category: "الترفيه والعائلة" },

  { key: "Waste Disposal", label: "التخلص من النفايات", icon: FaTrash, type: "boolean", category: "التنظيف والصيانة" },
  { key: "Maintenance Staff", label: "فريق صيانة", icon: FaTools, type: "boolean", category: "التنظيف والصيانة" },
  { key: "Cleaning Services", label: "خدمات تنظيف", icon: FaBroom, type: "boolean", category: "التنظيف والصيانة" },

  { key: "Business Center", label: "مركز أعمال", icon: FaBriefcase, type: "boolean", category: "الأعمال والأمن" },
  { key: "Conference Room", label: "غرفة اجتماعات", icon: FaChalkboardTeacher, type: "boolean", category: "الأعمال والأمن" },
  { key: "Security Staff", label: "طاقم أمن", icon: FaUserShield, type: "boolean", category: "الأعمال والأمن" },
  { key: "CCTV Security", label: "أمن بكاميرات مراقبة", icon: FaVideo, type: "boolean", category: "الأعمال والأمن" },

  { key: "Shared Kitchen", label: "مطبخ مشترك", icon: FaUtensils, type: "boolean", category: "المطبخ والغسيل" },
  { key: "Laundry Room", label: "غرفة غسيل", icon: FaTshirt, type: "boolean", category: "المطبخ والغسيل" },
  { key: "Laundry Facility", label: "مرفق غسيل", icon: FaSoap, type: "boolean", category: "المطبخ والغسيل" },

  { key: "Broadband Internet", label: "إنترنت عالي السرعة", icon: FaBroadcastTower, type: "boolean", category: "التكنولوجيا" },
  { key: "Satellite/Cable TV", label: "تلفاز فضائي / كابل", icon: FaSatellite, type: "boolean", category: "التكنولوجيا" },
  { key: "Intercom", label: "جهاز الاتصال الداخلي", icon: FaPhoneAlt, type: "boolean", category: "التكنولوجيا" },

  { key: "ATM Facility", label: "خدمة الصراف الآلي", icon: FaUniversity, type: "boolean", category: "متفرقات" },
  { key: "24 Hours Concierge", label: "خدمة الاستقبال 24 ساعة", icon: FaClock, type: "boolean", category: "متفرقات" },
  { key: "Pets Allowed", label: "مسموح بالحيوانات الأليفة", icon: FaPaw, type: "boolean", category: "متفرقات" },
  { key: "Maids Room", label: "غرفة خادمة", icon: FaFemale, type: "boolean", category: "متفرقات" },
  { key: "Floor", label: "الطابق", icon: FaLayerGroup, type: "string", category: "متفرقات" },
  { key: "View", label: "إطلالة", icon: FaEye, type: "boolean", category: "متفرقات" },
  { key: "Freehold", label: "تمليك حر", icon: FaKey, type: "boolean", category: "متفرقات" },
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
      <h2 className="text-xl md:text-3xl font-newsLetter text-[#A39D9D] mb-6">المميزات / المرافق</h2>
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
            + {extraCount} المزيد من وسائل الراحة
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

            <h3 className="text-xl md:text-3xl text-center font-newsLetter text-[#A39D9D] mb-6">جميع وسائل الراحة</h3>

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

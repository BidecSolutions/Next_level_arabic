'use client';

import React, { useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
// Import Next.js Image component for optimization
import Image from 'next/image';
// import axios from "../../../Utils/axios";
// import ReactCountryDropdown from "react-country-dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { Image_NotFound, Image_URL } from "@/config/constants";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";
import FloorBrochureRegisterForm from "../Forms/FloorBrochureRegisterForm";

const FloorPlanSection = ({ floorInfos = [], property }) => {
  const [selectedFloor, setSelectedFloor] = useState(floorInfos[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFloor, setIsModalOpenFloor] = useState(false);
  const [loading, setLoading] = useState(false);
  const closeModal = () => setModalImage(null);
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    floorInfos[0]?.id || ""
  );
  const [selectedFloorName, setSelectedFloorName] = useState(
    floorInfos[0]?.no_of_bedrooms || ""
  );
  const [code, setCode] = useState("971");
  const recaptcha = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [media, setMedia] = useState(null);

  useEffect(() => {
    if (property?.meadias) {
      try {
        const parsedMedia =
          typeof property?.meadias === "string"
            ? JSON.parse(property?.meadias)
            : property?.meadias;
        setMedia(parsedMedia);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [property?.meadias]);

  if (!floorInfos.length) {
    return <div>Loading or No Floors Available</div>;
  }

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setZoomLevel(1);
  };

  const zoomIn = () => setZoomLevel((prev) => prev + 0.1);
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 1));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModalFloor = () => setIsModalOpenFloor(true);
  const handleCloseModalFloor = () => setIsModalOpenFloor(false);

  const handleSelectFloor = (bedrooms) => {
    const selected = floorInfos?.find(
      (floor) => floor?.id === bedrooms
    );
    setSelectedBedrooms(bedrooms);
    setSelectedFloorName(selected?.no_of_bedrooms || "");
    setSelectedFloor(selected || null);
  };

  const selectedImages = selectedFloor?.floor_images
    ? JSON.parse(selectedFloor.floor_images)
    : [];

  if (!media) return <div>Loading...</div>;

  const mainImages = media[0]?.main_image
    ? JSON.parse(media[0]?.main_image)
    : [];
  const pdf = media[0]?.brochure_pdf ? JSON.parse(media[0].brochure_pdf) : [];
  const floorPdf = media[0]?.floor_brochure_pdf
    ? JSON.parse(media[0]?.floor_brochure_pdf)
    : [];

  const mainImage = mainImages?.length ? `${Image_URL}${mainImages[0]}` : null;
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;
  const FloorPDF = floorPdf.length ? `${Image_URL}${floorPdf[0]}` : null;

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const captchaValue = recaptcha.current?.getValue();

//     if (!captchaValue) {
//       alert(" Please Verify the Captcha");
//       return;
//     }
//     const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
//     const isValid = isValidPhoneNumber(fullPhone, code);

//     if (!isValid) {
//       toast.error("Invalid phone number for selected country.");
//       return;
//     }
//     setLoading(true);

//     try {
//       await axios.public.post("user/request-broucher-downloads/store", {
//         property_detail_id: property.id,
//         broucher_url: PDF,
//         name: formData.name,
//         email: formData.email,
//         phone_no: formData.phone,
//         country_code: code,
//         description: formData.description, // Corrected from formData2
//         agent_id: property?.agent_id,
//         developer_id: property?.developer_id,
//         community_id: property?.community_id,
//         area_id: property?.addresses?.area_id,
//         subject: `Project Detail Page Of ${property?.property_name}`
//       });

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         description: "",
//       });

//       if (PDF) {
//         const link = document.createElement("a");
//         link.href = `${PDF}`;
//         link.target = "_blank";
//         link.click();
//       } else {
//         alert("Brochure PDF is not available now. It will be sent soon.");
//       }

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       const { errors } = error.response?.data || {};
//       if (errors && typeof errors === "object") {
//         const errorMessages = Object.values(errors)
//           .map((errArray) => errArray.join(" "))
//           .join("\n");
//         alert(errorMessages);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitFloor = async (e) => {
//     e.preventDefault();
//     const captchaValue = recaptcha.current?.getValue();

//     if (!captchaValue) {
//       alert(" Please Verify the Captcha");
//       return;
//     }
//     const fullPhone = `+${code}${formData2.phone.replace(/\s+/g, "")}`;
//     const isValid = isValidPhoneNumber(fullPhone, code);

//     if (!isValid) {
//       toast.error("Invalid phone number for selected country.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.public.post("user/request-broucher-downloads/store", {
//         property_detail_id: property.id,
//         broucher_url: FloorPDF,
//         name: formData2.name,
//         email: formData2.email,
//         phone_no: formData2.phone,
//         country_code: code,
//         description: formData2.description,
//         agent_id: property?.agent_id,
//         developer_id: property?.developer_id,
//         community_id: property?.community_id,
//         area_id: property?.addresses?.area_id,
//         subject: `Project Detail Page Of ${property?.property_name} ( Floor Section )`
//       });

//       setFormData2({
//         name: "",
//         email: "",
//         phone_no: "",
//         description: "",
//       });

//       if (FloorPDF) {
//         const link = document.createElement("a");
//         link.href = `${FloorPDF}`;
//         link.target = "_blank";
//         link.click();
//       } else {
//         alert("Brochure PDF is not available now. It will be sent soon.");
//       }

//       setIsModalOpenFloor(false);
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       const { errors } = error.response?.data || {};
//       if (errors && typeof errors === "object") {
//         const errorMessages = Object.values(errors)
//           .map((errArray) => errArray.join(" "))
//           .join("\n");
//         alert(errorMessages);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

  if (property?.property_have_floors === 2) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col md:flex-row justify-around">
        {/* Left Section with Property Images */}
        <div className="hidden md:flex w-full md:w-[40%] macbook:w-[45%] gap-4">
          <Image
            src={
              selectedImages.length > 0
                ? `${Image_URL}/${selectedImages[0]}`
                : Image_NotFound
            }
            alt={`Floor Plan ${selectedBedrooms} Bedrooms`}
            className="h-[400px] cursor-pointer w-[450px] md:h-[400px] macbook:w-[600px] macbook:h-full object-cover rounded-lg shadow-md"
            onClick={() => openModal(`${Image_URL}/${selectedImages[0]}`)}
            width={600} // Set appropriate width and height for optimization
            height={400}
            onError={(e) => {
              e.target.src = Image_NotFound;
            }}
          />
        </div>

        {/* Right Section with Text and Buttons */}
        <div className="flex flex-col items-center md:items-start w-full md:w-[40%] macbook:w-[35%] macbook:justify-center macbook:gap-[30px] gap-[10px] mt8 md:mt-0 md:pl-8">
          <p className="text-2xl md:text-3xl text-center md:text-start text-[#8F8F8F] macbook:text-[45px] macbook:leading-[45px] uppercase font-newsLetter">
            خطط الكلمة من {property?.property_name}
          </p>

          {/* Bedroom Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            {floorInfos?.map((floor) => (
              <button
                key={floor?.id}
                onClick={() => handleSelectFloor(floor?.id)}
                className={`px-5 py-2 md:w-[170px] macbook:py-4 macbook:px-8 macbook:text-[27px] rounded-lg border border-[#A39D9D] ${selectedBedrooms === floor?.id
                    ? "bg-[#A39D9D] text-white"
                    : "text-[#A39D9D]"
                  }`}
              >
                {floor?.no_of_bedrooms}
              </button>
            ))}
          </div>

          <div className="flex md:hidden w-full">
            {selectedImages?.length > 0 ? (
              <Image
                src={`${Image_URL}/${selectedImages[0]}`}
                alt={`Floor Plan ${selectedBedrooms} Bedroom`}
                className="h-[400px] cursor-pointer w-[450px] md:h-[400px] macbook:w-[600px] macbook:h-full object-cover rounded-lg shadow-md"
                onClick={() => openModal(`${Image_URL}/${selectedImages[0]}`)}
                width={600}
                height={400}
                onError={(e) => {
                  e.target.src = Image_NotFound;
                }}
              />
            ) : (
              <Image
                src={Image_NotFound}
                alt="Property"
                className="max-w-[650px] max-h-[350px] object-cover rounded-lg shadow-md"
                width={650}
                height={350}
              />
            )}
          </div>

          {/* Villa Details */}
          <div className="mt-6 text-[#A39D9D]">
            <p className="text-[25px] text-center md:text-start macbook:text-[40px]">
              {selectedFloorName}
            </p>
            <p className="text-[#555555] text-center md:text-start text-[18px] macbook:text-[35px]">
              Total: {selectedFloor?.floor_size || "لا يوجد"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-1 flex flex-col gap-1">
            <a
              className="mt-4 px-6 py-3 macbook:py-4 cursor-pointer macbook:px-8 macbook:text-[27px] bg-[#A39D9D] text-white hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] rounded-lg shadow-md"
              onClick={handleOpenModalFloor}
            >
              افتح جميع مخططات الطوابق
            </a>
            <a
              onClick={handleOpenModal}
              className="mt-4 px-3 py-3 cursor-pointer macbook:py-4 macbook:px-8 macbook:text-[27px] bg-white text-[#A39D9D] gap-[10px] rounded-lg shadow-md border border-[#A39D9D] flex items-center"
            >
              <IoCloudDownloadOutline className="text-[20px] macbook:text-[18px]" />
              تحميل الكتيب
            </a>
          </div>
        </div>
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <Image
              src={modalImage}
              alt="Zoomed"
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-w-[90vw] max-h-[90vh] transition-transform duration-300"
              width={1000}
              height={1000}
              onError={(e) => {
                e.target.src = Image_NotFound;
              }}
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
      {/* Modal for Brochure Download */}
       <BrochureRegisterForm
     isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={`${property?.property_name} Detail Page`}
     />
      {/* Modal for Floor Brochure Download */}
     <FloorBrochureRegisterForm
     isOpen={isModalOpenFloor}
        onClose={() => setIsModalOpenFloor(false)}
        page={`${property?.property_name} Detail Page`}
     />
    </div>
  );
};

export default FloorPlanSection;
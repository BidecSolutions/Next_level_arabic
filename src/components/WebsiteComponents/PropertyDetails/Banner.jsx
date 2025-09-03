"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import axios from "axios"; // Adjust path
import ParseBody from "../HomeComponents/ParseBody";
import { Loader } from "../Loader";
import dynamic from "next/dynamic";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { Image_URL } from "@/config/constants";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";

// Dynamically import ReactCountryDropdown so SSR won't break
// const ReactCountryDropdown = dynamic(
//   () => import("react-country-dropdown"),
//   { ssr: false }
// );

const Banner = ({ property }) => {
  const [media, setMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("971");
  const recaptcha = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

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

  const mainImages = media[0]?.main_image
    ? JSON.parse(media[0].main_image)
    : [];
  const pdf = media[0]?.brochure_pdf ? JSON.parse(media[0].brochure_pdf) : [];

  const mainImage = mainImages.length ? `${Image_URL}${mainImages[0]}` : null;
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const shareData = {
        title: "محتوى مذهل",
        text: "تعرف على هذا المشروع المذهل",
        url: window.location.href,
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Error sharing:", err);
        }
      } else {
        alert("لا يدعم هذا المتصفح المشاركة.");
      }
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const captchaValue = recaptcha.current?.getValue();
//     if (!captchaValue) {
//       alert("Please verify the Captcha");
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
//         description: formData.description,
//         agent_id: property?.agent_id,
//         developer_id: property?.developer_id,
//         community_id: property?.community_id,
//         area_id: property?.addresses?.area_id,
//         subject: `Project Detail Page Of ${property?.property_name}`,
//       });

//       setFormData({ name: "", email: "", phone: "", description: "" });

//       if (PDF) {
//         const link = document.createElement("a");
//         link.href = PDF;
//         link.target = "_blank";
//         link.click();
//       } else {
//         alert("Brochure PDF is not available now. It will be sent soon.");
//       }

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       const { errors, message } = error.response?.data || {};
//       if (errors && typeof errors === "object") {
//         const errorMessages = Object.values(errors)
//           .map((errArray) => errArray.join(" "))
//           .join("\n");
//         alert(errorMessages);
//       } else {
//         alert(message || "Network error. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="flex justify-center pb-[10rem] text-white">
      <div
        className="relative h-[34rem] md:h-[700px] w-[90%] md:w-[95%] md:pt-[200px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col justify-center md:justify-start"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
            mainImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXcB8kmCDKILwOjlKT8LCcCflFgH9LJnAZDuLnZ5tAsa2-oFQsvD2A37DxYCmeNrvw8PI&usqp=CAU"
          })`,
        }}
      >
        <div className="flex md:pl-[100px] gap-[10px] left-[10%] md:w-[50%] items-center md:items-start flex-col">
          <div className="flex w-[90%] flex-col gap-[20px]">
            <h1 className="text-center md:text-start text-[26px] md:text-[45px] font-newsLetter">
              {property?.property_name || "اسم العقار"}
            </h1>
            <div className="md:w-[150%] text-[16px] md:text-[18px] h-12 md:h-32 overflow-hidden font-montserrat font-light">
              {property?.property_introduction ? (
                <ParseBody body={property.property_introduction} />
              ) : (
                "مقدمة الملكية"
              )}
            </div>
          </div>

          <div className="flex w-full flex-wrap gap-[15px] mt-8">
            <a
              onClick={handleOpenModal}
              className="px-[8px] py-[10px] cursor-pointer text-[12px] md:px-4 bg-[#A39D9D] border border-[#A39D9D] hover:bg-transparent flex items-center gap-[10px] text-white rounded-[5px]"
            >
              <IoCloudDownloadOutline className="text-[20px]" />
              تحميل الكتيب
            </a>
            <button
              className="px-[18px] py-[10px] text-[12px] md:px-4 flex items-center gap-[10px] border border-white hover:border-[#A39D9D]"
              onClick={handleShare}
            >
              <CiShare2 className="text-[20px]" />
              يشارك
            </button>
          </div>
        </div>
      </div>

     <BrochureRegisterForm
     isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={`${property?.property_name} Detail Page`}
     />
    </div>
  );
};

export default Banner;

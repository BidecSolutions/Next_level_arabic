"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import ParseBody from "../HomeComponents/ParseBody";
import { Loader } from "../Loader";
// import axios from "@/utils/axios";
// import ReactCountryDropdown from "react-country-dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { Image_NotFound, Image_URL } from "@/config/constants";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";

export default function GetVoucher({ property }) {
  const [media, setMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const mainImages = media[0]?.brochure_image
    ? JSON.parse(media[0].brochure_image)
    : [];
  const pdf = media[0]?.brochure_pdf ? JSON.parse(media[0].brochure_pdf) : [];

  const mainImage = mainImages.length
    ? `${Image_URL}${mainImages[0]}`
    : Image_NotFound;
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const captchaValue = recaptcha.current?.getValue();

  //     if (!captchaValue) {
  //       toast.error("Please verify the captcha.");
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
  //         window.open(PDF, "_blank");
  //       } else {
  //         toast.info("Brochure PDF not available yet. It will be sent soon.");
  //       }

  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error("Error submitting form:", error.message);
  //       const { errors } = error.response?.data || {};
  //       if (errors && typeof errors === "object") {
  //         const errorMessages = Object.values(errors)
  //           .map((errArray) => errArray.join(" "))
  //           .join("\n");
  //         toast.error(errorMessages);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="flex justify-center mt-16 w-full mb-16">
      <div className="md:w-[100%] macbook:w-[80%] flex justify-center md:justify-evenly flex-wrap-reverse gap-3 md:gap-[5px]">
        <div className="max-w-[400px] macbook:max-w-[50%] flex flex-col items-center md:items-start gap-[10px] md:gap-[15px] my-10">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#8F8F8F] text-center md:text-start font-newsLetter">
            {property?.brochureHeading || "ملكية"}
          </h2>

          <div className="text-[16px] macbook:text-[30px] text-[#555] text-center md:text-start font-montserrat">
            {property?.brochureDesc?.length > 500 ? (
              <>
                <div
                  className={`${
                    isExpanded
                      ? "h-[140px] overflow-y-auto transition-all duration-300"
                      : "h-[140px] overflow-hidden"
                  }`}
                >
                  <div className="text-sm text-gray-700">
                    <ParseBody body={property?.brochureDesc} />
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 text-xs font-medium hover:underline"
                >
                  {isExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-700 font-montserrat">
                <ParseBody body={property?.brochureDesc} />
              </div>
            )}
          </div>

          <button
            onClick={handleOpenModal}
            className="flex items-center gap-[10px] py-4 px-[14px] bg-[#A39D9D] text-white hover:bg-transparent hover:text-[#A39D9D] border hover:border-[#A39D9D] rounded-md"
          >
            <IoCloudDownloadOutline className="text-[18px] macbook:text-[40px]" />
            <span className="text-[14px] md:text-[12px] macbook:text-[20px]">
              تنزيل كتيب PDF مجانًا
            </span>
          </button>
        </div>

        <img
          src={mainImage}
          alt=""
          className="h-[400px] w-[450px] md:h-[400px] macbook:w-[600px]"
          onError={(e) => (e.target.src = Image_NotFound)}
        />
      </div>

      <BrochureRegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={`${property?.property_name} Detail Page`}
      />
    </div>
  );
}

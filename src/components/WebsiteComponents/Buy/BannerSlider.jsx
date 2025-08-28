'use client';

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import fallbackBanner from "/Areas/banner.png";
import { toast } from "react-toastify";
import { fetchPropertyList } from "@/lib/api/buy.server";
import { Image_URL } from "@/config/constants";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";


const BannerSlider = ({ area, property_type, page, breadcrumb1 }) => {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [FProperties, setFProperties] = useState(null);
  const recaptcha = useRef(null);
  const [property, setProperty] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    subject: page,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("971");

  const pathname = usePathname();

  const handleOpenModal = (banner) => {
    setProperty(banner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          community_id: "",
          developer_id: "",
          property_status_id: "",
          area_id: area || "",
          property_type_id: property_type || "",
          property_name: "",
          amount: "",
        };
        
        const response = await fetchPropertyList(params);
        const filteredProperties = response.filter(
          (property) => property.status === 1
        );
        setFProperties(filteredProperties);
      } catch (error) {
        console.log("Area Detail Banner Section Error", error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [area, property_type]);

  useEffect(() => {
    if (property?.meadias) {
      try {
        // Check if `meadias` is a string, and parse if necessary
        const parsedMedia =
          typeof property.meadias === "string"
            ? JSON.parse(property.meadias)
            : property.meadias;

        setMedia(parsedMedia);
        // console.log("Media  ", media);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [property]); // Only re-run when `FProperties` changes
  const pdf =
    media && media[0]?.brochure_pdf ? JSON.parse(media[0]?.brochure_pdf) : [];
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const captchaValue = recaptcha.current?.getValue();
//       if (!captchaValue) {
//         toast.error("Please verify the captcha");
//         return;
//       }

//       const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
//       if (!isValidPhoneNumber(fullPhone, code)) {
//         toast.error("Invalid phone number for selected country.");
//         return;
//       }

//       setLoading(true);

//       const pdf = media && media[0]?.brochure_pdf 
//         ? JSON.parse(media[0]?.brochure_pdf) 
//         : [];
//       const PDF = pdf.length ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pdf[0]}` : null;

//       if (!PDF) {
//         toast.error("Brochure not found");
//         return;
//       }

//       const requestData = {
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
//         subject: page,
//       };

//       await submitBrochureRequest(requestData);
      
//       toast.success("Form submitted successfully");
//       setFormData({ name: "", email: "", phone: "", description: "" });
      
//       // Open PDF in new tab
//       window.open(PDF, '_blank', 'noopener,noreferrer');
      
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error(error.response?.data?.message || "Failed to submit form");
//     } finally {
//       setLoading(false);
//     }
//   };

return (
    <div className="flex flex-col justify-center text-white     ">
      {loading ? (
        <div className="flex items-center font-montserrat justify-center h-[34rem] md:h-[600px] w-full bg-gray-800 rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px]">
          {/* Loading placeholder */}
          <p>Loading...</p>
        </div>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation, Autoplay]} // Added Autoplay module
          className="w-[100%] md:w-[95%]"
        >
          {(FProperties?.length > 0
            ? FProperties
            : [{ image_path: "./Areas/banner.png", heading: "Default Heading" }]
          ).map((banner, index) => {
            const media = banner?.meadias?.[0]; // Get the first media object
            const mainImage = media?.main_image
              ? JSON.parse(media.main_image)[0]
              : null; // Parse main_image
            const brochurePdf = media?.brochure_pdf
              ? JSON.parse(media.brochure_pdf)[0]
              : null; // Parse brochure_pdf

            return (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[34rem] md:h-[600px] bg-cover w-[90%] md:w-[98%] bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Image_URL}${
                      mainImage || banner?.image_path || "/Areas/banner.png"
                    })`,
                  }}
                >
                  <h2 className="text-2xl font-newsLetter md:text-[35px] xl:text-[25px] text-center font-semibold uppercase">
                    {banner?.property_name || "Default Heading"}
                  </h2>
                  <div className="flex gap-[30px] justify-center flex-wrap md:flex-nowrap mt-8">
                    <div className="flex items-center gap-[5px]">
                      <img
                        src="/offplan/wallet.png"
                        className="w-[30px] h-[30px]"
                        alt="wallet icon"
                        onError={(e) => {
                          e.currentTarget.src = Image_NotFound; // Path to your dummy image
                        }}
                      />
                      <div>
                        <h3 className="text-[12px] font-montserrat md:text-[18px] font-semibold">
                          Starting Price
                        </h3>
                        {/* <h4 className="font-montserrat text-[8px] md:text-[12px]">
                          On Request
                        </h4> */}
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.starting_price ? <span className="flex gap-1"><img src='/dirham_white.PNG' className="w-3 h-2.5 mt-0.5 md:mt-1"/> {banner?.starting_price}  </span>: "On Request"}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img
                        src="/offplan/payment.png"
                        className="w-[30px] h-[30px]"
                        alt="payment icon"
                      />
                      <div>
                        <h3 className="text-[12px] font-montserrat md:text-[18px] font-semibold">
                          Payment Plan
                        </h3>
                        {/* <h4 className="font-montserrat text-[8px] md:text-[12px]">
                          On Request
                        </h4> */}
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.installment_plan === 1 ? `${banner?.first_installment} - ${banner?.second_installment} - ${banner?.hand_over}` : "On Request"}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img
                        src="/offplan/check.png"
                        className="w-[30px] h-[30px]"
                        alt="check icon"
                      />
                      <div>
                        <h3 className="text-[12px] font-montserrat md:text-[18px] font-semibold">
                          HandOver
                        </h3>
                        {/* <h4 className="font-montserrat text-[8px] md:text-[12px]">
                          On Request
                        </h4> */}
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.build_year ? banner?.build_year : "On Request"}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-[30px] mt-8">
                    <button
                      onClick={() => handleOpenModal(banner)} // Pass a function reference
                      className="md:p-4 p-2 font-montserrat md:text-[16px] text-[12px] flex items-center gap-[10px] py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text[#8F8F8F] hover:bg-transparent"
                    >
                      {/* <a
                      href={`${Image_Url}${brochurePdf}`}
                      download
                      className="md:p-4 p-2 font-montserrat text-[12px] md:text-[16px] py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text-white text-center hover:bg-transparent"
                    > */}
                      Download Brochure
                      {/* </a> */}
                    </button>
                    <button className="md:p-4 p-2 font-montserrat md:text-[16px] text-[12px] flex items-center gap-[10px] py-2 text-white rounded-[5px] border-[1px] border-white">
                      <IoCloudDownloadOutline className="text-[20px]" />
                      <Link href={`/property/${banner.slug}`}>
                        {" "}
                        Get More Info{" "}
                      </Link>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {/* Custom navigation buttons */}
      <div className="absolute z-10 w-full hidden lg:block">
        <div
          className="custom-prev swiper-button-prev px-4"
          style={{
            color: "white",
            top: "50px",
            left: "10%",
            width: "1rem",
          }}
        ></div>
        <div
          className="custom-next swiper-button-next px-4"
          style={{
            color: "white",
            top: "50px",
            right: "10%",
            width: "1rem",
          }}
        ></div>
      </div>
     <BrochureRegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={'Off-Plan'}
      />
    </div>
  );
};

export default BannerSlider;
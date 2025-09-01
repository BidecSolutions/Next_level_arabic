"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link"; // ✅ Next.js Link
import { usePathname } from "next/navigation"; // ✅ Next.js pathname hook
import { Image_NotFound, Image_URL } from "@/config/constants";
import fallbackBanner from "/public/Areas/banner.png"; // ✅ Next.js public folder
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { fetchFeaturedProperties } from "@/lib/api/communities.server";
import { submitBrochureRequest } from "@/lib/api/offplan.server";
import { fetchAgentFeaturedProperties } from "@/lib/api/agent.server";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";

const BannerSlider = ({ data, type }) => {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [FProperties, setFProperties] = useState(null);
  const recaptcha = useRef(null);
  const pathname = usePathname(); // ✅ Next.js pathname
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [property, setProperty] = useState("");
  const [code, setCode] = useState("917");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.public.post(
  //         "user/communities/featuresPropertyList",
  //         { community_id: data?.id }
  //       );

  //       const filteredProperties = response.data.data.filter(
  //         (property) => property.status === 1 && property.feature_property === 1
  //       );

  //       setFProperties(filteredProperties);
  //     } catch (error) {
  //       console.log("Developr Detail Banner Section  Error", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [data]);
//  useEffect(() => {
//     const loadFeaturedProperties = async () => {
//       try {
//         const response = await fetchFeaturedProperties(data?.id);
//         const filteredProperties = response.data.filter(
//           (property) => property.status === 1 && property.feature_property === 1
//         );
//         setFProperties(filteredProperties);
//         console.log(filteredProperties,"FFFF")
//       } catch (error) {
//         console.log("Developer Detail Banner Section Error", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFeaturedProperties();
//   }, [data]);


 useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        let response;

        if (type === "agent") {
          response = await fetchAgentFeaturedProperties(data?.id);
        } else if (type === "community") {
          response = await fetchFeaturedProperties(data?.id);
        }

        const filteredProperties = response.filter(
          (property) => property.status === 1 && property.feature_property === 1
        );

        setFProperties(filteredProperties);
      } catch (error) {
        console.log("BannerSlider API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (data?.id) {
      loadFeaturedProperties();
    }
  }, [data, type]);




  // useEffect(() => {
  //   if (FProperties?.meadias) {
  //     try {
  //       const parsedMedia =
  //         typeof FProperties.meadias === "string"
  //           ? JSON.parse(FProperties.meadias)
  //           : FProperties.meadias;

  //       setMedia(parsedMedia);
  //     } catch (error) {
  //       console.error("Error parsing meadias:", error);
  //     }
  //   }
  // }, [FProperties]);
  useEffect(() => {
    if (FProperties?.meadias) {
      try {
        const parsedMedia =
          typeof FProperties.meadias === "string"
            ? JSON.parse(FProperties.meadias)
            : FProperties.meadias;
        setMedia(parsedMedia);
      } catch (error) {
        console.error("Error parsing meadias:", error);
      }
    }
  }, [FProperties]);

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

  const pdf =
    media && media[0]?.brochure_pdf ? JSON.parse(media[0]?.brochure_pdf) : [];
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;

const handleSubmit = async (e) => {
  e.preventDefault();

  const captchaValue = recaptcha.current
    ? recaptcha.current.getValue()
    : null;

  if (!captchaValue) {
    alert(" يرجى التحقق من الكابتشا");
    return;
  }

  const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
  const isValid = isValidPhoneNumber(fullPhone, code);

  if (!isValid) {
    toast.error("رقم الهاتف غير صالح للبلد المحدد.");
    return;
  }
  setLoading(true);

  // ✅ Payload banate hi console me print karo
  const payload = {
    propertyId: property.id,
    PDF,
    formData,
    communityId: data?.id,
    subject: "Community Detail Of " + data?.name,
    code,
  };

  console.log("📦 Brochure Request Payload:", payload); // ✅ yaha check karo

  try {
    await submitBrochureRequest(payload);

    setFormData({ name: "", email: "", phone: "", description: "" });

    if (PDF) {
      const link = document.createElement("a");
      link.href = `${PDF}`;
      link.target = "_blank";
      link.click();
    } else {
      alert("كتيب PDF غير متوفر حاليًا. سيتم إرساله قريبًا.");
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error("❌ Error submitting form:", error.message);
    const { errors } = error.response?.data || {};
    if (errors && typeof errors === "object") {
      const errorMessages = Object.values(errors)
        .map((errArray) => errArray.join(" "))
        .join("\n");
      alert(errorMessages);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center text-white">
      {loading ? (
        <div className="flex items-center font-montserrat justify-center h-[34rem] md:h-[600px] w-full bg-gray-800 rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px]">
          <p>تحميل</p>
        </div>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
  loop={FProperties?.length > 1} // ✅ Loop only if >1 slides
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-[95%] md:w-[95%]"
        >
          {(FProperties?.length > 0
            ? FProperties
            : [{ image_path: fallbackBanner, heading: "المشروع قريبا" }]
          ).map((banner, index) => {
            const media = banner?.meadias?.[0];
            const mainImage = media?.main_image
              ? JSON.parse(media.main_image)[0]
              : null;

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
                 
                  <h2 className="text-[18px] text-center   font-newsLetter md:text-[35px] xl:text-[25px] font-semibold uppercase">
                    {banner?.property_name || "المشروع قريبا"}
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
                        <p className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                         سعر البداية
                        </p>
                        {/* <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.starting_price ? banner?.starting_price : "On Request"}
                        </h4> */}
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.starting_price ? <span className="flex gap-1"> <img src='/dirham_white.PNG' className="w-3 h-2.5 mt-0.5 md:mt-1"/> {banner?.starting_price}  </span>: "عند الطلب"}
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
                        <p className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                          خطة الدفع
                        </p>
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.installment_plan === 1 ? `${banner?.first_installment} - ${banner?.second_installment} - ${banner?.hand_over}` : "عند الطلب"}
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
                        <p className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                          تسليم
                        </p>
                        <h4 className="font-montserrat text-[9px] md:text-[13px]  ">
                        {banner?.build_year ? banner?.build_year : "عند الطلب"}
                        </h4>
                      </div>
                    </div>
                  </div>


                  <div className="flex justify-center gap-[30px] mt-8">
                    <button
                      onClick={() => handleOpenModal(banner)}
                      className="md:p-4 p-2 font-montserrat md:text-[16px] text-[12px] flex items-center gap-[10px] py-2 bg-[#8F8F8F] text-white rounded-[5px] hover:border-[1px] border-[#8F8F8F] hover:text[#8F8F8F] hover:bg-transparent"
                    >
                      تحميل الكتيب
                    </button>
                    <button className="md:px-4 p-2 py-2  font-montserrat md:text-[16px] text-[12px] flex items-center gap-[10px]  text-white rounded-[5px] border-[1px] border-white">

                    <Link
                      href={`/property/${banner?.slug}`}
                      // className="md:px-4 p-2 py-2 text-[12px] md:text-[16px] flex items-center gap-[10px] text-white rounded-[5px] border border-white"
                    >
                     احصل على مزيد من المعلومات
                    </Link>
                                        </button>

                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* Custom Swiper navigation */}
      <div className="absolute z-10 w-full hidden lg:block">
        <div
          className="custom-prev swiper-button-prev px-4"
          style={{ color: "white", top: "280px", left: "10%", width: "1rem" }}
        ></div>
        <div
          className="custom-next swiper-button-next px-4"
          style={{ color: "white", top: "280px", right: "10%", width: "1rem" }}
        ></div>
      </div>

      {/* Modal */}
<BrochureRegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={'Off-Plan'}
      />
    </div>
  );
};

export default BannerSlider;

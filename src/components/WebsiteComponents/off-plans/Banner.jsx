"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import axios from "../../../Utils/axios";
import { Image_NotFound, Image_URL } from "@/config/constants";
// import "flag-icons/css/flag-icons.min.css";
// import ReactCountryDropdown from "react-country-dropdown";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import { fetchPropertiesData, submitBrochureRequest } from "@/lib/api/offplan.server";
import BrochureRegisterForm from "../Forms/BrochureRegisterForm";

const Banner = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const [FProperties, setFProperties] = useState(null);
  const recaptcha = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("971");
  const [property, setProperty] = useState("");
  const [media, setMedia] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPropertiesData();
      setFProperties(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleOpenModal = (banner) => {
    setProperty(banner);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const pdf = media && media[0]?.brochure_pdf ? JSON.parse(media[0]?.brochure_pdf) : [];
  const PDF = pdf.length ? `${Image_URL}${pdf[0]}` : null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;

//     if (!captchaValue) {
//       alert("Please Verify the Captcha");
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
//         broucher_url: PDF ? PDF : "",
//         name: formData.name,
//         email: formData.email,
//         phone_no: formData.phone,
//         country_code: code,
//         description: formData.description,
//         agent_id: property?.agent_id,
//         developer_id: property?.developer_id,
//         community_id: property?.community_id === 0 ? "" : property?.community_id,
//         area_id: property?.addresses?.area_id,
//         subject: page,
//       });

//       toast.success("Form Sent Successfully");

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

//       setLoading(false);
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

const handleSubmit = async (e) => {
  e.preventDefault();
  const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;

  if (!captchaValue) {
    alert("يرجى التحقق من الكابتشا");
    return;
  }

  const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
  const isValid = isValidPhoneNumber(fullPhone, code);

  if (!isValid) {
    toast.error("رقم الهاتف غير صالح للبلد المحدد.");
    return;
  }

  setLoading(true);

  try {
    await submitBrochureRequest({
      property_detail_id: property.id,
      broucher_url: PDF ? PDF : "",
      name: formData.name,
      email: formData.email,
      phone_no: formData.phone,
      country_code: code,
      description: formData.description,
      agent_id: property?.agent_id,
      developer_id: property?.developer_id,
      community_id: property?.community_id === 0 ? "" : property?.community_id,
      area_id: property?.addresses?.area_id,
      subject: page,
    });

    toast.success("Form Sent Successfully");

    setFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
    });

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
    console.error("Error submitting form:", error.message);
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
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-[100%] md:w-[95%]"
        >
          {FProperties && FProperties.length > 0 ? (
            FProperties.map((banner, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[34rem] md:h-[600px] bg-cover w-[90%] md:w-[98%] bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                      banner.mainImage
                        ? `${Image_URL}${banner.mainImage}`
                        : "/Areas/banner.png"
                    })`,
                  }}
                >
                  <h2 className="text-2xl font-newsLetter md:text-[35px] xl:text-[25px] text-center font-semibold uppercase">
                    {banner?.property_name || "العنوان الافتراضي"}
                  </h2>
                  <div className="flex gap-[30px] justify-center flex-wrap md:flex-nowrap mt-8">
                    <div className="flex items-center gap-[5px]">
                      <img
                        src="/offplan/wallet.png"
                        className="w-[30px] h-[30px]"
                        alt="wallet icon"
                        onError={(e) => {
                          e.currentTarget.src = Image_NotFound;
                        }}
                      />
                      <div>
                        <h3 className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                         سعر البداية
                        </h3>
                        <h4 className="font-montserrat text-[9px] md:text-[13px]">
                          {banner?.starting_price ? (
                            <span className="flex gap-1">
                              {banner?.starting_price}{" "}
                              <img
                                src="/dirham_white.PNG"
                                className="w-3 h-2.5 mt-1"
                                alt="dirham"
                              />
                            </span>
                          ) : (
                            "عند الطلب"
                          )}
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
                        <h3 className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                          خطة الدفع
                        </h3>
                        <h4 className="font-montserrat text-[9px] md:text-[13px]">
                          {banner?.installment_plan === 1
                            ? `${banner?.first_installment} - ${banner?.second_installment} - ${banner?.hand_over}`
                            : "عند الطلب"}
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
                        <h3 className="text-[15px] font-montserrat md:text-[18px] font-semibold">
                         تسليم
                        </h3>
                        <h4 className="font-montserrat text-[9px] md:text-[13px]">
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
                    <button className="md:px-4 p-2 py-2 font-montserrat md:text-[16px] text-[12px] flex items-center gap-[10px] text-white rounded-[5px] border-[1px] border-white">
                      <Link href={`/property/${banner?.slug}`}>
                      احصل على مزيد من المعلومات
                      </Link>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div
                className="relative h-[34rem] md:h-[600px] bg-cover w-[90%] md:w-[98%] bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center text-white"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Areas/banner.png")`,
                }}
              >
                <h2 className="text-2xl font-newsLetter md:text-[35px] xl:text-[25px] text-center font-semibold uppercase">
                  مشاريع قيد الإنشاء
                </h2>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      )}
      {/* Custom navigation buttons */}
      <div className="absolute z-10 w-full hidden lg:block">
        <div
          className="custom-prev swiper-button-prev px-4"
          style={{
            color: "white",
            top: "280px",
            left: "10%",
            width: "1rem",
          }}
        ></div>
        <div
          className="custom-next swiper-button-next px-4"
          style={{
            color: "white",
            top: "280px",
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

export default Banner;

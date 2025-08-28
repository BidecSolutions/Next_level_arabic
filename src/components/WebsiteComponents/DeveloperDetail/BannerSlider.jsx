"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Link from "next/link";
import fallbackBanner from "@/public/Areas/banner.png"; // ✅ Next.js public folder
// import "flag-icons/css/flag-icons.min.css";
// import ReactCountryDropdown from "react-country-dropdown";
// import ReCAPTCHA from "react-google-recaptcha";
// import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { Image_URL } from "@/config/constants";

const BannerSlider = ({ data, page }) => {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [FProperties, setFProperties] = useState(null);
  const recaptcha = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [property, setProperty] = useState("");
  const [code, setCode] = useState("917");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const featured = await getDeveloperFeaturedProperties(data?.id);
        setFProperties(featured);
      } catch (err) {
        console.error("Developer Detail Banner Error", err);
      } finally {
        setLoading(false);
      }
    };

    if (data?.id) fetchFeatured();
  }, [data]);

  // ✅ Update Media when Featured Property changes
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

  // ✅ Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const captchaValue = recaptcha.current?.getValue();

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
//       await axios.post("/api/developers/request-brochure", {
//         property_detail_id: property.id,
//         name: formData.name,
//         email: formData.email,
//         country_code: code,
//         phone_no: formData.phone,
//         developer_id: data?.id,
//         subject: page,
//       });

//       setFormData({ name: "", email: "", phone: "", description: "" });

//       toast.success("Form submitted successfully!");

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       toast.error("Failed to submit form");
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="flex justify-center text-white">
      {loading ? (
        <div className="flex items-center justify-center h-[34rem] w-full bg-gray-800 rounded-bl-[50px] rounded-br-[50px]">
          <p>Loading...</p>
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
          className="w-[95%]"
        >
          {(FProperties?.length > 0
            ? FProperties
            : [{ image_path: fallbackBanner, heading: "Project Coming Soon" }]
          ).map((banner, index) => {
            const media = banner?.meadias?.[0];
            const mainImage = media?.main_image
              ? JSON.parse(media.main_image)[0]
              : null;

            return (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[34rem] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] flex flex-col items-center justify-center text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${Image_URL}${
                      mainImage || banner?.image_path || "/Areas/banner.png"
                    })`,
                  }}
                >
                  <h2 className="text-xl font-semibold uppercase">
                    {banner?.property_name || "Project Coming Soon"}
                  </h2>

                  <div className="flex justify-center gap-[30px] mt-8">
                    <button
                      onClick={() => handleOpenModal(banner)}
                      className="p-2 bg-[#8F8F8F] text-white rounded hover:bg-transparent hover:text-[#8F8F8F] border"
                    >
                      Download Brochure
                    </button>
                    <Link
                      href={`/property/${banner?.slug}`}
                      className="p-2 border border-white rounded"
                    >
                      Get More Info
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white w-full max-w-lg p-6 rounded-lg">
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-black">
              Download Brochure
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border-b p-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border-b p-2"
              />
              <div className="flex gap-2">
                <ReactCountryDropdown
                  defaultCountry="AE"
                  onSelect={(country) => setCode(country.callingCodes[0])}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border-b p-2 w-full"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Your Message"
                rows={2}
                className="border-b p-2 resize-none"
              ></textarea>
              <ReCAPTCHA
                ref={recaptcha}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              />
              <button
                type="submit"
                className="bg-[#8F8F8F] text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BannerSlider;

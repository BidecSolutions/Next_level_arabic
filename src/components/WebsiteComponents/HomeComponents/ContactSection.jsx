"use client";

import { IoMail, IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useState, useRef } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
// import "react-phone-input-2/lib/style.css";
// import "flag-icons/css/flag-icons.min.css";
// import ReactCountryDropdown from "react-country-dropdown";
import { isValidPhoneNumber } from "libphonenumber-js";
import { formsApi } from "@/lib/api/forms";
import ParseBody from "./ParseBody";

const ContactSection = ({ form, page }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("971");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    selectedOption: "",
    subject: page,
  });
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, selectedOption: e.target.value }));
  };

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
//       await axios.public.post("user/inquiry-forms/storeTouchAFreeGuide", {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         country_code: code,
//         description: formData.description,
//         brochure_type: "",
//         subject: page,
//       });

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         description: "",
//         selectedOption: "",
//       });

//       toast.success("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Error sending form. Please try again.");
//     } finally {
//       setLoading(false);
//       handleCloseModal();
//     }
//   };



const handleSubmit = async (e) => {
  e.preventDefault();

  const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;
  if (!captchaValue) {
    alert("Please Verify the Captcha");
    return;
  }

  const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
  const isValid = isValidPhoneNumber(fullPhone, code);
  if (!isValid) {
    toast.error("Invalid phone number for selected country.");
    return;
  }

  setLoading(true);

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    country_code: code,
    description: formData.description,
    brochure_type: "",
    subject: page,
  };

  try {
    await formsApi.submitInquiryForm(payload);

    setFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
      selectedOption: "",
    });

    toast.success("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error sending form. Please try again.");
  } finally {
    setLoading(false);
    handleCloseModal();
  }
};

  return (
    <div className="my-12 md:my-20">
      <div className="flex flex-col md:flex-row w-full items-center">
        {/* Left Column */}
        <div className="relative w-full h-[24rem] md:h-full flex justify-center md:justify-start md:w-[50%] macbook:w-[60%]">
          <img
            src={page?.guide_section_image ? `${Image_URL}/${page?.guide_section_image}`:"/contact.png"}
            alt="Real Estate View"
            loading="lazy"
            className="mr-0 md:mr-48 macbook:mr-80 w-full sm:w-[90%] h-[253px] md:w[550px] macbook:w[1200px] md:h-[350px] lg:h-[490px] macbook:h-[700px] rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[0px] md:rounded-tr-[100px] md:rounded-br-[100px] object-cover"
            onError={(e) => {
              e.currentTarget.src = Image_NotFound;
            }}
          />
          <div className="absolute flex flex-col items-center text-center md:pb-4 top-[160px] md:top-24 macbook:top-[200px] md:right-1 macbook:left-[60%] bg-[#222222] h-[200px] w-[250px] md:h-[280px] macbook:h-[300px] md:w-[270px] macbook:w-[400px] text-white p-6 rounded-[20px]">
            <p className="text-[16px] font-newsLetter md:text-[34px] font-semibold mb-1">
              CONTACT US
            </p>
            <p className="text-[12px] font-montserrat md:text-[17px] mb-4">
              Next Level Real Estate
            </p>
            <div className="flex flex-col items-center md:items-start gap-[2px] md:gap-[15px] macbook:gap-[20px]">
              <a href="mailto:info@nextlevelrealestate.ae" className="text-[12px] md:text-sm macbook:text-[20px] mb-2 flex items-center gap-[6px] md:gap-[15px] hover:underline">
                <IoMail className="md:text-[17px]" /> media@nextlevelrealestate.ae
              </a>
              <a href="tel:+97144542828" className="text-[12px] md:text-sm macbook:text-[20px] mb-2 flex items-center gap-[6px] md:gap-[15px] hover:underline">
                <IoCall className="md:text-[17px]" /> +971 4 454 2828
              </a>
              <a
                href="https://maps.google.com/?q=1505+Opal+Tower+Burj+Khalifa+Boulevard+Business+Bay+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] md:text-sm macbook:text-[20px] mb-2 flex justify-center items-start gap-[2px] md:gap-[15px] hover:underline"
              >
                <FaLocationDot className="md:text-[17px]" />
                <span>
                  1505, Opal Tower Burj Khalifa <br /> Boulevard – Business Bay – Dubai.
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        {form !== true && (
          <div className="md:ml-[110px] macbook:ml-[45px] md:w-[30%] flex flex-col items-center md:items-start">
            <p className="md:text-[30px] font-montserrat text-[20px] text-[#919090] md:mb-4">
              Get A Free Consultation
            </p>
            <p className="text-[#555555] font-montserrat text-center text-[14px] md:text-[26px] mb-4">
              I am interested to!
              <br />
              <span className="text-[12px] md:text-[18px]">Select One Option</span>
            </p>
            <div className="flex gap-2 md:gap-4 mb-6">
              {["Buy", "Sale", "Rent"].map((option) => (
                <label
                  key={option}
                  className={`flex flex-col items-center gap-[5px] md:w-[109px] w-[80px] h-[80px] md:h-[100px] bg-[#222222] p-4 rounded-lg ${
                    formData.selectedOption === option ? "ring-4 ring-gray-400" : ""
                  }`}
                >
                  <FaHome className="text-2xl text-white" />
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option}
                    checked={formData.selectedOption === option}
                    onChange={handleRadioChange}
                  />
                  <p className="text-white">{option}</p>
                </label>
              ))}
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-[#8F8F8F] text-white hover:bg-transparent hover:text-[#8F8F8F] border py-2 px-6 rounded-[8px]"
              disabled={!formData.selectedOption}
            >
              Next
            </button>
          </div>
        )}

{/* Right Column: Consultation Form */}
        {form === true && (
          <div className="md:ml-[110px] macbook:ml-[45px] md:w-[30%] flex flex-col items-center md:items-start">
            <h2 className="md:text-[35px] text-[25px]   macbook:text-[48px] macbook:leading-[55px] md:leading-[40px] text-[#919090] md:mb-4 font-semibold uppercase">
              {page?.guide_section_heading
                ? page?.guide_section_heading.substring(0, 20)
                : "Get A Free Consultation"}
            </h2>
            <div className="text-[#555555] text-center macbook:text-[40px] md:text-left text-[22px] md:text-[26px] mb-4">
              {page?.guide_section_description ? (
                <ParseBody
                  body={page?.guide_section_description.substring(0, 50)}
                />
              ) : (
                "I am interested to!"
              )}
            </div>

            {/* Form Section */}
            <form
              className="flex flex-col items-center md:items-start gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600"
              />
              <div className="  w-full flex items-center gap-2">
                {/* <ReactCountryDropdown
                  defaultCountry="AE"
                  default
                  className=" bg-transparent  "
                  onSelect={(country) => setCode(country.callingCodes[0])}
                /> */}
                <input
                  type="tel"
                  name="phone"
                  maxLength="15"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="bg-[#A39D9D] text-white font-montserrat py-3 px-8 rounded-md mt-4 w-fit"
                disabled={loading}
              >
                {loading ? "Sending.." : "Send Message"}
              </button>
            </form>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          >
            <div className="relative bg-white w-full max-w-lg p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-[17px] md:text-2xl font-semibold mb-4">Register your interest</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border-b border-black py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border-b border-black py-2"
                  required
                />
                <div className="w-full flex items-center gap-2">
                  {/* <ReactCountryDropdown
                    defaultCountry="AE"
                    onSelect={(country) => setCode(country.callingCodes[0])}
                  /> */}
                  <input
                    type="tel"
                    name="phone"
                    maxLength="15"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border-b border-black py-2"
                    required
                  />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={1}
                  className="w-full border-b border-black py-2 resize-none"
                ></textarea>
                <ReCAPTCHA ref={recaptcha} sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY} />
                <button
                  type="submit"
                  className="bg-[#8F8F8F] text-white py-3 px-4 rounded-lg hover:bg-transparent hover:text-[#8F8F8F] border"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;

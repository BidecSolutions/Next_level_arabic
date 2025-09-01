"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { isValidPhoneNumber } from "libphonenumber-js";
import { formsApi } from "@/lib/api/forms";
import PhoneInput from "react-phone-input-2";

const GetInTouch = ({ page, pageName }) => {
  const [code, setCode] = useState("971");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country_code: code,
    brochure_type: "",
    subject: pageName,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country_code: code,
      subject: pageName,
    }));
  }, [code, pageName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Country-wise phone validation
//     const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
//     const isValid = isValidPhoneNumber(fullPhone, code);

//     if (!isValid) {
//       toast.error("Invalid phone number for selected country.");
//       return;
//     }
//     setLoading(true);

//     try {
//       await axios.public.post(
//         "user/inquiry-forms/storeTouchAFreeGuide",
//         formData
//       );

//       toast.success("Form submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         country_code: code,
//         subject: pageName,
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const { errors } = error.response?.data || {};
//       if (errors && typeof errors === "object") {
//         const errorMessages = Object.values(errors)
//           .map((arr) => arr.join(" "))
//           .join("\n");
//         alert(errorMessages);
//       } else {
//         alert("Network error or server is down. Please try again later.");
//       }
//     }
//     setLoading(false);
//   };



const handleSubmit = async (e) => {
  e.preventDefault();

  const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
  const isValid = isValidPhoneNumber(fullPhone, code);

  if (!isValid) {
    toast.error("رقم الهاتف غير صالح للبلد المحدد.");
    return;
  }
  setLoading(true);

  try {
    await formsApi.submitInquiryForm(formData);  // yahan payload pass kar rahe hain

    toast.success("تم إرسال النموذج بنجاح!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      country_code: code,
      subject: pageName,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    const { errors } = error.response?.data || {};
    if (errors && typeof errors === "object") {
      const errorMessages = Object.values(errors)
        .map((arr) => arr.join(" "))
        .join("\n");
      alert(errorMessages);
    } else {
      alert("خطأ في الشبكة أو الخادم معطل. يُرجى المحاولة لاحقًا.");
    }
  }
  setLoading(false);
};

  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setCode(country.dialCode);
  };


  return (
    <div className="flex flex-wrap w-full lg:flex-row mb-44 md:mb-24 justify-around items-center md:py24 mt-24 bg-white">
      <ToastContainer autoClose={1000} />
      {/* Left form section */}
      <div className="flex flex-col w-full md:w-1/3 macbook:w-[30%]">
        <p className="text-[20px] font-newsLetter text-center md:text-start md:text-[30px] macbook:text-[40px] macbook:leading-[45px] font-light text-gray-500">
          {page?.guide_section_heading ||
            "دع متخصصنا يساعدك في العثور على العقار المثالي خارج الخطة."}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] mt-8">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="اسمك"
            className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="عنوان البريد الإلكتروني"
            className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600"
            required
          />
          <div className="w-full flex items-center gap-2">
            <PhoneInput
            country={"ae"}
            value={formData.phone}
            onChange={handlePhoneChange}
            enableSearch={true}
            inputStyle={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid black",
              background: "transparent",
            }}
            buttonStyle={{
              background: "transparent",
              border: "none",
            }}
            dropdownStyle={{
              maxHeight: "200px",
            }}
            searchStyle={{
              margin: "5px 0",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          </div>
          <button
            type="submit"
            className="bg-[#8F8F8F] w-[250px] font-montserrat text-white py-3 macbook:text-[18px] px-4 rounded-lg hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] transition"
            disabled={loading}
          >
            {loading ? "تقديم" : "انقر هنا لإجراء مكالمة مجانية"}
          </button>
        </form>
      </div>

      {/* Right image section */}
      <div className="relative w-full md:w-1/2 macbook:w-[40%] mt-10 md:mt-0 flex justify-center items-center">
        {/* Image */}
        <img
          src={`${Image_URL}/${page?.guide_section_image}`}
          alt="Contact Person"
          className="w-[300px] md:w-[400px] rounded-lg shadow-lg"
          onError={(e) => {
            e.currentTarget.src = "/GetInTouch.jpg";
          }}
        />
        {/* Info Card */}
        <div className="absolute bottom-[-150px] md:bottom-[-30px] md:right-[-20px] macbook:right-40 w-64 md:w-96 bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-gray-700 font-montserrat">
            {page?.guide_section_name || "سلوى عرفاوي"}
          </p>
          <p className="text-sm text-gray-500 font-montserrat">
            مستشار مبيعات أول في شركة نيكست ليفل للعقارات
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M21 10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"
              />
            </svg>
            <p className="text-gray-500 text-sm font-montserrat">
              {page?.guide_section_contact || "+97144542828"}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7l9-4 9 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />
            </svg>
            <p
              className="text-gray-500 text-sm font-montserrat"
              dangerouslySetInnerHTML={{
                __html:
                  page?.guide_section_address ||
                  "1505، برج أوبال، برج خليفة بوليفارد – الخليج التجاري – دبي.",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

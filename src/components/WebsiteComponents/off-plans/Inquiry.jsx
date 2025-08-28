"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";
import { submitInquiry } from "@/lib/api/offplan.server";
import PhoneInput from "react-phone-input-2";

export const Inquiry = ({ page }) => {
  const [code, setCode] = useState("971");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
    country_code: code,
    subject: page,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country_code: code,
      subject: page,
    }));
  }, [code, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setCode(country.dialCode);
  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.full_name.trim()) {
//       alert("Name is required");
//       return;
//     }
//     if (!formData.phone.trim()) {
//       alert("Phone number is required");
//       return;
//     }
//     if (!formData.email.trim()) {
//       alert("Email is required");
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       alert("Invalid email format");
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
//       const response = await axios.public.post(
//         "user/inquiry-forms/store",
//         formData
//       );
//       toast.success("Inquiry sent successfully!");
//       setFormData({
//         full_name: "",
//         phone: "",
//         email: "",
//         message: "",
//         country_code: code,
//         subject: page,
//       });
//       setTimeout(() => setFeedback(""), 2000);
//     } catch (error) {
//       console.error("Error sending inquiry:", error);
//       const { errors } = error.response?.data || {};
//       if (errors && typeof errors === "object") {
//         const errorMessages = Object.values(errors)
//           .map((arr) => arr.join(" "))
//           .join("\n");
//         alert(errorMessages);
//       } else {
//         alert("Network error or server is down. Please try again later.");
//       }
//       setTimeout(() => setFeedback(""), 2000);
//     }
//     setLoading(false);
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

      if (!formData.full_name.trim()) {
      alert("Name is required");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email format");
      return;
    }

    const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
    const isValid = isValidPhoneNumber(fullPhone, code);

    if (!isValid) {
      toast.error("Invalid phone number for selected country.");
      return;
    }

  setLoading(true);
  const result = await submitInquiry(formData);
  setLoading(false);

  if (result.success) {
    toast.success("Inquiry sent successfully!");
    setFormData({
      full_name: "",
      phone: "",
      email: "",
      message: "",
      country_code: code,
      subject: page,
    });
    setTimeout(() => setFeedback(""), 2000);
  } else {
    alert(result.error);
    setTimeout(() => setFeedback(""), 2000);
  }
};
  return (
    <div className="flex justify-end py-10 md:py-24 macbook:w-[390px]">
      <div className="py-8 px-4 border-2 macbook:w-full border-gray-400 rounded-lg">
        <p className="text-2xl font-newsLetter macbook:text-[28px] mb-4 text-gray-500">
          Ask Your Valuable Questions
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-2">
          <label className="text-md font-montserrat text-gray-500 macbook:text-[24px]">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full font-montserrat p-2 border-[1px] macbook:text-[18px] border-[#8F8F8F] rounded-md focus:outline-none"
          />

          <label className="text-md font-montserrat text-[#8F8F8F] macbook:text-[24px]">
            Your Phone
          </label>
          <div className="w-full flex items-start gap-1">
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

          <label className="text-md text-[#8F8F8F] font-montserrat macbook:text-[24px]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className="w-full p-2 border-[1px] border-[#8F8F8F] font-montserrat rounded-md macbook:text-[18px] focus:outline-none"
          />

          <label className="text-md text-[#8F8F8F] font-montserrat macbook:text-[24px]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border-[1px] macbook:text-[18px] border-[#8F8F8F] font-montserrat rounded-md focus:outline-none h-24 resize-none"
            placeholder="Enter Message"
          />

          <button
            type="submit"
            className="px-4 w-full py-2 font-montserrat bg-[#8F8F8F] hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] text-white rounded-md mt-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Inquiry"}
          </button>
          {feedback && (
            <p className="mt-2 text-center text-[#8F8F8F] font-montserrat">
              {feedback}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

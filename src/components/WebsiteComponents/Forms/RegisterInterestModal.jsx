"use client";

import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiOutlineClose } from "react-icons/ai";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { formsApi } from "@/lib/api/forms";

const RegisterInterestModal = ({ isOpen, onClose, page }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    subject: page,
  });
  const [code, setCode] = useState("971"); // default UAE
  const recaptcha = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({ ...formData, phone: value });
    setCode(country.dialCode);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;

  //   if (!captchaValue) {
  //     toast.error("Please verify the Captcha");
  //     return;
  //   }

  //   if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
  //     toast.error("Name, Email, and Phone number are required!");
  //     return;
  //   }

  //   const fullPhone = `+${formData.phone.replace(/\s+/g, "")}`;
  //   const isValid = isValidPhoneNumber(fullPhone);

  //   if (!isValid) {
  //     toast.error("Invalid phone number.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // await axios.post("/api/your-endpoint", {
  //     //   ...formData,
  //     //   country_code: code,
  //     //   subject: page,
  //     // });

  //     toast.success("Form Submitted");
  //     setFormData({ name: "", email: "", phone: "", description: "" });
  //     onClose();
  //   } catch (error) {
  //     console.error("Error submitting form:", error.message);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;

  if (!captchaValue) {
    toast.error("يرجى التحقق من الكابتشا");
    return;
  }

  if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
    toast.error("الاسم والبريد الإلكتروني ورقم الهاتف مطلوبة!");
    return;
  }

  const fullPhone = `+${formData.phone.replace(/\s+/g, "")}`;
  const isValid = isValidPhoneNumber(fullPhone);

  if (!isValid) {
    toast.error("رقم الهاتف غير صالح.");
    return;
  }

  setLoading(true);

  try {
    await formsApi.submitInquiryForm({
      property_detail_id: property?.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
      country_code: code,
      brochure_type: "",
      subject: page,
    });

    toast.success("تم إرسال النموذج");
    setFormData({ name: "", email: "", phone: "", description: "" });
    onClose();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("حدث خطأ ما");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[80%] md:w-3/5 flex flex-col md:flex-row overflow-hidden relative md:pr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/registerform.png"
            alt="Tour"
            width={500}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="relative bg-white w-full max-w-md p-6 rounded-lg py-12">
          <h2 className="text-[17px] md:text-2xl text-black font-semibold mb-4">
            سجل اهتمامك
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] mt-8">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="اسمك"
              className="w-full border-b border-black outline-none py-2 text-gray-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="عنوان البريد الإلكتروني"
              className="w-full border-b border-black outline-none py-2 text-gray-600"
            />

            {/* ✅ Replaced with react-phone-input-2 */}
            <PhoneInput
  country={"ae"} // Default UAE
  value={formData.phone}
  onChange={handlePhoneChange}
  enableSearch={true}   // ✅ Enables country search
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
    maxHeight: "200px", // ✅ scrollable if too many options
  }}
  searchStyle={{
    margin: "5px 0", // ✅ style for search input
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  }}
/>


            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="رسالة"
              rows={1}
              className="w-full border-b border-black outline-none py-2 text-gray-600 resize-none"
            ></textarea>

            <ReCAPTCHA ref={recaptcha} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />

            <button
              type="submit"
              className="bg-[#8F8F8F] w-full text-white py-3 rounded-lg hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] transition"
              disabled={loading}
            >
              {loading ? "تقديم" : "يُقدِّم"}
            </button>
          </form>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default RegisterInterestModal;

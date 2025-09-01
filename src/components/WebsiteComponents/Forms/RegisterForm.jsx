"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from "libphonenumber-js";
import { formsApi } from "@/lib/api/forms";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function RegisterForm({ isOpen, onClose, page }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle phone change from react-phone-input-2
  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setCode(country.dialCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaValue = recaptcha.current ? recaptcha.current.getValue() : null;

    if (!captchaValue) {
      alert("يرجى التحقق من الكابتشا");
      return;
    }

    const fullPhone = `+${formData.phone.replace(/\s+/g, "")}`;
    const isValid = isValidPhoneNumber(fullPhone);

    if (!isValid) {
      toast.error("رقم الهاتف غير صالح للبلد المحدد");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country_code: code,
      description: formData.description,
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

      onClose();
      toast.success("تم إرسال النموذج بنجاح");
      recaptcha.current.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      const { errors } = error.response?.data || {};
      if (errors && typeof errors === "object") {
        const errorMessages = Object.values(errors)
          .map((errArray) => errArray.join(" "))
          .join("\n");
        alert(errorMessages);
      } else {
        alert("خطأ في الشبكة أو الخادم معطل. يُرجى المحاولة لاحقًا.");
      }
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
        className="relative bg-white w-full max-w-lg p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          onClick={onClose}
          aria-label="Close form"
        >
          &times;
        </button>
        <h2 className="text-[17px] md:text-2xl text-black font-newsLetter font-semibold mb-4">
          Register your interest
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
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

          {/* ✅ Country Code + Phone with search */}
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

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="رسالة"
            rows={1}
            className="w-full border-b-[0.5px] font-montserrat macbook:text-[22px] border-black outline-none py-2 text-gray-600 resize-none"
          />
          <ReCAPTCHA
            ref={recaptcha}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          />
          <button
            type="submit"
            className="bg-[#8F8F8F] text-center flex items-center justify-center w-full font-montserrat text-white py-3 macbook:text-[18px] px-4 rounded-lg hover:bg-transparent hover:text-[#8F8F8F] border hover:border-[#8F8F8F] transition"
            disabled={loading}
          >
            {loading ? "تقديم" : "يُقدِّم"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

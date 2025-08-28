"use client";

import { submitFaqQuestion } from "@/lib/api/faqs.server";
import { useState, useRef } from "react";

const SubmitQuestion = () => {
  const formRef = useRef(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateInput = (field, value) => {
    let errorMessage = "";
    if (!value.trim()) {
      errorMessage = "This field is required.";
    } else if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      errorMessage = "Enter a valid email address.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    if (Object.values(errors).some((error) => error)) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      await submitFaqQuestion(formData); // API call from service
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";

      setIsPopUpVisible(true);
      setTimeout(() => setIsPopUpVisible(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="flex flex-col items-center w-full">
        <div className="text-center mb-8">
          <p className="text-[#8F8F8F] font-newsLetter text-[26px] md:text-[36px] uppercase mb-2">
            Submit Question
          </p>
          <p className="text-[17px] font-montserrat md:text-[18px] text-[#555555]">
            We’re here to help! Share your questions, and we’ll provide answers.
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          ref={formRef}
          className="w-[90%] flex flex-col items-center md:w-[50%] macbook:w-[30%] space-y-5"
        >
          <div className="flex flex-col md:flex-row gap-[20px] justify-between w-full">
            <div className="md:w-[50%]">
              <input
                type="text"
                ref={nameRef}
                placeholder="Your Name"
                className="border py-[12px] w-full font-montserrat border-[#0B0B0B] outline-none pl-[20px] rounded-[8px]"
                onChange={(e) => validateInput("name", e.target.value)}
                required
              />
              {errors.name && (
                <p className="text-red-500 font-montserrat text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="md:w-[50%]">
              <input
                type="email"
                ref={emailRef}
                placeholder="Email Address"
                className="border py-[12px] w-full font-montserrat outline-none border-[#0B0B0B] pl-[20px] rounded-[8px]"
                onChange={(e) => validateInput("email", e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-red-500 font-montserrat text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <textarea
            ref={messageRef}
            placeholder="Message"
            className="border font-montserrat outline-none py-[12px] pl-[20px] border-[#0B0B0B] rounded-[8px] w-full"
            onChange={(e) => validateInput("message", e.target.value)}
            required
          ></textarea>
          {errors.message && (
            <p className="text-red-500 font-montserrat text-sm mt-1">
              {errors.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#8F8F8F] font-montserrat w-full md:w-[180px] text-white py-2 px-6 rounded hover:bg-white hover:text-[#8F8F8F]"
          >
            Send Message
          </button>
        </form>

        {isPopUpVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
                Message Submitted Successfully!
              </h3>
              <p className="text-gray-600 font-montserrat">
                Thank you for your time. We'll get back to you soon.
              </p>
              <button
                className="mt-6 px-6 py-2 bg-[#A39D9D] text-white rounded-full font-montserrat"
                onClick={() => setIsPopUpVisible(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitQuestion;

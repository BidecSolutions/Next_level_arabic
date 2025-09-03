"use client";

import { useEffect, useRef, useState } from "react";
// import ReactCountryDropdown from "react-country-dropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
// import axios from "@/utils/axios"; // ✅ adjust path if needed
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";

const MultiStepPropertyForm = () => {
  const property = {
    form: [
      {
        heading: "حدد عدد غرف النوم",
        fields: [
          { label: "استوديو", value: "Studio" },
          { label: "شقق بغرفة نوم واحدة", value: "1 Bedroom Flats" },
          { label: "شقق بغرفتي نوم", value: "2 Bedroom Flats" },
          { label: "شقق مكونة من 3 غرف نوم أو أكثر", value: "3+ Bedroom Flats" },
        ],
      },
    ],
  };

  const [code, setCode] = useState("971");
  const totalSteps = property?.form.length + 1;
  const [currentStep, setCurrentStep] = useState(1);
  const [qAndA, setQAndA] = useState([]);
  const [formData, setFormData] = useState({
    bedrooms: "",
    budget: "",
    purpose: "",
    paymentMethod: "",
    movePlan: "",
    fullName: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef(null);

  useEffect(() => {
    const firstStep = property.form[0];
    if (firstStep?.fields?.length > 0) {
      const firstValue = firstStep.fields[0].value;

      setFormData((prev) => ({
        ...prev,
        [`step1`]: firstValue,
      }));

      setQAndA((prev) => {
        const updated = [...prev];
        updated[0] = {
          question: firstStep.heading,
          ans: firstValue,
        };
        return updated;
      });
    }
  }, []);

  const handleOptionSelect = (field, value) => {
    const currentQuestion = property.form[currentStep - 1]?.heading;

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setQAndA((prev) => {
      const updated = [...prev];
      updated[currentStep - 1] = {
        question: currentQuestion,
        ans: value,
      };
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    // const captchaValue = recaptcha.current
    //   ? recaptcha.current.getValue()
    //   : null;

    // if (!captchaValue) {
    //   alert("Please Verify the Captcha");
    //   return;
    // }

    // // ✅ Validate phone
    // const fullPhone = `+${code}${formData.phoneNumber.replace(/\s+/g, "")}`;
    // const isValid = isValidPhoneNumber(fullPhone, code);

    // if (!isValid) {
    //   toast.error("Invalid phone number for selected country.");
    //   return;
    // }

    // if (!formData.fullName || !formData.phoneNumber) {
    //   toast.error("Please fill in your name and phone number");
    //   return;
    // }

    // setLoading(true);
    // try {
    //   await axios.public.post("user/ready-properties/call-back-form", {
    //     name: formData.fullName,
    //     countryCode: `+${code}`,
    //     phoneNo: formData.phoneNumber,
    //     qAndA,
    //   });

    //   toast.success("Form submitted successfully!");
    //   setFormData({
    //     bedrooms: "",
    //     budget: "",
    //     purpose: "",
    //     paymentMethod: "",
    //     movePlan: "",
    //     fullName: "",
    //     phoneNumber: "",
    //   });
    //   setQAndA([]);
    //   setCurrentStep(1);
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   toast.error("Failed to submit. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const OptionButton = ({ field, value, children }) => (
    <button
      onClick={() => handleOptionSelect(field, value)}
      className={`px-4 py-2 border rounded-lg text-md font-medium transition-all duration-200
        ${
          formData[field] === value
            ? "bg-gray-500 text-white shadow-md"
            : "bg-white text-[#A39D9D] border-gray-300 hover:bg-gray-50"
        }`}
    >
      {children}
    </button>
  );

  const renderStep = () => {
    const formSteps = property?.form || [];

    if (currentStep <= formSteps.length) {
      const currentFormStep = formSteps[currentStep - 1];
      return (
        <>
          <h3 className="text-xl md:text-2xl uppercase font-semibold text-[#A39D9D] mb-6">
            {currentFormStep.heading}
          </h3>
          <div className="flex flex-wrap gap-4">
            {Array.isArray(currentFormStep?.fields) &&
              currentFormStep.fields.map((field, idx) => (
                <OptionButton
                  key={idx}
                  field={`step${currentStep}`}
                  value={field.value}
                >
                  {field.label}
                </OptionButton>
              ))}
          </div>
        </>
      );
    }

    if (currentStep === formSteps.length + 1) {
      return (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-[#A39D9D] mb-6">
            اترك طلبًا وسيقوم المساعد باختيار العقار
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="اسم"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-lg"
            />
            <div className="w-full flex items-center gap-2">
              {/* <ReactCountryDropdown
                defaultCountry="AE"
                className="bg-transparent"
                onSelect={(country) => setCode(country.callingCodes[0])}
              /> */}
              <input
                type="tel"
                name="phoneNumber"
                maxLength="15"
                placeholder="رقم التليفون"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border-b-[0.5px] font-montserrat mb-2 macbook:text-[22px] border-gray-300 outline-none py-2 text-gray-600"
              />
            </div>
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          </div>
        </>
      );
    }

    return null;
  };

  const calculateProgressBarWidth = () => {
    return `${(currentStep / totalSteps) * 100}%`;
  };

  return (
    <div className="max-w-xl mx-auto my-12">
      <div className="mb-8">
        <h2 className="text-[#A39D9D] text-xl md:text-2xl font-newsLetter mb-2 uppercase">
          {property?.form_main_heading}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
         خطوة {currentStep} ل {totalSteps}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-[#A39D9D] h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: calculateProgressBarWidth() }}
          ></div>
        </div>
      </div>

      <div className="min-h-[200px] flex flex-col justify-center">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className={`flex items-center px-6 py-3 border border-gray-400 rounded-lg text-gray-800 font-medium transition-colors duration-200
            ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
        >
          <IoIosArrowBack />
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={goToNextStep}
            className="flex items-center px-6 py-3 border border-[#A39D9D] rounded-lg text-[#A39D9D] font-medium hover:bg-gray-500 hover:text-white transition-colors duration-200"
          >
           السؤال التالي <IoChevronForward />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-white hover:text-gray-500 border hover:border-gray-500 transition-colors duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? "تقديم" : "يُقدِّم"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepPropertyForm;

"use client";
import { useEffect, useState } from "react";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
// import { Country, City, State } from "country-state-city";
import { useTranslation } from "react-i18next";
// import Select from "react-select";

export default function RegisterForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    billing_address: "",
    country: "Saudi Arabia", // ISO code for Saudi Arabia
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    const defaultCities = City.getCitiesOfCountry("SA");
    setCities(defaultCities);
    const defaultStates = State.getStatesOfCountry("SA");
    setStates(defaultStates);
  }, []);
    useEffect(() => {
    if (formData.state) {
       const selectedState = states.find((s) => s.name == formData.state);
       const selectedCountry = countries.find((s) => s.name == formData.country);
      const allCities = City.getCitiesOfState(
       selectedCountry.isoCode,
       selectedState.isoCode 
      );
      
      setCities(allCities);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // After updating formData, revalidate current field
      validateField(name, value, updated); // pass updated formData

      if (name === "password" || name === "confirmPassword") {
        validateField("confirmPassword", updated.confirmPassword, updated);
      }
      // If password becomes empty, reset confirmPassword too
      if (name === "password" && value === "") {
        updated.confirmPassword = "";
      }

      return updated;
    });
    validateField(name, value);
    if (name === "password" && formData.password.length < 1) {
      setFormData({ ...prev, confirmPassword: "" });
    }
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    // Step 1: Update state in form data and reset city
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "", // reset city when state changes
    }));

    // Step 2: Get state's ISO code
    const stateList = State.getStatesOfCountry("SA"); // SA = Saudi Arabia
    const matchedState = stateList.find(
      (state) => state.name === selectedState
    );
    const isoCode = matchedState?.isoCode;

    // Step 3: Get cities based on selected state ISO code
    const selectedCities = City.getCitiesOfState("SA", isoCode);
    setCities(selectedCities); // set dropdown values

    // Step 4: Clear validation error if present
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: "" }));
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: selectedCountryCode,
      state: "",
      city: "", // Reset city
    }));
    const selectedCities = City.getCitiesOfCountry(selectedCountryCode);
    const selectedStates = State.getStatesOfCountry(selectedCountryCode);
    setCities(selectedCities);
    setStates(selectedStates);

    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "الاسم الأول مطلوب";
    if (!formData.last_name.trim())
      newErrors.last_name = "الاسم الأخير مطلوب";
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "تنسيق البريد الإلكتروني غير صالح";
    }
    if (!formData.phone) {
      newErrors.phone = "الهاتف مطلوب";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صالح";
    }
    if (!formData.billing_address)
      newErrors.billing_address = "العنوان مطلوب";
    if (!formData.country) newErrors.country = "البلد مطلوب";
    if (!formData.city) newErrors.city = "المدينة مطلوبة";
    if (!formData.state) newErrors.state = "الدولة مطلوبة";


    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value.trim()) error = "الاسم الأول مطلوب";
        break;
      case "last_name":
        if (!value.trim()) error = "الاسم الأخير مطلوب";
        break;
      case "email":
        if (!value) {
          error = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "تنسيق البريد الإلكتروني غير صالح";
        }
        break;
      case "phone":
        if (!value) {
          error = "الهاتف مطلوب";
        } else if (!/^\+?[0-9]{10,15}$/.test(value)) {
          error = "رقم الهاتف غير صالح";
        }
        break;
      case "billing_address":
        if (!value) error = "العنوان مطلوب";
        break;
      case "country":
        if (!value) error = "البلد مطلوب";
        break;
        case "state":
        if (!value) error = "الدولة مطلوبة";
        break;
      case "city":
        if (!value) error = "المدينة مطلوبة";
        break;

      case "password":
        if (!value) {
          error = "كلمة المرور مطلوبة";
        } else if (value.length < 6) {
          error = "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "كلمات المرور غير متطابقة";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      name: `${formData.first_name} ${formData.last_name}`.trim(),
      // city: formData.city,
    };
    console.log(updatedFormData);
    if (validate()) {
      onSubmit(updatedFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block mb-1 text-sm font-medium">
            {t("الاسم الأول")}
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-1 text-sm font-medium">
            {t("اسم العائلة")}
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {/* Email Field */}
        <div className="w-1/2">
          <label className="block mb-1 text-sm font-medium">{t("بريد إلكتروني")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        {/* Phone Field */}
        <div className="w-1/2">
          <label className="block mb-1 text-sm font-medium">
            {t("رقم التليفون")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            className={`w-full p-2 border rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="1234567890"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>


            <div className="flex flex-col md:flex-row md:gap-4 w-full">
      <div className="md:w-1/3 md:mt-3">
        <label className="block text-sm font-medium">{t("دولة")}</label>
        <input
          type="text"
          name="country"
          value="Saudi Arabia"
          disabled
          readOnly
          className="w-full p-1.5 border border-gray-200 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
        />
      </div>

      {/* State Dropdown */}
      {/* <div className="mt-4">
        <label className="block mb-1 text-sm font-medium">{t("State")}</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          list="state-options"
          className={`w-full p-2 border rounded-md ${
            errors.state ? "border-red-500" : "border-gray-300"
            
          }`}
          placeholder={t("Search for a state")}
        />
        <datalist id="state-options">
          {states.map((state) => (
            <option key={state.isoCode} value={state.name} />
          ))}
        </datalist>

        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
        )}
      </div> */}

      <div className="mt-2 md:w-1/3">
        <label className="block mb-1 text-sm font-medium">{t("ولاية")}</label>
         {states.length > 0 && (
        <Select
          name="state"
          value={
            states.find((option) => option.name === formData.state)
              ? { value: formData.state, label: formData.state }
              : null
          }
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              state: selected?.value || "",
            }));
            if (errors.state) {
              setErrors((prev) => ({ ...prev, state: "" }));
            }
          }}
          //  onChange={handleStateChange}

          options={states.map((city) => ({
            value: city.name,
            label: city.name,
          }))}
          placeholder={t("اختر دولة")}
          className="text-sm"
          classNamePrefix="react-select"
          isClearable
        />
         )}
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
        )}
      </div>

      {/* City Dropdown */}
      {/* <div className="mt-4">
  <label className="block mb-1 text-sm font-medium">{t("City")}</label>
  <select
    name="city"
    value={formData.city}
    onChange={handleChange}
    className={`w-full p-2 border rounded-md ${
      errors.city ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option value="">{t("Select a city")}</option>
    {cities.map((city, index) => (
      <option key={index} value={city.name}>
        {city.name}
      </option>
    ))}
  </select>
  {errors.city && (
    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
  )}
</div> */}

      <div className="mt-2 md:w-1/3">
        <label className="block mb-1 text-sm font-medium">{t("مدينة")}</label>
         {cities.length > 0 && (
        <Select
          name="city"
          value={
            cities.find((option) => option.name === formData.city)
              ? { value: formData.city, label: formData.city }
              : null
          }
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              city: selected?.value || "",
            }));
            if (errors.city) {
              setErrors((prev) => ({ ...prev, city: "" }));
            }
          }}
          options={cities.map((city) => ({
            value: city.name,
            label: city.name,
          }))}
          placeholder={t("اختر مدينة")}
          className="text-sm"
          classNamePrefix="react-select"
          isClearable
        />
         )}
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>
      </div>

            {/* Address Field */}
       <div>
        <label className="block mb-1 text-sm font-medium">{t("عنوان")}</label>
        <textarea
          name="billing_address"
          value={formData.billing_address}
          onChange={handleChange}
          required
          rows={2}
          className={`w-full resize-none p-2 border rounded-md ${
            errors.billing_address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.billing_address && (
          <p className="mt-1 text-sm text-red-600">{errors.billing_address}</p>
        )}
      </div>

      <div className="flex gap-4">
        {/* Password Field */}
        <div className="w-1/2 relative">
          <label className="block mb-1 text-sm font-medium">
            {t("كلمة المرور")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className={`w-full p-2 pr-10 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <IoEyeSharp className="w-5 h-5" />
            ) : (
              <BsFillEyeSlashFill className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="w-1/2 relative">
          <label className="block mb-1 text-sm font-medium">
            {t("تأكيد كلمة المرور")}{" "}
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={!formData.password}
            className={`w-full p-2 pr-10 border rounded-md ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <IoEyeSharp className="w-5 h-5" />
            ) : (
              <BsFillEyeSlashFill className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {errors.password && (
        <p className="text-sm text-red-600">{errors.password}</p>
      )}
      {!errors.password && errors.confirmPassword && (
        <p className="text-sm text-red-600">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("إنشاء الحساب")}{" "}
          </span>
        ) : (
          t("يسجل")
        )}
      </button>
    </form>
  );
}

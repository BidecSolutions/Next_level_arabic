"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Image_URL } from "@/config/constants";
import "./CustomBanner.css";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";
import { getPropertyManagementDetailUsingSlug, storeFreeConsultation } from "@/lib/api/sevice.server";
import RegisterForm from "../Forms/RegisterForm";

const CustomBanner = ({ pmId, propData }) => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("971");
    // const recaptcha = useRef(null);
    const pathname = usePathname();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    //   useEffect(() => {
    //     if (!propData) {
    //       const fetchData = async () => {
    //         try {
    //           const response = await axios.public.post(
    //             `user/property-managements/propertyManagementDetailUsingSlug`,
    //             { slug: `${pmId}/` }
    //           );
    //           const responseData = response.data.data;

    //           if (responseData.status === 1) {
    //             setData(responseData);
    //           }
    //         } catch (error) {
    //           console.log("Error fetching property data:", error);
    //         }
    //       };

    //       fetchData();
    //     } else {
    //       setData(propData);
    //     }
    //   }, [pmId, pathname, propData]);

    useEffect(() => {
        if (!propData) {
            const fetchData = async () => {
                try {
                    const response = await getPropertyManagementDetailUsingSlug(pmId);
                    const responseData = response?.data;

                    if (responseData?.status === 1) {
                        setData(responseData);
                    }
                } catch (error) {
                    console.log("Error fetching property data:", error);
                }
            };
            fetchData();
        } else {
            setData(propData);
        }
    }, [pmId, pathname, propData]);
    // useEffect(() => {
    //   if (!propData) {
    //     const fetchData = async () => {
    //       try {
    //         const res = await getPropertyManagementDetailUsingSlug(pmId);
    //         const responseData = res?.data || res; // handle both cases
    //         if (responseData?.status === 1) {
    //           setData(responseData);
    //         }
    //       } catch (error) {
    //         console.log("Error fetching property data:", error);
    //       }
    //     };
    //     fetchData();
    //   } else {
    //     setData(propData);
    //   }
    // }, [pmId, pathname, propData]);


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const captchaValue = recaptcha.current
    //       ? recaptcha.current.getValue()
    //       : null;

    //     if (!captchaValue) {
    //       alert(" Please Verify the Captcha");
    //       return;
    //     }
    //     if (!formData.name.trim()) {
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
    //       await axios.public.post("user/general-functions/getFreeConsultantStore", {
    //         property_management_id: data?.id,
    //         name: formData.name,
    //         email: formData.email,
    //         country_code: code,
    //         phone_no: formData.phone,
    //         description: formData.description,
    //         subject: data?.banner_heading,
    //       });

    //       setFormData({
    //         name: "",
    //         email: "",
    //         phone: "",
    //         description: "",
    //       });
    //       toast.success("Form submitted successfully");

    //       setIsModalOpen(false);
    //     } catch (error) {
    //       console.error("Error submitting form:", error.message);
    //       const { errors } = error.response?.data || {};
    //       if (errors && typeof errors === "object") {
    //         const errorMessages = Object.values(errors)
    //           .map((errArray) => errArray.join(" "))
    //           .join("\n");
    //         alert(errorMessages);
    //       } else {
    //         alert(
    //           "Network error or server is down. Please try again later."
    //         );
    //       }
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const captchaValue = recaptcha.current?.getValue();
        if (!captchaValue) {
            alert("يرجى التحقق من الكابتشا");
            return;
        }
        if (!formData.name.trim()) {
            alert("الاسم مطلوب");
            return;
        }
        if (!formData.phone.trim()) {
            alert("رقم الهاتف مطلوب");
            return;
        }
        if (!formData.email.trim()) {
            alert("البريد الإلكتروني مطلوب");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("تنسيق البريد الإلكتروني غير صالح");
            return;
        }

        const fullPhone = `+${code}${formData.phone.replace(/\s+/g, "")}`;
        if (!isValidPhoneNumber(fullPhone, code)) {
            toast.error("رقم الهاتف غير صالح للبلد المحدد.");
            return;
        }

        setLoading(true);

        try {
            await storeFreeConsultation({
                property_management_id: data?.id,
                name: formData.name,
                email: formData.email,
                country_code: code,
                phone_no: formData.phone,
                description: formData.description,
                subject: data?.banner_heading,
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                description: "",
            });
            toast.success("تم إرسال النموذج بنجاح");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error submitting form:", error.message);
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

    return (
        <div className="flex justify-center text-white">
            <div
                className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${data?.banner_image
                            ? `${Image_URL}${data.banner_image}`
                            : "/Areas/banner.png"
                        })`,
                }}
            >
                <h1 className="text-2xl font-newsLetter md:text-5xl text-center font-bold uppercase">
                    {data
                        ? data?.banner_heading
                        : "خبراء إدارة العقارات الإيجارية من الدرجة الأولى"}
                </h1>
                <button
                    className="my-4 px-4 p-2 font-montserrat text-[14px] md:text-[16px] py-2 bg-[#8F8F8F] text-white rounded-[5px] duration-300 hover:bg-[#6d6969]"
                    onClick={handleOpenModal}
                >
                    احصل على استشارة مجانية
                </button>
            </div>

           <RegisterForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={data?.home_category?.name}
      />
        </div>
    );
};

export default CustomBanner;

"use client";

import { sendContactDetails } from "@/lib/api/forms";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sendContactDetails(formData);
      if (result.status === "success") {
        setResponseMessage("تم تسليم الرسالة بنجاح");
        setFormData({
          name: "",
          email: "",
          mobile_no: "",
          subject: "",
          message: "",
        });
      }
    } catch {
      setResponseMessage("فشل إرسال الرسالة. يُرجى المحاولة مرة أخرى.");
    }
    setTimeout(() => setResponseMessage(""), 2000);
  };

  return (
    <div>
      {/* Banner */}
      <div className="relative mb-[70rem] z-10 lg:mb-[30rem] xl:mb-[30rem]">
        <div className="flex justify-center w-full text-white">
          <div
            className="relative h-[34rem] md:h-[650px] w-[90%] md:w-[95%] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/Areas/banner.png')" }}
          >
            <h1 className="text-2xl md:text-5xl font-newsLetter font-bold">
              اتصل بنا
            </h1>
            <p className="text-lg md:text-xl font-montserrat">بيت \ اتصل بنا</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="absolute z-10 top-[80%] w-full flex flex-col lg:flex-row justify-center items-stretch p-5">
          {/* Get in Touch */}
          <div className="w-full md:w-1/3 text-white p-8 rounded-l-3xl md:rounded-l-3xl bg-[#555555] shadow-xl flex flex-col justify-center min-h-[500px]">
            <h3 className="text-3xl font-bold mb-4">تواصل معنا</h3>
            <p className="mb-8">
             هل لديك أسئلة أو تحتاج إلى مساعدة؟ نحن هنا لمساعدتك! تواصل معنا، وسنرد عليك في أقرب وقت ممكن.
            </p>
            <div className="flex items-center mb-6">
              <div className="border p-1 mr-4 rounded-md">
                <TfiEmail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">عنوان البريد الإلكتروني</p>
                <p>media@nextlevelrealestate.ae</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <div className="border p-1 mr-4 rounded-md">
                <LuPhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">رقم التليفون</p>
                <p>+(971) 4-454-2828</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="border p-1 mr-4 rounded-md">
                <IoLocationSharp className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">عنوان المكتب</p>
                <p>
                  1505، برج أوبال، برج خليفة بوليفارد - الخليج التجاري - دبي.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/3 bg-white p-8 rounded-r-3xl md:rounded-r-3xl shadow-xl min-h-[500px] flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4 text-[#8F8F8F]">اتصل بنا</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="اسمك"
                  className="w-1/2 p-3 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="عنوان البريد الإلكتروني"
                  className="w-1/2 p-3 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  name="mobile_no"
                  maxLength="15"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  placeholder="هاتف"
                  className="w-1/2 p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="موضوع"
                  className="w-1/2 p-3 border rounded-lg"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="رسالة"
                className="w-full p-3 border rounded-lg"
                rows="4"
              />
              <button
                type="submit"
                className="h-10 bg-[#8F8F8F] text-white px-4 rounded-lg"
              >
                أرسل رسالة
              </button>
              {responseMessage && <p className="text-center mt-4">{responseMessage}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
  <iframe
        className="w-full h-72 my-8"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2317634754218!2d55.275131825499514!3d25.185046131987132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d3345b4265%3A0x84561af444b75ead!2sNext%20Level%20Real%20Estate%20-%20Best%20Real%20Estate%20Agency%20in%20Dubai!5e0!3m2!1sen!2s!4v1739200401503!5m2!1sen!2s"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

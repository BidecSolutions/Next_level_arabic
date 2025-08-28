"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "/public/logo.png"; 
import { getPopularSearches } from "@/lib/api/footer.server.js";
import { formsApi } from "@/lib/api/forms";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [navigations, setNavigations] = useState([]);
  // Mobile dropdown toggles
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isQuickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    // Static data for now
    setCategories([
      { id: 1, name: "Downtown Dubai", slug: "/downtown-dubai-properties-for-sale/" },
      { id: 2, name: "Jumeirah Village Circle", slug: "/jumeirah-village-cirlce/" },
      { id: 3, name: "Business Bay", slug: "/business-bay/" },
      { id: 4, name: "Jumeirah Lake Tower", slug: "/jumeirah-lake-towers/" },
      { id: 5, name: "Jumeirah Beach Residence", slug: "/jumeirah-beach-residence/" },
    ]);

    setProperties([
      { id: 1, name: "Emaar Properties", slug: "emaar-properties-dubai/" },
      { id: 2, name: "Dubai Properties", slug: "dubai-holding-properties/" },
      { id: 3, name: "Damac Properties", slug: "damac-properties/" },
      { id: 4, name: "Sobha Developer", slug: "sobha-realty-properties-for-sale/" },
      { id: 5, name: "Nakheel Properties", slug: "nakheel-developer/" },
      { id: 6, name: "Meeras Developers", slug: "meraas-developer/" },
      { id: 7, name: "Deyaar Developers", slug: "deyaar-development-dubai/" },
      { id: 8, name: "MAG Property", slug: "mag-lifestyle-development/" },
    ]);
  }, []);

    useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularSearches();
      setNavigations(data);
      console.log('footer',data)
    };
    fetchData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
    setLoading(true);
    await formsApi.SubscriptionForm(email);
    setEmail("");
    toast.success("Subscription successful!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Subscription failed");
  } finally {
    setLoading(false);
  }
  };

  const handleWhatsAppClick = (message = "Hello, I would like to inquire about your services.") => {
    const phoneNumber = "+971552588870";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const AboutLinks = [
    { id: 1, name: "Our Team", slug: "/our-team/" },
    { id: 2, name: "Contact Us", slug: "/contact/" },
    { id: 3, name: "About", slug: "/about-us/" },
    { id: 4, name: "Property Videos", slug: "/videos/" },
    { id: 5, name: "Privacy Policy", slug: "/privacy-policy/" },
    { id: 6, name: "Blogs", slug: "/my-blogs/" },
    { id: 7, name: "Awards", slug: "/" },
    { id: 8, name: "FAQ's", slug: "/faqs/" },
  ];

  return (
    <div>
      {/* Newsletter Section */}
      <section className="lg:px-20 relative rounded-[112px] md:rounded-[1000px] bg-[#555555] h-[142px] md:h-[200px] px-[20px] md:px-10">
        <div className="flex flex-col justify-between gap-10 pb-2 pt-6 md:py-10">
          <div className="md:w-[90%] flex flex-col items-center text-white">
            <p className="font-montserrat uppercase w-[270px] md:w-full text-center md:text-[39px] text-[17px]">
              Stay in the loop Through our newsletter
            </p>
            <p className="font-montserrat text-[9px] md:text-[19px]">
              Get to know about the latest real estate insights.
            </p>
          </div>
          <div
            className="md:w-[70%] bg-white font-montserrat w-[290px] md:h-[70px] rounded-[4.32px] md:rounded-[20px] left-[12%] md:left-[15%] bottom-[-20px] flex absolute flex-row justify-center items-center"
            style={{ boxShadow: "0px 4px 25.6px 0px #00000040" }}
          >
            <form className="w-full relative" onSubmit={handleSubscribe}>
              <input
                type="text"
                placeholder="Enter Your Email"
                className="w-full text-xs bg-transparent p-4 outline-none border-2 border-white rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="absolute top-[10px] md:top-[2px] right-3 rounded-[4px] flex gap-5 items-center px-4 md:px-8 py-2 md:py-4 text-[8px] md:text-xs bg-[#555555] text-white md:rounded-[17px]"
                type="submit"
                disabled={loading}
              >
                {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <section className="border-y text-[#555555] mt-16 border-white 2xl:px-20 px-[20px] md:px-10 flex lg:flex-row flex-col-reverse">
        {/* Left Logo & Social */}
        <div className="lg:border-r border-white lg:w-1/4 lg:p-10 py-10 flex flex-col items-center md:items-start gap-5">
          <Image src={logo} alt="Next Level Logo" width={176} height={60} />
          <p className="hidden md:block text-center lg:text-start font-montserrat">
            We value our clients and therefore leave no stone unturned in providing them the right properties.
          </p>
          <ul className="py-2 flex gap-2">
            <button
              className="flex items-center justify-center bg-white w-8 h-8 rounded-full"
              onClick={() => handleWhatsAppClick()}
            >
              <FaWhatsapp size={20} />
            </button>
            <a href="https://www.facebook.com/nextleveldubai" className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <FaFacebookF size={20} className="text-[#555]" />
            </a>
            <a href="https://www.instagram.com/Nextlevelrealestate.ae/" className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <FaInstagram size={20} className="text-[#555]" />
            </a>
            <a href="https://www.youtube.com/channel/UCtNFEfB4qPfMejiNKvRN1rA" className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <FaYoutube size={20} className="text-[#555]" />
            </a>
          </ul>
        </div>

        {/* Right Links */}
        {/* Mobile Accordions */}
        <div className="md:w-[70%]">
          {/* Popular Searches */}
          <div className="md:hidden">
            <div className="flex justify-between items-center py-3 border-b cursor-pointer" onClick={() => setServicesOpen(!isServicesOpen)}>
              <p className="text-[16px] font-medium">Popular Searches</p>
              {isServicesOpen ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </div>
            {isServicesOpen && (
              <ul className="py-1">
                {navigations.slice(0, 8).map((nav) => (
                  <Link key={nav.id} href={nav.slug} className="block">
                    {nav.name}
                  </Link>
                ))}
              </ul>
            )}
          </div>
          {/* Repeat similar mobile dropdowns for Off Plan, Popular Areas, About Us */}
          {/* Desktop */}
          <div className="hidden md:flex lg:flex-row flex-col gap-5 p-10">
            <div className="lg:w-1/3">
              <p className="text-[20px] font-semibold">Popular Searches</p>
              <ul className="py-5">
                {navigations.slice(0, 8).map((nav) => (
                  <Link key={nav.id} href={nav.slug} className="block">{nav.name}</Link>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/3">
              <p className="text-[20px] font-semibold">Off Plan Projects Developers</p>
              <ul className="py-5">
                {properties.map((dev) => (
                  <Link key={dev.id} href={`/developer/${dev.slug}`} className="block">
                    {dev.name.split(" ").slice(0, 3).join(" ")}
                  </Link>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/3">
              <p className="text-[20px] font-semibold">Popular Areas</p>
              <ul className="py-5">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/area${cat.slug}`} className="block">
                    {cat.name.split(" ").slice(0, 3).join(" ")}
                  </Link>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/3">
              <p className="text-2xl font-semibold">About Us</p>
              <ul className="py-5">
                {AboutLinks.map((link) => (
                  <Link key={link.id} href={link.slug} className="block">
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="lg:px-20 bg-[#555] rounded-[50px] md:rounded-[100px] text-white md:px-10 py-5 flex justify-between">
        <p className="text-[9px] md:text-sm">Next Level © {new Date().getFullYear()} All Rights Reserved</p>
        <div className="text-[9px] md:text-sm">
          <Link href="/term-condition">Terms of Service</Link> /{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </section>
    </div>
  );
}

export default Footer;

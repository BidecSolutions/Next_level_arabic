"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { searchProperties, getOffPlanProjects } from "@/lib/api/projects.server";
import "./header.css";
import { Image_NotFound, Image_URL } from "@/config/constants";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [isBuyMegaMenuOpen, setIsBuyMegaMenuOpen] = useState(false);
  const [isServicesMegaMenuOpen, setIsServicesMegaMenuOpen] = useState(false);
  const [isOffMegaMenuOpen, setIsOffMegaMenuOpen] = useState(false);
  const [isLatestMegaMenuOpen, setIsLatestMegaMenuOpen] = useState(false);
  const [isAreaMegaMenuOpen, setIsAreaMegaMenuOpen] = useState(false);
  const [isCommunityMegaMenuOpen, setIsCommunityMegaMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);

  const [services, setServices] = useState([
    {
      id: 1,
      title: "إدارة العقارات",
      image: "/pmanagment.jpg",
      link: "/services/property-management-services/",
    },
    {
      id: 2,
      title: "استأجر عقارًا",
      image: "/prent.webp",
      link: "/services/rent-a-property/",
    },
    {
      id: 3,
      title: "بِع عقارًا",
      image: "/pselling.jpg",
      link: "/services/sell-a-property/",
    },
    {
      id: 4,
      title: "اشترِ عقارًا",
      image: "/pbuying.jpg",
      link: "/services/buy-a-property/",
    },
  ]);

  const [offplanservices, setOffplanServices] = useState([
    {
      id: 1,
      title: "شقة على الخارطة",
      image: "/appartment.jpg",
      link: "/off-plan-apartment-for-sale/",
    },
    {
      id: 2,
      title: "فلل قيد الإنشاء",
      image: "/villa.webp",
      link: "/off-plan-villas-for-sale/",
    },
    {
      id: 3,
      title: "تاون هاوس قيد الإنشاء",
      image: "/Header1.png",
      link: "/off-plan-townhouses-for-sale/",
    },
    {
      id: 4,
      title: "بنتهاوس قيد الإنشاء",
      image: "/penthouse.jpg",
      link: "/off-plan-penthouses-for-sale/",
    },
  ]);

  const [areas, setAreas] = useState([
    {
      id: 1,
      title: "الخليج التجاري",
      image: "/buisnessbay.jpg",
      link: "/area/business-bay/",
    },
    {
      id: 2,
      title: "وسط مدينة دبي",
      image: "/downtown.jpeg",
      link: "/area/downtown-dubai-properties-for-sale/",
    },
    {
      id: 3,
      title: "نخلة جميرا",
      image: "/palm.jpg",
      link: "/area/palm-jumeirah/",
    },
    {
      id: 4,
      title: "مارينا دوباري",
      image: "/dubari.webp",
      link: "/area/dubai-marina/",
    },
  ]);

  const [communities, setCommunities] = useState([
    {
      id: 1,
      title: "ميناء خور دبي",
      image: "/creek.png",
      link: "/community/dubai-creek-harbour-properties-for-sale/",
    },
    {
      id: 2,
      title: "داماك لاجونز",
      image: "/damac.jpg",
      link: "/community/damac-lagoons-properties-for-sale/",
    },
    {
      id: 3,
      title: "الوادي",
      image: "/valley.jpg",
      link: "/community/the-valley-properties-for-sale/",
    },
    {
      id: 4,
      title: "داماك هيلز",
      image: "/hill.jpg",
      link: "/community/damac-hills-properties-for-sale/",
    },
  ]);

  const [offPlan, setOffPlan] = useState([]);
  const [buy, setBuy] = useState([
    {
        id: 1,
        title: "شقق للبيع",
        image: "/appartment.jpg",
        link: "/buy/apartments-for-sale/",
      },
      {
        id: 2,
        title: "فلل للبيع",
        image: "/villa.webp",
        link: "/buy/villas-for-sale/",
      },
      {
        id: 3,
        title: "تاون هاوس للبيع",
        image: "/Header1.png",
        link: "/buy/townhouses-for-sale/",
      },
      {
        id: 4,
        title: "بنتهاوس للبيع",
        image: "/penthouse.jpg",
        link: "/buy/penthouses-for-sale/",
      },
  ]);
  const [HomeFilters, setHomeFilters] = useState({
    activeTab: "خارج الخطة",
    propertyType: "",
    PropertyName: "",
    priceTypeOrSize: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const projects = await getOffPlanProjects();
      console.log('يحاول',projects)
      setOffPlan(projects);
    }
    fetchData();
  }, []);

  const toggleShowNavbar = () => {
    setShowNav(!showNav);
  };

  // const handleInputChange = async (e) => {
  //   const { name, value } = e.target;
  //   setHomeFilters((prev) => ({ ...prev, [name]: value }));
  //   if (name === "PropertyName" && value.length >= 2) {
  //     // Here you'd replace the axios call with a Next.js compatible data fetch
  //     // For this example, we'll use a dummy suggestion list
  //     const dummySuggestions = [
  //       {
  //         id: 1,
  //         title: "Ready Property A",
  //         slug: "ready-property-a",
  //         type: "readyProperty",
  //       },
  //       {
  //         id: 2,
  //         title: "Off Plan Project B",
  //         slug: "off-plan-project-b",
  //         type: "offPlan",
  //       },
  //     ];
  //     setSuggestions(
  //       dummySuggestions.filter((item) =>
  //         item.title.toLowerCase().includes(value.toLowerCase())
  //       )
  //     );
  //     setShowSuggestions(true);
  //   } else {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //   }
  // };
const handleInputChange = async (e) => {
  const { name, value } = e.target;
  setHomeFilters((prev) => ({ ...prev, [name]: value }));

  if (name === "PropertyName") {
    const results = await searchProperties(value);
    if (results.length) {
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }
};

  const handleSubmit = () => {
    const path = "/off-plan/";
    router.push(path);
    setHomeFilters({
      activeTab: "خارج الخطة",
      propertyType: "",
      PropertyName: "",
      priceTypeOrSize: "",
    });
  };

  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="fixed w-full z-50 top-[10px] md:top-[30px] flex justify-center items-center h-[30px] md:h-[100px]">
        <div id="header" className="w-full flex justify-between items-center">
          <div className="flex relative lg:justify-around items-center w-[90%] lg:w-[90%] macbook:w-[70%] lg:items-center h-[60px] md:h-[100px] lg:bg-white rounded-bl-[20px] rounded-br-[20px]">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={130}
                height={50}
                className="w-[130px] h-[50px] object-contain"
              />
            </Link>

            {/* Desktop Header */}
            <ul className="hidden lg:flex h-full w-[80%] macbook:w-[80%] justify-center items-center xl:gap-[1.5rem] lg:gap-4 macbook:gap-14">
              <li
                onMouseEnter={() => setIsBuyMegaMenuOpen(true)}
                onMouseLeave={() => setIsBuyMegaMenuOpen(false)}
              >
                <button className="flex items-center font-newsLetter text-[13px] macbook:text-[18px]">
                  <Link href="">يشتري</Link>
                  {isBuyMegaMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {isBuyMegaMenuOpen && buy.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {buy.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                          onClick={() => router.push(property.link)}
                        >
                          <div className="relative">
                            <Image
                              src={property.image}
                              alt={property.title}
                              width={300}
                              height={144}
                              className="w-[300px] h-36 macbook:h-44 object-cover"
                            />
                          </div>
                          <div className="p-2 bg-gray-100 text-center">
                            <h3 className="text-xs text-black font-semibold">
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setIsServicesMegaMenuOpen(true)}
                onMouseLeave={() => setIsServicesMegaMenuOpen(false)}
              >
                <button className="flex items-center font-newsLetter text-[13px] macbook:text-[18px]">
                  <Link href="">خدمات</Link>
                  {isServicesMegaMenuOpen ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {isServicesMegaMenuOpen && services.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {services.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                          onClick={() => router.push(property.link)}
                        >
                          <div className="relative">
                            <Image
                              src={property.image}
                              alt={property.title}
                              width={300}
                              height={144}
                              className="w-[300px] h-36 macbook:h-44 object-cover"
                            />
                          </div>
                          <div className="p-2 bg-gray-100 text-center">
                            <h3 className="text-xs text-black font-semibold">
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setIsOffMegaMenuOpen(true)}
                onMouseLeave={() => setIsOffMegaMenuOpen(false)}
              >
                <button className="flex items-center font-newsLetter text-[13px] macbook:text-[18px]">
                  <Link href="/off-plan/">خارج المخطط</Link>
                  {isOffMegaMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {isOffMegaMenuOpen && offplanservices.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {offplanservices.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                          onClick={() => router.push(property.link)}
                        >
                          <div className="relative">
                            <Image
                              src={property.image}
                              alt={property.title}
                              width={300}
                              height={144}
                              className="w-[300px] h-36 macbook:h-44 object-cover"
                            />
                          </div>
                          <div className="p-2 bg-gray-100 text-center">
                            <h3 className="text-xs text-black font-semibold">
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setIsLatestMegaMenuOpen(true)}
                onMouseLeave={() => setIsLatestMegaMenuOpen(false)}
              >
                <button className="flex text-[13px] items-center font-newsLetter macbook:text-[18px]">
                  <Link href="/off-plan/">أحدث المشاريع</Link>
                  {isLatestMegaMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {isLatestMegaMenuOpen && offPlan.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="px-6 pb-2 text-black bg-white font-semibold rounded-t-xl mt2">
                      أحدث مشاريع الإنشاءات على الخريطة
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {offPlan.slice(-8).map((property, index) => {
                        let mainImage;
                        try {
                          mainImage = JSON.parse(
                            property.meadias?.[0]?.main_image
                          )?.[0];
                        } catch {
                          mainImage = Image_NotFound;
                        }
                        const imageUrl = mainImage
                          ? `${Image_URL}/${mainImage}`
                          : Image_NotFound;

                        return (
                          <div
                            key={index}
                            className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                            onClick={() =>
                              router.push(`/property/${property.slug}`)
                            }
                          >
                            <div className="relative">
                              <Image
                                src={imageUrl}
                                alt={property.property_name || "Property Image"}
                                width={300}
                                height={144}
                                className="w-[300px] h-36 macbook:h-44 object-cover"
                              />
                              <p className="absolute top-0 left-0 bg-black bg-opacity-70 text-white text-[8px] px-2 py-1 font-bold rounded-br-xl">
                                Starting Price: {property?.starting_price}
                              </p>
                            </div>
                            <div className="p-2 bg-gray-100">
                              <h3 className="text-xs font-semibold text-black">
                                {property?.property_name}
                              </h3>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setIsAreaMegaMenuOpen(true)}
                onMouseLeave={() => setIsAreaMegaMenuOpen(false)}
              >
                <button className="flex items-center font-newsLetter text-[13px] macbook:text-[18px]">
                  <Link href="/areas/">المناطق</Link>
                  {isAreaMegaMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {isAreaMegaMenuOpen && areas.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {areas.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                          onClick={() => router.push(property.link)}
                        >
                          <div className="relative">
                            <Image
                              src={property.image}
                              alt={property.title}
                              width={300}
                              height={144}
                              className="w-[300px] h-36 macbook:h-44 object-cover"
                            />
                          </div>
                          <div className="p-2 bg-gray-100 text-center">
                            <h3 className="text-xs text-black font-semibold">
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li
                onMouseEnter={() => setIsCommunityMegaMenuOpen(true)}
                onMouseLeave={() => setIsCommunityMegaMenuOpen(false)}
              >
                <button className="flex items-center font-newsLetter text-[13px] macbook:text-[18px]">
                  <Link href="/communities/">المجتمعات</Link>
                  {isCommunityMegaMenuOpen ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {isCommunityMegaMenuOpen && communities.length > 0 && (
                  <div className="absolute left-10 top-12 py-4 bg-white shadow-lg mt-3 border border-gray-100 rounded-xl flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 overflow-y-auto">
                      {communities.map((property) => (
                        <div
                          key={property.id}
                          className="rounded-xl overflow-hidden text-white cursor-pointer max-w-[300px]"
                          onClick={() => router.push(property.link)}
                        >
                          <div className="relative">
                            <Image
                              src={property.image}
                              alt={property.title}
                              width={300}
                              height={144}
                              className="w-[300px] h-36 macbook:h-44 object-cover"
                            />
                          </div>
                          <div className="p-2 bg-gray-100 text-center">
                            <h3 className="text-xs text-black font-semibold">
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <Link href="/my-blogs" passHref>
                <li className="macbook:text-[18px] text-[14px] font-newsLetter ">
                  مدونات
                </li>
              </Link>
              <Link href="/contact/" passHref>
                <li className="macbook:text-[18px] text-[14px] font-newsLetter ">
                  اتصال
                </li>
              </Link>

              {/* About Us Dropdown */}
              <li className="relative group">
                <Link href="/about-us/" passHref>
                  <button className="flex items-center text-[14px] font-newsLetter macbook:text-[18px]">
                    معلومات عنا
                    <FaChevronDown className="ml-1 mt1" size={12} />
                  </button>
                </Link>
                <div className="absolute top-3 left-0 hidden group-hover:flex flex-col bg-white text-gray-800 w-[180px] mt-2 shadow-lg rounded">
                  <Link
                    href="/our-team/"
                    className="px-4 py-2 font-newsLetter hover:bg-gray-100"
                  >
                   فريقنا
                  </Link>
                  <Link
                    href="/career/"
                    className="px-4 py-2 font-newsLetter hover:bg-gray-100"
                  >
                    حياة مهنية
                  </Link>
                  <Link
                    href="/videos/"
                    className="px-4 py-2 font-newsLetter hover:bg-gray-100"
                  >
                    فيديوهات الملكية
                  </Link>
                  <Link
                    href="/privacy-policy/"
                    className="px-4 py-2 font-newsLetter hover:bg-gray-100"
                  >
                    سياسة الخصوصية
                  </Link>
                  <Link
                    href="/faqs/"
                    className="px-4 py-2 font-newsLetter hover:bg-gray-100"
                  >
                    الأسئلة الشائعة
                  </Link>
                </div>
              </li>

              <div className="flex gap-[5px] items-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[35px] h-[39px] bg-gray-500 flex justify-center items-center"
                >
                  <FiSearch className="text-white" size={15} />
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="relative">
                    <input
                      className="bg-transparent border-2 border-gray-500 px-3 p-2 outline-none w-[200px] h-[39px]"
                      type="text"
                      placeholder="ابحث عن عقار"
                      name="PropertyName"
                      value={HomeFilters.PropertyName}
                      onChange={handleInputChange}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="absolute top-[70%] md:top-10 w-full z-20 max-h-40 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded-md">
                        {suggestions.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => {
                              setHomeFilters((prev) => ({
                                ...prev,
                                PropertyName: item.title,
                              }));
                              setShowSuggestions(false);
                              if (item.type === "readyProperty") {
                                router.push(`/ready-property/${item?.slug}`);
                              } else if (item.type === "offPlan") {
                                router.push(`/property/${item?.slug}`);
                              }
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-black text-sm"
                          >
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </form>
              </div>
            </ul>
          </div>

          <div
            className="lg:hidden text-white cursor-pointer right-[35px] absolute top-[14px]"
            onClick={toggleShowNavbar}
          >
            <RxHamburgerMenu size={24} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-transform transform ${
            showNav ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={() => setShowNav(false)}
        >
          <div
            className="w-2/3 relative z-30 bg-white h-full p-4 ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="text-black" onClick={() => setShowNav(false)}>
              <IoClose size={24} />
            </button>
            <ul className="space-y-4 mt-8 flex flex-col gap-2 text-black">
              <Link href="/" onClick={() => setShowNav(false)} passHref>
                <li className="py-1 border-b border-gray-500 font-newsLetter">
                  بيت
                </li>
              </Link>
              <Link
                href="/off-plan"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">عقارات خارج الخطة</li>
              </Link>
              <li className="font-newsLetter border-b border-gray-500">
                <button
                  onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}
                  className="flex items-center justify-between w-full"
                >
                  يشتري
                  {buyDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {buyDropdownOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {buy.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={service.link}
                          onClick={() => {
                            setShowNav(false);
                            setBuyDropdownOpen(false);
                          }}
                          className="text-sm text-black hover:text-primary"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="font-newsLetter border-b border-gray-500">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center justify-between w-full"
                >
                  خدمات
                  {servicesDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                {servicesDropdownOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={service.link}
                          onClick={() => {
                            setShowNav(false);
                            setServicesDropdownOpen(false);
                          }}
                          className="text-sm text-black hover:text-primary"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <Link
                href="/areas/"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">المناطق</li>
              </Link>
              <Link
                href="/communities/"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">المجتمعات</li>
              </Link>
              <Link
                href="/blogs"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">مدونات</li>
              </Link>
              <Link
                href="/contact/"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">اتصل بنا</li>
              </Link>
              <Link
                href="/about-us/"
                onClick={() => setShowNav(false)}
                className="py-1 border-b border-gray-500"
                passHref
              >
                <li className="font-newsLetter">معلومات عنا</li>
              </Link>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

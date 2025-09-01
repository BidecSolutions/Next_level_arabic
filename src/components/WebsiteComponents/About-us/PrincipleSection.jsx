import React from "react";

const PrincipleSection = () => {
  const principle = [
    {
      title: "مهمتنا",
      desc: "مهمتنا في شركة نيكست ليفل للعقارات في دبي هي الارتقاء بتجربة عقاركم، من خلال دمج الخبرة المحلية مع المعايير العالمية. نلتزم بالشفافية في التعاملات والحلول المبتكرة.",
      icon: "/about/mission.png",
    },
    {
      title: "رؤيتنا",
      desc: "رؤيتنا هي إعادة تعريف آفاق قطاع العقارات في دبي، ووضع معايير جديدة للثقة والابتكار والتميز. في نيكست ليفل للعقارات.",
      icon: "/about/vision.png",
    },
    {
      title: "قيم",
      desc: "الخبرة المحلية، والنظرة العالمية \n نهج يركز على العميل \n تجربة مخصصة \n قيادة السوق \n العلاقات الدائمة \n التزام الاستدامة",
      icon: "/about/icon1.png",
    },
  ];
  return (
    <div className=" py-10 md:py-24 w-full">
      <h3 className="text-[17px] font-newsLetter md:text-[34px] font-semibold text-[#8F8F8F] mb-8 text-center">
        هدفنا ومبادئنا
      </h3>
      <div className=" flex flex-wrap md:flex-nowrap justify-center  gap-[8px] md:gap-[20px] ">
        {principle.map((item, index) => (
          <div
            key={index}
            className={` border border-[#8F8F8F]   md:pl-8 h-[255px] mb-4 md:h-[330px] w-[155px] md:w-[320px] flex flex-col gap-[5px] md:gap-[10px] md:pt-0 md:items-start  items-center justify-center ${
              index === 0
                ? "rounded-tl-[90px] "
                : index === 1
                ? " rounded-tr-[90px]   md:rounded-tr-[0px] "
                : index === principle.length - 1
                ? "md:rounded-tr-[90px]  md:rounded-br-[0px] md:rounded-bl-[0px] rounded-br-[42px] rounded-bl-[42px] w-[200px]   "
                : ""
            }
            
            `}
          >
            <div
              className={`   h-[44px] w-[54px] flex items-center  justify-center ${
                index === 0
                  ? "rounded-tl-[90px]"
                  : index === principle.length - 1
                  ? "rounded-br-[90px]   "
                  : ""
              }`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="mt-4 font-montserrat text-lg text-center font-medium text-[#8F8F8F] ">
              {item.title}
            </h3>
            <p className="text-[#8F8F8F] font-montserrat  md:text-start text-center text-[9px] md:text-[13px] mx2 ">
              {item.desc.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipleSection;
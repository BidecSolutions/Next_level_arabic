// import React from "react";
// import { GoSearch } from "react-icons/go";

// export const Banner = () => {
//   return (
//     <div className="flex justify-center text-white">
//       <div
//         className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
//         style={{
//           backgroundImage: "url('/Areas/banner.png')",
//         }}
//       >
//         <h1 className="text-2xl md:text-5xl  uppercase mb-2  ">
//           Career opportunity
//         </h1>
//         <p className="text-lg md:text-xl  md:text-[30px]  font-newsLetter ">
//           Home \ Career opportunity
//         </p>
//       </div>
//     </div>
//   );
// };import React from "react";

export const Banner = ({ heading, breadcrumb }) => {
  return (
    <div className="flex justify-center text-white">
      <div
        className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px] md:rounded-bl-[90px] md:rounded-br-[90px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Areas/banner.png')",
        }}
      >
        <h1 className="text-2xl md:text-5xl uppercase mb-2">
          {heading}
        </h1>
        <p className="text-lg md:text-xl md:text-[30px] font-newsLetter">
          {breadcrumb}
        </p>
      </div>
    </div>
  );
};

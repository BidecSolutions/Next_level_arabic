"use client";

import { useState } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import ParseBody from "../HomeComponents/ParseBody";
// import ParseBody from "../PropertyDetails/ParseBody";

const Masterplan = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setZoomLevel(1);
  };

  const closeModal = () => setModalImage(null);

  const zoomIn = () => setZoomLevel((prev) => prev + 0.1);
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 1));

  const description =
    data?.master_plan_description ||
    "ar Properties is founded by Mohamed Alabbar - a UAE-based leading developer in 1997...";

  return (
    // <div className="flex justify-center md:flex-row flex-col-reverse w-[100%] py-10 md:py-24">
    //   <div className=" w-full md:w-[85%] flex md:flex-row flex-col-reverse md:justify-center gap-10">
    //     {/* Description Section */}
    //     <div className=" md:w-[50%] flex flex-col items-center md:items-start my-4">
    //       <div>
    //         <div
    //           className={`text-[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text-[35px] macbook:leading-[38px] text-center md:text-start ${
    //             isExpanded
    //               ? "h-[140px] md:h-[240px] macbook:h-[300px] overflow-y-auto"
    //               : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
    //           } transition-all duration-300`}
    //         >
    //           <ParseBody body={description} />
    //         </div>

    //         {description.length > 600 && (
    //           <p
    //             onClick={() => setIsExpanded(!isExpanded)}
    //             className="text-gray-500 mt-2 underline text-center md:text-start cursor-pointer text-[14px]"
    //           >
    //             {isExpanded ? "Show Less" : "Show More"}
    //           </p>
    //         )}
    //       </div>
    //     </div>

    //     {/* Image Section */}
    //     <div className="flex w-[100%] md:w-[40%] justify-center">
    //       <img
    //         src={`${Image_URL}${data?.master_plan_image_path}`}
    //         alt="master plan"
    //         className="h-[300px] w-[250px] md:w-full md:h-[500px] object-cover macbook:w-[750px] macbook:h-[750px] rounded-tr-[80px] md:rounded-tr-[180px] cursor-pointer"
    //         onClick={() =>
    //           openModal(`${Image_URL}${data?.master_plan_image_path}`)
    //         }
    //       />
    //     </div>
    //   </div>

    //   {/* Modal */}
    //   {modalImage && (
    //     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    //       <div className="relative">
    //         <img
    //           src={modalImage}
    //           alt="Zoomed"
    //           style={{ transform: `scale(${zoomLevel})` }}
    //           className="max-w-[90vw] max-h-[90vh] transition-transform duration-300"
    //         />
    //         <button
    //           onClick={closeModal}
    //           className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
    //         >
    //           ✖
    //         </button>
    //         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
    //           <button
    //             onClick={zoomOut}
    //             className="text-white bg-black bg-opacity-50 rounded-full p-2"
    //           >
    //             ➖
    //           </button>
    //           <button
    //             onClick={zoomIn}
    //             className="text-white bg-black bg-opacity-50 rounded-full p-2"
    //           >
    //             ➕
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
       <div className="flex justify-center md:flex-row flex-col-reverse w-[100%] py-10 md:py-24  ">
      <div className=" w-full md:w-[85%]   flex  md:flex-row flex-col-reverse md:justify-center gap-10">
        <div className=" md:w-[50%] macbook:w-[30%] gap-[15px] flex flex-col md:justify-center items-center md:items-start macbook:gap[30px]   my-4">
          <div className=" ">
            <div
              className={`text[16px] font-montserrat text-[#555555] md:leading-[23px] macbook:text[35px] macbook:leading-[38px] text-center md:text-start ${
                isExpanded
                  ? "h-[140px] md:h-[240px] macbook:h-[300px]  overflow-y-auto transition-all duration-300"
                  : "h-[140px] md:h-[240px] macbook:h-[300px] overflow-hidden"
              } transition-all duration-300`}
              // dangerouslySetInnerHTML={{
              //   __html: description
              //     ? description
              //     : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu vehicula magna. Suspendisse potenti. In sit amet lectus leo. Morbi lobortis lobortis aliquet. Phasellus nisl risus, scelerisque finibus dui viverra,",
              // }}
            >
              <ParseBody body={description} />
          </div>

            {description.length > 600 && (
              <p
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 mt-2 underline  text-center md:text-start cursor-pointer text-[14px]"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-[100%] md:w-[40%]  macbook:w-[40%] justify-center ">
          <img
            src={`${Image_URL}${data?.master_plan_image_path}`}
            alt=""
            className="h-[300px] w-[250px] md:w-full md:h-[500px] object-cover  macbook:w-[750px] macbook:h-[750px] rounded-tr-[80px]  md:rounded-tr-[180px] cursor-pointer"
            onClick={() => openModal(`${Image_URL}/${data?.master_plan_image_path}`)}
          />
        </div>
      </div>
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={modalImage}
              alt="Zoomed"
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-w-[90vw] max-h-[90vh] transition-transform duration-300"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              ✖
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={zoomOut}
                className="text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                ➖
              </button>
              <button
                onClick={zoomIn}
                className="text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Masterplan;

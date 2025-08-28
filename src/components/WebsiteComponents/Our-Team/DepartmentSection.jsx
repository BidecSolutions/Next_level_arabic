"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { getAgentsDepartmentWise } from "@/lib/api/agent.server";
import { Image_NotFound, Image_URL } from "@/config/constants";
import { Loader } from "../Loader";
import Link from "next/link";

const DepartmentSection = ({ searchTerm }) => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const router = useRouter();

  if (isLoading) return <Loader />;

  const allAgents = departments?.flatMap((dept) => dept.agents);
  const allFilteredAgents = allAgents?.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAgentsDepartmentWise();
        setDepartments(data || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="flex flex-col py-16 md:py-12">
      {searchTerm.trim() !== "" && allFilteredAgents.length === 0 ? (
        <div className="w-full text-center min-h-52 text-[#8F8F8F] text-[24px] mt-28">
          No agents were found matching the name{" "}
          <span className="font-semibold md:ml-2">{searchTerm}</span>
        </div>
      ) : (
        [
          ...departments?.filter((d) => d.name !== "Technical Department"),
          ...departments?.filter((d) => d.name === "Technical Department"),
        ].map((dept, index) => {
          const filteredAgents =
            searchTerm.trim() === ""
              ? dept.agents
              : dept.agents?.filter((agent) =>
                  agent.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

          if (filteredAgents.length === 0) return null;

          return (
            <div key={index} className="mb-12">
              <h2 className="text-[25px] md:text-[48px] font-newsLetter text-[#8F8F8F] text-center mb-8">
                {dept.name}
              </h2>

              <div className="flex flex-wrap justify-center gap-[20px] md:gap-[40px] md:gap-y-[80px]">
                {filteredAgents?.slice(0, visibleCount).map((agent) => (
                  <div
                    key={agent.id}
                    className="flex relative h-[700px] flex-col md:flex-row w-[95%] md:w-[45%] md:h-[380px] rounded-lg overflow-hidden"
                  >
                    <img
                      src={`${Image_URL}${agent.profile_image}`}
                      alt={agent.profile_image_alt || "Agent"}
                      className="md:w-[45%] rounded-[10px] object-cover"
                      onError={(e) => {
                        e.currentTarget.src = Image_NotFound;
                      }}
                    />
                    <div className="flex justify-center w-[100%] md:w-[55%] h-[100%] items-center pt-[1.4rem]">
                      <div className="absolute h-[310px] font-montserrat bottom-[60px] z-10 md:static w-[90%] text-center md:text-start justify-center flex flex-col items-center md:items-start md:w-[100%] pl-[20px] pt-[20px] p-4 md:p-8 rounded-[10px] md:rounded-[0px] md:rounded-br-[10px] md:rounded-tr-[10px] md:h-[90%] bg-[#8F8F8F]">
                        <p className="text-[22px] md:mb-2 md:text-[20px] text-white">
                          {agent?.name || "Agent Name"}
                        </p>
                        <p className="text-white mb-2 font-thin font-montserrat">
                          {dept.name || "Employee"}
                        </p>
                        <div
                          className="text-white text-[10px] md:text-[12px] mb-2 w-[90%]"
                          dangerouslySetInnerHTML={{
                            __html: agent.description?.substring(0, 100),
                          }}
                        />
                        <div className="flex flex-col gap-[10px]">
                          <div className="text-white flex gap-[10px] items-center">
                            <FaEnvelope className="text-white text-[22px] macbook:text-[25px]" />
                            <a
                              href={`mailto:${agent.email}`}
                              className="text-[12px] macbook:text-[21px] text-wrap hover:underline"
                            >
                              {agent.email}
                            </a>
                          </div>
                          <div className="text-white flex gap-[10px] text-center justify-center md:justify-start items-center">
                            <PiPhoneCallFill className="text-white text-[22px] macbook:text-[25px]" />
                            <a
                              href={`tel:${agent.phone_no.replace(/[\s()-]/g, "")}`}
                              className="text-[12px] text-center macbook:text-[21px] hover:underline"
                            >
                              {agent.phone_no}
                            </a>
                          </div>
                        </div>
                        <div className="flex font-montserrat gap-2 mt-4">
                          <Link
                            href={`/agent/${agent.slug}`}
                            className="px-4 py-2 md:py-4 text-[11px] bg-white text-[#8F8F8F] rounded-md"
                          >
                            View Agent
                          </Link>
                          <a
                            href={`https://wa.me/${(agent.whatsapp_no || "+971552588870").replace(/[\s-]+/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2 py-2 border border-white rounded-md"
                          >
                            <FaWhatsapp className="text-white text-[24px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < filteredAgents.length && (
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={loadMore}
                    className="mt-8 py-2 px-4 border-2 border-[#8F8F8F] bg-[#8F8F8F] text-white rounded hover:text-[#8F8F8F] hover:bg-transparent text-center"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default DepartmentSection;

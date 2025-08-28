
import { fetchCareerOpportunities, submitCareerApplication } from "@/lib/api/career.server";
import { useState, useRef, useEffect } from "react";
import { Link, Element } from "react-scroll";
import { FaPlay } from "react-icons/fa6";
// import axios from "../../../Utils/axios";

const JobSection = () => {
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedJobId, setSelectedJobId] = useState("");
    const [error, setError] = useState("");
    const careerSectionRef = useRef(null);
    const [jobs, setJobs] = useState([]);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State for pop-up visibility
    const [isPopUpErrorVisible, setIsPopUpErrorVisible] = useState(false); // State for pop-up visibility

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const messageRef = useRef(null);
    const fileRef = useRef(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.public.get("user/career-opportunities");
    //             const filteredProperties = response.data.data.filter(
    //                 (property) => property.status === 1
    //             );

    //             setJobs(filteredProperties);
    //         } catch (error) {
    //             console.error("Error fetching Jobs:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobList = await fetchCareerOpportunities();
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching Jobs:", error);
      }
    };
    loadJobs();
  }, []);
    const validateInput = (field, value) => {
        let errorMessage = "";
        if (!value.trim()) {
            errorMessage = "This field is required.";
        } else if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
            errorMessage = "Enter a valid email address.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    };

    const handleJobClick = (jobTitle, jobId) => {
        setSelectedJob(jobTitle);
        setSelectedJobId(jobId);
    };

    const clearSelectedJob = () => {
        setSelectedJob("");
        setSelectedJobId("");
    };

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     const name = nameRef.current.value;
    //     const email = emailRef.current.value;
    //     const phone = phoneRef.current.value;
    //     const message = messageRef.current.value;
    //     const resume = fileRef.current.files[0];

    //     // Validate form fields
    //     if (Object.values(errors).some((error) => error)) return;

    //     if (!resume || resume.type !== "application/pdf") {
    //         setError("Please upload a valid PDF file.");
    //         setIsPopUpErrorVisible(true);

    //         setTimeout(() => setIsPopUpVisible(false), 3000);
    //         return;
    //     }

    //     if (selectedJobId == "") {
    //         setError("Please select the Position.");
    //         setIsPopUpErrorVisible(true);
    //         // Scroll to the career section
    //         careerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    //         setTimeout(() => setIsPopUpVisible(false), 3000);
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("career_opportunity_id", selectedJobId);
    //     formData.append("name", name);
    //     formData.append("email", email);
    //     formData.append("phone_no", phone);
    //     formData.append("subject", name);
    //     formData.append("message", message);
    //     formData.append("resume", resume);

    //     try {
    //         const response = await axios.public.post(
    //             "user/applied-career-opportunity/store",
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             }
    //         );
    //         // console.log("Form submitted successfully:", response.data);
    //         if (response.data.success == false) {
    //             setError("Please Try Again");
    //             setIsPopUpErrorVisible(true);
    //             setTimeout(() => setIsPopUpVisible(false), 3000);
    //         } else {
    //             // Clear the form
    //             nameRef.current.value = "";
    //             emailRef.current.value = "";
    //             phoneRef.current.value = "";
    //             messageRef.current.value = "";
    //             fileRef.current.value = "";

    //             // Show the success pop-up
    //             setIsPopUpVisible(true);
    //             setTimeout(() => setIsPopUpVisible(false), 3000); // Auto-hide pop-up after 3 seconds
    //         }
    //     } catch (error) {
    //         console.error("Error submitting the form:", error);
    //     }
    // };
const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const message = messageRef.current.value;
    const resume = fileRef.current.files[0];

    if (Object.values(errors).some((error) => error)) return;

    if (!resume || resume.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      setIsPopUpErrorVisible(true);
      setTimeout(() => setIsPopUpErrorVisible(false), 3000);
      return;
    }

    if (!selectedJobId) {
      setError("Please select the Position.");
      setIsPopUpErrorVisible(true);
      careerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsPopUpErrorVisible(false), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("career_opportunity_id", selectedJobId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_no", phone);
    formData.append("subject", name);
    formData.append("message", message);
    formData.append("resume", resume);

    try {
      const response = await submitCareerApplication(formData);

      if (!response.success) {
        setError("Please Try Again");
        setIsPopUpErrorVisible(true);
        setTimeout(() => setIsPopUpErrorVisible(false), 3000);
      } else {
        nameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
        messageRef.current.value = "";
        fileRef.current.value = "";

        setIsPopUpVisible(true);
        setTimeout(() => setIsPopUpVisible(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
    return (
        <div ref={careerSectionRef} className="py-16 px-4">
            {/* Job Opportunities Section */}
            <div className="flex flex-col items-center bg-[#EFEFEF] w-[100%] p-4 pt-8 mb-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-[#6B6B6B]">
                        EXPLORE EXCITING CAREER <br /> OPPORTUNITIES
                    </h2>
                </div>
                <div className="flex flex-wrap gap-[20px] macbook:w-[70%] justify-center mb-16">
                    {jobs.map((job, index) => (
                        <Link
                            key={index}
                            to="applyForm"
                            smooth={true}
                            duration={500}
                            onClick={() => handleJobClick(job.title, job.id)}
                        >
                            <div className="border bg-white border-[#8F8F8F] p-4 flex justify-between w-[320px] md:w-[500px] items-center cursor-pointer hover:shadow-lg">
                                <div>
                                    <h3 className="text-[16px] md:text-[20px] text-[#8F8F8F] font-semibold">
                                        {job.title}
                                    </h3>
                                    <p
                                        className="text-[13px] text-[#8F8F8F]"
                                        dangerouslySetInnerHTML={{
                                            __html: job.description.substring(0, 50),
                                        }}
                                    ></p>
                                </div>
                                <span className="text-xl text-[#8F8F8F]">
                                    <FaPlay />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Application Form Section */}
            <Element name="applyForm">
                <div className="flex flex-col items-center w-[100%]">
                    <div className="text-center mb-8">
                        <h3 className="text-[#555555] text-[18px]">Apply For Job</h3>
                        <h2 className="text-[35px] font-semibold text-[#8F8F8F]">
                            APPLY FOR CAREER
                        </h2>
                    </div>
                    <form
                        onSubmit={handleFormSubmit}
                        className="w-[90%] macbook:w-[30%]  md:w-[50%] space-y-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    placeholder="Your Name"
                                    className="border py-[12px] font-montserrat outline-none border-[#0B0B0B] pl-[20px] rounded-[8px] p-2 w-full"
                                    onChange={(e) => validateInput("name", e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 font-montserrat  text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    ref={emailRef}
                                    placeholder="Email Address"
                                    className="border py-[12px] font-montserrat outline-none border-[#0B0B0B] pl-[20px] rounded-[8px] p-2 w-full"
                                    onChange={(e) => validateInput("email", e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 font-montserrat text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="tel"
                                    maxLength="15"
                                    ref={phoneRef}
                                    placeholder="Phone"
                                    className="border py-[12px] font-montserrat outline-none border-[#0B0B0B] pl-[20px] rounded-[8px] p-2 w-full"
                                    onChange={(e) => validateInput("phone", e.target.value)}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 font-montserrat text-sm mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Position"
                                    className="border py-[12px] font-montserrat outline-none border-[#0B0B0B] pl-[20px] rounded-[8px] p-2 w-full pr-10"
                                    value={selectedJob}
                                    onChange={(e) => setSelectedJob(e.target.value)}
                                    disabled
                                />
                                {selectedJob && (
                                    <button
                                        type="button"
                                        onClick={clearSelectedJob}
                                        className="absolute right-[5%] top-[10%] text-[#8F8F8F] text-2xl text-bold"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-gray-700">Upload CV</span>
                                <input
                                    type="file"
                                    ref={fileRef}
                                    className="mt-1 rounded-[8px] block w-full text-sm text-[#8F8F8F] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                            </label>
                        </div>
                        <textarea
                            ref={messageRef}
                            placeholder="Message"
                            className="border font-montserrat outline-none resize-none py-[12px] pl-[20px] border-[#0B0B0B] rounded-[8px] p-2 w-full"
                            onChange={(e) => validateInput("message", e.target.value)}
                            required
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-500 font-montserrat text-sm mt-1">
                                {errors.message}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="bg-[#8F8F8F] text-white mx-auto   py-2 px-6 rounded  "
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Element>

            {/* Success Pop-up */}
            {isPopUpVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-fade-in">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Application Submitted Successfully!
                        </h3>
                        <p className="text-gray-600     ">
                            Thank you for applying. We'll get back to you soon.
                        </p>
                        <button
                            className="mt-6 px-6 py-2 bg-[#A39D9D] text-white rounded-full   transition duration-300"
                            onClick={() => setIsPopUpVisible(false)} // Replace with desired functionality
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Failed Pop-up */}
            {isPopUpErrorVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-fade-in w-96">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Submission Failed
                        </h3>
                        <p className="text-gray-600">{error}</p>
                        <button
                            className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-300"
                            onClick={() => setIsPopUpErrorVisible(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSection;
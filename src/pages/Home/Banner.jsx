import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import team1 from "../../assets/team/team1.jpg";
import team2 from "../../assets/team/team2.jpg";
import { FaBriefcase, FaMapMarkerAlt, FaTh } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Banner = () => {

  const [keyword, setKeyword] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Select Industry");
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const industryRef = useRef();
  const locationRef = useRef();

  //50 industry names not country names
  const industryOptions = [
    "Developer",
    "Designer",
    "Marketing",
    "Sales",
    "Finance",
    "HR",
    "IT",
    "Engineering",
    "Healthcare",
    "Education",
    "Hospitality",
    "Retail",
    "Construction",
    "Real Estate",
    "Legal",
    "Manufacturing",
    "Transportation",
    "Telecommunications",
    "Media",
    "Entertainment",
  ];
  //50 country names
  const locationOptions = [
    "Remote",
    "Bangladesh",
    "India",
    "USA",
    "UK",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Finland",
    "Denmark",
    "Belgium",
    "Switzerland",
    "Austria",
    "Ireland",
  ];

  // ✅ Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (industryRef.current && !industryRef.current.contains(event.target)) {
        setIndustryOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between">
        <div className="flex-1">
          <motion.img
            animate={{ y: [0, 50, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            }}
            src={team1}
            alt="team1"
            className="-mx-10 max-w-sm w-72 rounded-t-[40px] rounded-br-[40px] shadow-2xl border-l-8 border-b-8 border-primary"
          />
          <motion.img
            animate={{ x: [80, 130, 80] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            }}
            src={team2}
            alt="team2"
            className=" max-w-sm w-72 rounded-t-[40px] rounded-br-[40px] shadow-2xl border-l-8 border-b-8 border-primary"
          />
        </div>
        <div className="flex-1 space-y-4 px-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", repeatType: "reverse" }}
            className="text-5xl font-bold  "
          >
            The{" "}
            <motion.span
              animate={{ color: ["#337aff", "#f84c4c", "#4400c4"] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className=""
            >
              Easiest Way
            </motion.span>{" "}
            <br />
            to Get Your New Job
          </motion.h1>

          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="py-6"
          >
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </motion.p>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            repeat={Infinity}
          >
            <div className="w-full px-4 flex flex-col items-center space-y-6">
              {/* Search box container */}
              <div className="flex flex-col md:flex-row gap-6 mt-8 flex-wrap justify-center">
                {/* Keyword input */}
                <div className="w-60">
                  <input
                    type="text"
                    placeholder="Your keyword"
                    className="input input-bordered w-full"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                {/* Industry Dropdown */}
                <div className="relative w-60" ref={industryRef}>
                  <button
                    onClick={() => setIndustryOpen(!industryOpen)}
                    className="flex items-center justify-between w-full bg-base-100 px-4 py-3 rounded shadow border"
                  >
                    <span className="flex items-center gap-2 text-gray-600 font-medium">
                      <FaBriefcase className="text-lg" />
                      {selectedIndustry}
                    </span>
                    <IoIosArrowDown />
                  </button>

                  {industryOpen && (
                    <ul className="absolute z-10 mt-2 w-full rounded shadow bg-base-100 border max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-200">
                      {industryOptions.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setSelectedIndustry(item);
                              setIndustryOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-base-200"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="relative w-60" ref={locationRef}>
                  <button
                    onClick={() => setLocationOpen(!locationOpen)}
                    className="flex items-center justify-between w-full bg-base-100 px-4 py-3 rounded shadow border"
                  >
                    <span className="flex items-center gap-2 text-gray-600 font-medium">
                      <FaMapMarkerAlt className="text-lg" />
                      {selectedLocation}
                    </span>
                    <IoIosArrowDown />
                  </button>

                  {locationOpen && (
                    <ul className="absolute z-10 mt-2 w-full rounded shadow bg-base-100 border max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-200">
                      {locationOptions.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setSelectedLocation(item);
                              setLocationOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-base-200"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Search Button */}
                <div className="w-60">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() =>
                      console.log("Search clicked:", {
                        keyword,
                        selectedIndustry,
                        selectedLocation,
                      })
                    }
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Popular searches */}
              <div className="text-gray-700 font-semibold">
                Popular Searches:{" "}
                <span className="font-normal underline text-gray-600">
                  Designer, Web, IOS, Developer, PHP, Senior, Engineer
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

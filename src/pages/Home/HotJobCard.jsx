import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HotJobCard = ({ hotJob }) => {
  const {
    title,
    location,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    company_logo,
  } = hotJob; // Destructure hotJob object

  const { min, max } = salaryRange; // Destructure salaryRange object

  return (
    <div className="card bg-[#f7f9fe] hover:bg-white transition-all duration-300 shadow-md border border-gray-200 hover:-translate-y-1">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded">
                <img src={company_logo} alt="LinkedIn logo" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{company}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>

                {location}
              </p>
            </div>
          </div>
          <div className="text-green-500 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9v8l10-12h-9z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-bold mt-4">
          {title}
          <div className="badge badge-secondary ms-2">NEW</div>
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
              />
            </svg>
            Fulltime
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            4 minutes ago
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {requirements.map((requirement, index) => (
            <small
              key={index}
              className="bg-[#ebf0fe] border rounded-md text-center px-2 py-1 text-gray-500 hover:text-blue-500 border-gray-300"
            >
              {requirement}
            </small>
          ))}
        </div>
        <small className="text-red-600">Deadline:{applicationDeadline}</small>
        <div className="flex items-center justify-between mt-2">
          <p className="text-base font-normal text-gray-500 flex items-center">
            <FaBangladeshiTakaSign />
            {min}-{max}
          </p>
          <Link to="/job-details">
          <button className="btn btn-sm btn-primary opacity-70">
            Apply Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobCard;

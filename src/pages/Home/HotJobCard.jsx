import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const HotJobCard = ({ hotJob }) => {
  const {
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    responsibilities,
    status,
    hr_email,
    hr_name,
    company_logo,
  } = hotJob; // Destructure hotJob object

  const { min, max } = salaryRange; // Destructure salaryRange object

  return (
    <div class="card bg-[#f7f9fe] hover:bg-white transition-all duration-300 shadow-md border border-gray-200 hover:-translate-y-1">
      <div class="card-body">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="w-12 rounded">
                <img src={company_logo} alt="LinkedIn logo" />
              </div>
            </div>
            <div>
              <h2 class="font-semibold text-lg">{company}</h2>
              <p class="text-sm text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>

                {location}
              </p>
            </div>
          </div>
          <div class="text-green-500 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9v8l10-12h-9z" />
            </svg>
          </div>
        </div>
        <h3 class="text-lg font-bold mt-4">
          {title}
          <div className="badge badge-secondary ms-2">NEW</div>
        </h3>

        <div class="flex items-center text-sm text-gray-500 gap-3 mt-1">
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
              />
            </svg>
            Fulltime
          </div>
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            4 minutes ago
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-2">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <div class="flex flex-wrap gap-2 mt-2">
          {requirements.map((requirement, index) => (
            <small
              key={index}
              class="bg-[#ebf0fe] border rounded-md text-center px-2 py-1 text-gray-500 hover:text-blue-500 border-gray-300"
            >
              {requirement}
            </small>
          ))}
        </div>
        <small className="text-red-600">Deadline:{applicationDeadline}</small>
        <div class="flex items-center justify-between mt-2">
          <p class="text-base font-normal text-gray-500 flex items-center">
            <FaBangladeshiTakaSign />
            {min}-{max}
          </p>
          <button class="btn btn-sm btn-primary opacity-70">Apply Now</button>
        </div>
      </div>
    </div>

    // <div className="card bg-base-200 shadow-sm border-2 border-gray-600 hover:shadow-lg transition duration-3 ease-in-out">
    //   <div className="card-header flex items-center justify-start p-2 border-b">
    //     <figure>
    //       <img
    //         src={company_logo}
    //         alt="Company Logo"
    //         className="h-16 w-16 rounded-full mx-auto mt-4"
    //       />
    //     </figure>
    //     <div>
    //       <h2 className="card-title">{company}</h2>
    //       <p>{location}</p>
    //     </div>
    //   </div>
    //   <div className="mx-4">
    //   <h2 className="card-title">{title}</h2>
    //   <p>{description}</p>
    //   </div>
    //   <div className="card-body">
    //     {/* <p className="card-title text-gray-500">{category}</p> */}

    //     {/* <div className="badge badge-secondary">NEW</div> */}

    //     <div className="card-actions">
    //         {
    //             requirements.map((requirement, index) => (
    //                 <div key={index} className="badge badge-outline">{requirement}</div>
    //             ))
    //         }
    //     </div>
    //   </div>
    // </div>

    //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
    //   {/* Job Card Start */}
    //   <div className="card bg-base-100 shadow-xl border">
    //     <figure className="px-6 pt-6">
    //       <img src={company_logo} alt="Company Logo" className="h-16 w-16" />
    //     </figure>
    //     <div className="card-body items-start text-left">
    //       <h2 className="card-title text-lg font-semibold">{title}</h2>
    //       <p className="text-sm text-gray-500">{company}</p>
    //       <p className="text-sm"><span className="font-medium">Location:</span> {title}</p>
    //       <p className="text-sm"><span className="font-medium">Job Type:</span> {jobType}</p>
    //       <p className="text-sm"><span className="font-medium">Deadline:</span>{applicationDeadline}</p>
    //       <p className="text-sm"><span className="font-medium">Salary:</span>{min}-{max} {currency}</p>
    //       <div className="card-actions mt-4 w-full">
    //         <button className="btn btn-primary btn-block">Apply Now</button>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Job Card End */}

    //   {/* Repeat the above card for more jobs */}
    // </div>
  );
};

export default HotJobCard;

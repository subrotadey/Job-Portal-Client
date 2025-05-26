import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Mail,
  User,
} from "lucide-react";

const JobDetails = () => {
  const {
    _id,
    title,
    location,
    jobTypeTime,
    category,
    applicationDeadline,
    salaryRange: { min, max, currency },
    description,
    company,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
  } = useLoaderData();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <img
          src={company_logo}
          alt="Company Logo"
          className="w-20 h-20 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600">{company}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} /> {location}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Briefcase size={18} /> {jobTypeTime} - {category}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} /> Deadline: {applicationDeadline}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={18} /> {min.toLocaleString()} -{" "}
          {max.toLocaleString()} {currency.toUpperCase()}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <div className="flex flex-wrap gap-2">
          {requirements.map((req, index) => (
            <span
              key={index}
              className="bg-[#ebf0fe] border rounded-md text-center px-2 py-1 text-gray-500 hover:text-blue-500 border-gray-300"
            >
              {req}
            </span>
          ))}
        </div>
      </div>

      {/* HR Contact */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User size={24} />
          <div>
            <p className="font-medium">{hr_name}</p>
            <p className="text-sm text-gray-500">{hr_email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link to={`mailto:${hr_email}`}>
            <button className="btn btn-primary">Apply by Mail</button>
          </Link>
          <Link to={`/jobApply/${_id}`}>
            <button className="btn btn-primary">Apply Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

const AddJob = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const jobData = {
      jobId: id,
      firstName: data["First name"],
      lastName: data["Last name"],
      email: user?.email,
      mobileNumber: data["Mobile number"],
      title: data["Title"],
      status: "applied",
      linkedIn: data.linkedin,
      github: data.github,
      resumeLink: data.resumeLink,
    };
    console.log(jobData);

    //   fetch("http://localhost:5000/job-applications", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(jobData),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success) {
    //         Swal.fire({
    //           title: "Job application submitted successfully!",
    //           icon: "success",
    //         });
    //         navigate("/myApplications");
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Oops...",
    //           text: "Something went wrong!",
    //         });
    //       }
    //     });
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <div className="text-center text-3xl mb-5">As Recruiter Post Job</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label className="label">Name Of the Company</label>
            <input
              type="text"
              placeholder="Name of the company"
              {...register("companyName", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Title */}
          <div>
            <label className="label">Title of The Job</label>
            <input
              type="text"
              placeholder="Title of the job"
              {...register("jobTitle", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              placeholder="Location"
              {...register("jobLocation", { required: true, maxLength: 100 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Job Type */}
          <div>
            <fieldset className=" fieldset">
              <legend className="fieldset-legend label">Job Type Time</legend>
              <select
                defaultValue="Pick a Job Type"
                {...register("jobTypeTime", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled={true}>Pick a Job Type</option>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="Contractual">Contractual</option>
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>
          </div>

          {/* Job Type */}
          <div>
            <fieldset className=" fieldset">
              <legend className="fieldset-legend label">Job Type Place</legend>
              <select
                defaultValue="Select Category"
                {...register("jobTypePlace", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled={true}>Select Category</option>
                <option value="Onsite">Intern</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>
          </div>

          {/* Category  */}
          <div>
            <label className="label">Job Field</label>
            <input
              type="text"
              placeholder="Job Field"
              {...register("jobField", { required: true, maxLength: 100 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Deadline Picker */}
          <div>
            <label className="label">Select a for deadline</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              placeholderText="Select a date"
              dropdownMode="select"
              dateFormat="MM/dd/yyyy"
              {...register("jobDeadline", { required: true, maxLength: 100 })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {/* HR Email Link */}
          <div>
            <label className="label">HR Email</label>
            <input
              type="text"
              placeholder="HR Email"
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* HR Name */}
          <div>
            <label className="label">Name Of Company HR</label>
            <input
              type="text"
              placeholder="Name Of Company HR"
              {...register("companyHR", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="label">Mobile Number</label>
            <input
              type="tel"
              placeholder="Mobile number"
              {...register("Mobile number", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Developer Status */}
          <div>
            <label className="label">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Yes"
                  {...register("Developer", { required: true })}
                  className="radio radio-primary"
                />
                Yes
              </label>
            </div>
          </div>
          {/* Company Logo Link */}
          <div>
            <label className="label">Company Logo link</label>
            <input
              type="url"
              placeholder="https://......."
              {...register("companyLogo", {
                required: "Company Logo Link is required",
                pattern: {
                  message: "Enter a valid URL",
                },
              })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Salary Range */}
        <label className="label underline">Salary Range</label>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
          {/* Minimum Salary */}
          <div>
            <label className="label">Min</label>
            <input
              type="number"
              placeholder="Min Salary"
              {...register("min", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
              className="input input-bordered w-full"
            />
          </div>
          {/* Maximum Salary */}
          <div>
            <label className="label">Max</label>
            <input
              type="number"
              placeholder="Max Salary"
              {...register("max", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Currency */}
          <div>
            <fieldset className=" fieldset">
              <legend className="fieldset-legend label">Currency</legend>
              <select
                defaultValue="Currency"
                {...register("currency", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled={true}>Currency</option>
                <option value="Onsite">BDT</option>
                <option value="Onsite">USD</option>
                <option value="Remote">INR</option>
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <label className="label">Responsibilities</label>
          <textarea
            placeholder="Write each job Responsibilities in new line (max 300 characters)"
            {...register("jobResponsibilities", {
              required: true,
              maxLength: 300,
            })}
            className="textarea textarea-bordered w-full"
            rows={5} // You can adjust the height by changing this
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="label">Requirements</label>
          <textarea
            placeholder="Write each job requirements new line (max 500 characters)"
            {...register("jobRequirements", {
              required: true,
              maxLength: 500,
            })}
            className="textarea textarea-bordered w-full"
            rows={5} // You can adjust the height by changing this
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            placeholder="Enter job description (max 300 characters)"
            {...register("jobDescription", {
              required: true,
              maxLength: 300,
            })}
            className="textarea textarea-bordered w-full"
            rows={5} // You can adjust the height by changing this
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

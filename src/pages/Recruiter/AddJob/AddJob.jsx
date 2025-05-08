import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const AddJob = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const location = useLocation();

  const onSubmit = (data) => {
    const addJobData = {
      ...data,
      // if you want to convert it to "YYYY/MM/DD => 2024-12-31"
      applicationDeadline: data.applicationDeadline.toISOString().split("T")[0],
      applicationDate: data.applicationDate.toISOString().split("T")[0],
      salaryRange: {
        min: data.salaryRange.min,
        max: data.salaryRange.max,
        currency: data.salaryRange.currency,
      },
      requirements: data.requirements.split("\n"),
      responsibilities: data.responsibilities.split("\n"),
      description: data.description.split("\n"),
      hr_email: user?.email,
      hr_name: user?.displayName,
    };
    console.log(addJobData);

    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addJobData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result.acknowledged) {
          Swal.fire({
            title: "Job posted successfully!",
            text: "Your job has been added.",
            icon: "success",
          });
          reset();
          location("/myPostedJobs");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
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
              {...register("company", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Title */}
          <div>
            <label className="label">Title of The Job</label>
            <input
              type="text"
              placeholder="Title of the job"
              {...register("title", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              placeholder="Location"
              {...register("location", { required: true, maxLength: 100 })}
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
                <option value="Intern">Intern</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>
          </div>

          {/* Job Field */}
          <div>
            <label className="label">Job Field</label>
            <input
              type="text"
              placeholder="Job Field"
              {...register("jobField", { required: true, maxLength: 100 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Application Date */}
          <div>
            <label className="label">Application Post Date</label>
            <Controller
              control={control}
              name="applicationDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  className="input input-bordered w-full"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                   placeholderText="Select Today date"
                />
              )}
            />
          </div>

          {/* Deadline Picker */}
          <div>
            <label className="label">Job Deadline</label>
            <Controller
              control={control}
              name="applicationDeadline"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  className="input input-bordered w-full"
                  placeholderText="Select a date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="MM/dd/yyyy"
                />
              )}
            />
          </div>

          {/* HR Email Link */}
          <div>
            <label className="label">HR Email</label>
            <input
              type="text"
              defaultValue={user?.email}
              placeholder="HR Email"
              {...register("hr_email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* HR Name */}
          <div>
            <label className="label">HR Name of the Company</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              placeholder="HR Name Of the Company"
              {...register("hr_name", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Mobile Number */}
          {/* <div>
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
          </div> */}

          {/* Company Logo Link */}
          <div>
            <label className="label">Company Logo link</label>
            <input
              type="url"
              placeholder="https://www..."
              {...register("company_logo", {
                required: "Company Logo Link is required",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Enter a valid URL",
                },
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
                  value="active"
                  {...register("status", { required: true })}
                  className="radio radio-primary"
                />
                active
              </label>
            </div>
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
              {...register("salaryRange.min", {
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
              {...register("salaryRange.max", {
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
                {...register("salaryRange.currency", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled={true}>Currency</option>
                <option value="bdt">BDT</option>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="rs">Rs</option>
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="label">Requirements</label>
          <textarea
            placeholder="Write each job requirements new line (max 500 characters)"
            {...register("requirements", {
              required: true,
              maxLength: 500,
            })}
            className="textarea textarea-bordered w-full"
            rows={5} // You can adjust the height by changing this
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="label">Responsibilities</label>
          <textarea
            placeholder="Write each job Responsibilities in new line (max 300 characters)"
            {...register("responsibilities", {
              required: true,
              maxLength: 300,
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
            {...register("description", {
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

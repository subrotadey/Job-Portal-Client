import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddJob = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // File upload state
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file change for image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setUploading(true);

      // Create FormData to send file to ImgBB
      const formData = new FormData();
      formData.append("image", file);

      // ImgBB API URL
      // environment variables for API URL and key
      // Make sure to set these in your .env file
      const API_URL = import.meta.env.VITE_IMGBB_API_URL;
      const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

      try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          setImageUrl(result.data.url);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image upload failed!",
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit = (data) => {
    const addJobData = {
      ...data,
      category: data.category?.value || "",
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
      company_logo: imageUrl,
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
          navigate("/myPostedJobs");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
  };

  //
  const jobCategories = [
    {
      label: "Design",
      options: [
        { value: "UI/UX Design", label: "UI/UX Design" },
        { value: "Graphic Design", label: "Graphic Design" },
        { value: "Product Design", label: "Product Design" },
        { value: "Motion Design", label: "Motion Design" },
        { value: "Visual Design", label: "Visual Design" },
        { value: "Web Design", label: "Web Design" },
        { value: "Game Design", label: "Game Design" },
        { value: "Illustration", label: "Illustration" },
      ],
    },
    {
      label: "Development",
      options: [
        { value: "Frontend Development", label: "Frontend Development" },
        { value: "Backend Development", label: "Backend Development" },
        { value: "Full Stack Development", label: "Full Stack Development" },
        { value: "Mobile App Development", label: "Mobile App Development" },
        { value: "WordPress Development", label: "WordPress Development" },
        { value: "Shopify Development", label: "Shopify Development" },
        { value: "Game Development", label: "Game Development" },
      ],
    },
    {
      label: "Marketing",
      options: [
        { value: "Digital Marketing", label: "Digital Marketing" },
        { value: "SEO", label: "SEO" },
        { value: "Content Marketing", label: "Content Marketing" },
        { value: "Email Marketing", label: "Email Marketing" },
        { value: "Social Media Marketing", label: "Social Media Marketing" },
        { value: "Affiliate Marketing", label: "Affiliate Marketing" },
      ],
    },
    {
      label: "Writing",
      options: [
        { value: "Content Writing", label: "Content Writing" },
        { value: "Copywriting", label: "Copywriting" },
        { value: "Technical Writing", label: "Technical Writing" },
        { value: "Blog Writing", label: "Blog Writing" },
        { value: "Script Writing", label: "Script Writing" },
        { value: "Ghostwriting", label: "Ghostwriting" },
      ],
    },
    {
      label: "Data",
      options: [
        { value: "Data Entry", label: "Data Entry" },
        { value: "Data Analysis", label: "Data Analysis" },
        { value: "Data Visualization", label: "Data Visualization" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Data Engineering", label: "Data Engineering" },
      ],
    },
    {
      label: "Admin & Support",
      options: [
        { value: "Virtual Assistant", label: "Virtual Assistant" },
        { value: "Customer Support", label: "Customer Support" },
        { value: "Technical Support", label: "Technical Support" },
        { value: "Project Management", label: "Project Management" },
        { value: "Transcription", label: "Transcription" },
      ],
    },
  ];

  const jobTypeOptions = [
    { value: "Remote", label: "Remote" },
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contractual", label: "Contractual" },
    { value: "Freelance", label: "Freelance" },
    { value: "Temporary", label: "Temporary" },
    { value: "Volunteer", label: "Volunteer" },
  ];

  const currencyOptions = [
    { value: "BDT", label: "BDT" },
    { value: "USD", label: "USD" },
    { value: "INR", label: "INR" },
    { value: "Rs", label: "Rs" },
  ];

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
            {errors.company && (
              <p className="text-red-500 text-sm">Company name is required.</p>
            )}
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
            {errors.title && (
              <p className="text-red-500 text-sm">Job title is required.</p>
            )}
          </div>

          {/* Job Subcategory */}
          <div className="form-control w-full mx-auto">
            <label className="label">
              {/* <span className="label-text font-semibold text-gray-700"> */}
              Job Category
              {/* </span> */}
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={jobCategories}
                  value={selectedOption}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedOption(option);
                  }}
                  placeholder="Select a job Category"
                  isClearable
                  isSearchable
                  className="text-sm w-full "
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">Job category is required.</p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend label">Job Type</legend>
              <Controller
                name="jobTypeTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    isSearchable
                    options={jobTypeOptions}
                    placeholder="Pick a Job Type"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || "")
                    } // ✅ only store value
                    value={jobTypeOptions.find(
                      (option) => option.value === field.value
                    )} // ✅ convert value back to object
                  />
                )}
              />
            </fieldset>
            {errors.jobTypeTime && (
              <p className="text-red-500 text-sm">Job type is required.</p>
            )}
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
            {errors.location && (
              <p className="text-red-500 text-sm">Location is required.</p>
            )}
          </div>

          <div className="flex items-between gap-2">
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
              {errors.applicationDate && (
                <p className="text-red-500 text-sm">
                  Application date is required.
                </p>
              )}
            </div>

            {/* Deadline Picker */}
            <div>
              <label className="label">Job Deadline</label>
              <Controller
                control={control}
                name="applicationDeadline"
                rules={{ 
                  required: true,
                  validate: value => value > getValues("applicationDate") || "Deadline must be after post date"
                }}
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
              {errors.applicationDeadline && (
                <p className="text-red-500 text-sm">
                  Application deadline is required.
                </p>
              )}
            </div>
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
            {errors.hr_email && (
              <p className="text-red-500 text-sm">
                {errors.hr_email.type === "required"
                  ? "HR email is required."
                  : "Invalid email format."}
              </p>
            )}
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
            {errors.hr_name && (
              <p className="text-red-500 text-sm">HR name is required.</p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="label">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
            <button
              type="button"
              disabled={uploading}
              className="btn btn-primary mt-2"
            >
              {uploading ? "Uploading..." : "Upload Logo"}
            </button>
            {imageUrl && (
              <div className="mt-4">
                <p>Uploaded Logo:</p>
                <img src={imageUrl} alt="Uploaded" width="100" />
              </div>
            )}
            {errors.company_logo && (
              <p className="text-red-500 text-sm">Company logo is required.</p>
            )}
          </div>

          {/* Developer Status */}
          <div>
            <label className="label font-semibold">Job Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Active"
                  {...register("status", { required: true })}
                  className="radio radio-primary"
                  aria-label="Active status"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Inactive"
                  {...register("status", { required: true })}
                  className="radio radio-primary"
                  aria-label="Inactive status"
                />
                <span>Inactive</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm">Job status is required.</p>
            )}
          </div>

          {/* Salary Range */}

          <div>
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
                {errors.salaryRange?.min && (
                  <p className="text-red-500 text-sm">
                    Minimum salary is required and must be a number.
                  </p>
                )}
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
                {errors.salaryRange?.max && (
                  <p className="text-red-500 text-sm">
                    Maximum salary is required and must be a number.
                  </p>
                )}
              </div>

              {/* Currency */}
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend label">Currency</legend>
                  <Controller
                    name="salaryRange.currency"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        options={currencyOptions}
                        placeholder="Pick a Currency"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable
                        isSearchable
                        value={
                          currencyOptions.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(option) =>
                          field.onChange(option ? option.value : null)
                        }
                      />
                    )}
                  />
                </fieldset>
                {errors.salaryRange?.currency && (
                  <p className="text-red-500 text-sm">Currency is required.</p>
                )}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="label">Requirements</label>
            <textarea
              placeholder="Write each job requirement in a new line"
              {...register("requirements", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.requirements && (
              <p className="text-red-500 text-sm">
                Job requirements are required.
              </p>
            )}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="label">Responsibilities</label>
            <textarea
              placeholder="Write each job responsibility in a new line"
              {...register("responsibilities", {
                required: true,
              })}
              className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.responsibilities && (
              <p className="text-red-500 text-sm">
                Job responsibilities are required.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              placeholder="Enter job description"
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                Job description is required.
              </p>
            )}
          </div>
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

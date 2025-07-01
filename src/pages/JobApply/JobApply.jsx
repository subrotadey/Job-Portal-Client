import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

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

    fetch("https://job-portal-server-7m7w.onrender.com/job-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.acknowledged) {
          Swal.fire({
            title: "Job application submitted successfully!",
            icon: "success",
            text: "Your application has been added"
          });
          reset()
          navigate("/myApplications");
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
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="label">First Name</label>
            <input
              type="text"
              placeholder="First name"
              {...register("First name", { required: true, maxLength: 80 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              {...register("Last name", { required: true, maxLength: 100 })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="text"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
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

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <select
              {...register("Title", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </div>

          {/* Developer Status */}
          <div>
            <label className="label">Are you a developer?</label>
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
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="No"
                  {...register("Developer", { required: true })}
                  className="radio radio-primary"
                />
                No
              </label>
            </div>
          </div>
          {/* GitHub Link */}
          <div>
            <label className="label">GitHub Profile Link</label>
            <input
              type="url"
              placeholder="https://github.com/yourusername"
              {...register("github", {
                required: "GitHub profile is required",
                pattern: {
                  value: /^https:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?$/,
                  message: "Enter a valid GitHub URL",
                },
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* LinkedIn Link */}
          <div>
            <label className="label">LinkedIn Profile Link</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourusername"
              {...register("linkedin", {
                required: "LinkedIn profile is required",
                pattern: {
                  value:
                    /^https:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
                  message: "Enter a valid LinkedIn URL",
                },
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Resume Link */}
          <div>
            <label className="label">
              Resume Link (Google Drive / PDF URL)
            </label>
            <input
              type="url"
              placeholder="https://yourresume.com/resume.pdf"
              {...register("resumeLink", {
                required: "Resume link is required",
                pattern: {
                  message: "Enter a valid PDF/DOC resume URL",
                },
              })}
              className="input input-bordered w-full"
            />
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

export default JobApply;

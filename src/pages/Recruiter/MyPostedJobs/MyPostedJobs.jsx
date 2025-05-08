import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobPostData, setJobPostData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/jobs?email=${user?.email}`
        );
        const data = await response.json();
        setJobPostData(data); // job data set করো state এ
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (user?.email) {
      fetchJobs();
    }
  }, [user?.email]);

  return (
    <div className="overflow-x-auto w-full">
      {jobPostData._id}
      {jobPostData.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No job posts available.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200 text-center">
              <th>SR No</th>
              <th>Company Name</th>
              <th>Post Date</th>
              <th>Deadline</th>
              <th>Application Count</th>
              <th>Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobPostData.map((job, index) => (
              <tr key={index + 1} className="hover:bg-base-300 text-center">
                <th>{index + 1}</th>
                <td>{job.company}</td>
                <td>{job.applicationDate}</td>
                <td>{job.applicationDeadline}</td>
                <td>{job.applicationCount}</td>
                <td>
                  <Link to={`/viewApplications/${job._id}`}>
                    <button className="btn btn-primary btn-sm">View</button>
                  </Link>
                </td>
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-secondary btn-sm">Edit</button>
                  <button className="btn btn-error btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;

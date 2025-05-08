import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../shared/Spinner/Spinner";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

  const fetchJobs = () => {
    setLoading(true);
    fetch(`http://localhost:5000/job-application?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchJobs(); // initial fetch
    }
  }, [user?.email]);

  const getStatusBadge = (status) => {
    const statusText = status || "Under Review";
    const statusLower = statusText.toLowerCase();

    let badgeClass = "badge badge-outline";
    if (statusLower === "under review") badgeClass = "badge badge-info";
    else if (statusLower === "set interview") badgeClass = "badge badge-warning";
    else if (statusLower === "hired") badgeClass = "badge badge-success";
    else if (statusLower === "rejected") badgeClass = "badge badge-error";
    else if (statusLower === "interview scheduled") badgeClass = "badge badge-primary";
    else if (statusLower === "offer letter") badgeClass = "badge badge-primary";
    else if (statusLower === "offer accepted") badgeClass = "badge badge-success";
    else if (statusLower === "offer rejected") badgeClass = "badge badge-error";
    else if (statusLower === "offer pending") badgeClass = "badge badge-warning";
    else if (statusLower === "offer withdrawn") badgeClass = "badge badge-secondary";
    else if (statusLower === "offer expired") badgeClass = "badge badge-secondary";

    return (
      <span className={`${badgeClass} flex items-center gap-2`}>
        {statusText}
        <span className="animate-pulse text-xs text-gray-400">⏺</span>
      </span>
    );
  };

  return (
    <div>
      <h2>My job applications: {jobs.length}</h2>
      <button onClick={fetchJobs} className="btn btn-sm mb-4 ">
        Refresh
      </button>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Company</th>
                <th>Job</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={job.company_logo} alt="Company Logo" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{job.company}</div>
                      <div className="text-sm opacity-50">{job.jobLocation}</div>
                    </div>
                  </td>
                  <td>{job.jobTitle || "N/A"}</td>
                  <td>{getStatusBadge(job.status)}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;

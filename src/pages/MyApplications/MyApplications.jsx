import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../shared/Spinner/Spinner";
import { Link } from "react-router-dom";
import Badge from "../shared/Badge/Badge";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  const fetchJobs = () => {
    setLoading(true);
    fetch(`https://job-portal-server-7m7w.onrender.com/job-application?email=${user?.email}`)
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
                        <img
                          src={job.company_logo || "/placeholder.png"}
                          // onError={(e) => (e.target.src = "/placeholder.png")}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">
                        {job.company || (
                          <p className="text-red-500 text-lg">
                            Circular deleted by Authority
                          </p>
                        )}
                      </div>
                      <div className="text-sm opacity-50">
                        {job.jobLocation}
                      </div>
                    </div>
                  </td>
                  <td>
                    {job.jobTitle || (
                      <p className="text-red-500 text-lg">
                        {"Circular deleted"}
                      </p>
                    )}
                  </td>
                  <td>
                    <Badge status={job.status} />
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">
                      {job.jobTitle ? (
                        <Link to={`/job-details/${job.jobId}`}>
                          View Details
                        </Link>
                      ) : (
                        <p className="text-red-500">This Job is no more</p>
                      )}
                    </button>
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

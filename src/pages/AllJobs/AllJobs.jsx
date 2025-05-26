import React from "react";
import { useLoaderData } from "react-router-dom";
import JobCard from "./JobCard";
import Spinner from "../shared/Spinner/Spinner";

const AllJobs = () => {
  const jobs = useLoaderData();

  if (!jobs) {
    return <Spinner />;
  }
  // Sort jobs by date in descending order
  const sortedJobs = [...jobs].reverse();

  if (sortedJobs.length === 0) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold">No hot jobs available</h3>
      </div>
    );
  }
  return (
    <div>
      {sortedJobs.length === 0 && <Spinner />}
      {sortedJobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {sortedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;

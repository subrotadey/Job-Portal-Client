import React, { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";
import Spinner from "../shared/Spinner/Spinner";

const HotJobs = () => {
  const [hotJobs, setHotJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs"); // Replace with your API endpoint
        const data = await response.json();
        setHotJobs(data);
      } catch (error) {
        console.error("Error fetching hot jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotJobs();
  }, [loading]);

//   // Step 1: Filter jobs posted in the last 30 days
// const THIRTY_DAYS = 30;
// const currentDate = new Date();

// const recentJobs = hotJobs.filter((job) => {
//   const postedDate = new Date(job.posted_date);
//   const diffInDays = (currentDate - postedDate) / (1000 * 60 * 60 * 24);
//   return diffInDays <= THIRTY_DAYS;
// });

// // Step 2: Sort recent jobs by posted date (latest first)
// recentJobs.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

// Optional: Slice top 8 hot jobs
const latestJobs = [...hotJobs].reverse();

  

  return (
    <div>
      {/* make card for job posting */}
      {loading && <Spinner></Spinner>}
      {!loading && latestJobs.length === 0 && (
        <div className="text-center">
          <h3 className="text-lg font-semibold">No hot jobs available</h3>
        </div>
      )}
      {!loading && latestJobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {latestJobs.slice(0, 8).map((hotJob) => (
            <HotJobCard key={hotJob._id} hotJob={hotJob}></HotJobCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotJobs;

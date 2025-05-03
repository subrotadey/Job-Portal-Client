import React, { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

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

  return (
    <div>
      {/* make card for job posting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {hotJobs.map((hotJob) => (
          <HotJobCard key={hotJob._id} hotJob={hotJob}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;

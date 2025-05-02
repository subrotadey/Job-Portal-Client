import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const jobCategories = [
  { title: "Marketing & Sale", jobs: 1526, icon: "📣" },
  { title: "Customer Help", jobs: 185, icon: "🎧" },
  { title: "Finance", jobs: 168, icon: "🏦" },
  { title: "Software", jobs: 1856, icon: "💡" },
  { title: "Human Resource", jobs: 165, icon: "🧑‍💼" },
  { title: "Management", jobs: 965, icon: "📊" },
  { title: "Retail & Products", jobs: 563, icon: "🛍️" },
  { title: "Security Analyst", jobs: 254, icon: "🔐" },
  { title: "Content Writer", jobs: 142, icon: "📄" },
  { title: "Market Research", jobs: 532, icon: "📈" },
];

const JobCategoryScroller = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;
      const card = container?.querySelector(".job-card");

      if (!container || !card) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: card.offsetWidth + 24, behavior: "smooth" });
      }
    }, 3000); // Adjust interval time as needed

    return () => clearInterval(interval);
  }, []);

  const scrollByCard = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".job-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24; // 24px = gap-6
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-2">
        Browse by category
      </h2>
      <p className="text-center text-sm mb-6">
        Find the job that’s perfect for you. About 800+ new jobs everyday
      </p>
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scrollByCard("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white p-3 rounded-full shadow"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
        >
          {jobCategories.map((job, index) => (
            <div
              key={index}
              className="flex job-card min-w-[250px]  shadow-md p-6 my-6 rounded-xl flex-shrink-0 border hover:shadow-xl transition"
            >
              <div className="text-4xl mb-3">{job.icon}</div>
              <Link
                to={`/jobs/${job.title}`}
                className="flex flex-col group transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-500">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-400">
                  {job.jobs} Jobs Available
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scrollByCard("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white p-3 rounded-full shadow"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobCategoryScroller;

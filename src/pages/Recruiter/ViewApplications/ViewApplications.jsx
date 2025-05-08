import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const applications = useLoaderData();
  console.log(applications);

  const handleStatusUpdate = async (e, id) => {
    const statusValue = e.target.value;

    const status = statusValue === "Change Status" ? "" : statusValue;
    const response = await fetch(
      `http://localhost:5000/job-applications/${id}`,

      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    const data = await response.json();

    console.log(data);

    if (data.modifiedCount > 0) {
      // toast.success("Status updated successfully", {
      //   duration: 20000,
      //     position: "top-center",
      //     style: {
      //       background: "#333",
      //         color: "#fff",
      //         fontSize: "16px",
      //         padding: "16px",
      //         borderRadius: "8px",
      //         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      //         transition: "all 0.3s ease-in-out",
      //     },
      // });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status updated successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      {applications.message ? (
        <div className="text-center text-gray-500 min-h-96 flex flex-col justify-center">
          <h2 className="text-5xl font-bold">{applications.message}</h2>
        </div>
      ) : (
        <div className="overflow-x-auto min-h-96">
          <table className="table">
            <thead>
              <tr className="bg-base-200 text-center">
                <th>SR No</th>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, i) => (
                <tr
                  key={application._id}
                  className="hover:bg-base-300 text-center"
                >
                  <th>{i + 1}</th>
                  <td>{application.firstName + " " + application.lastName}</td>
                  <td>{application.email}</td>
                  <td>
                    <a
                      href={application.resumeLink}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <select
                      onChange={(e) => handleStatusUpdate(e, application._id)}
                      name="status"
                      id="status"
                      defaultValue={application.status || "Change Status"}
                      className="select select-sm"
                    >
                      <option>Change Status</option>
                      <option>Under Review</option>
                      <option>Set Interview</option>
                      <option>Hired</option>
                      <option>Rejected</option>
                    </select>
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

export default ViewApplications;

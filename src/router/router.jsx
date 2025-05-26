import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import ResetPassword from "../pages/shared/ResetPassword/ResetPassword";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/Recruiter/AddJob/AddJob";
import AllJobs from "../pages/AllJobs/AllJobs";
import MyPostedJobs from "../pages/Recruiter/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/Recruiter/ViewApplications/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <Home> </Home>,
      },
      {
        path: "/register",
        element: <Register> </Register>,
      },
      {
        path: "/signIn",
        element: <SignIn> </SignIn>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword> </ResetPassword>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails> </JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/alljobs",
        element: <AllJobs> </AllJobs>,
        loader: () => fetch("http://localhost:5000/jobs"),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply> </JobApply>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications> </MyApplications>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/job-applications"),
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob> </AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewApplications/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`),
      },
    ],
  },
]);

export default router;

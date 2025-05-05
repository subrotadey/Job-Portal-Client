import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import ResetPassword from "../pages/shared/ResetPassword/ResetPassword";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";

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
    ],
  },
]);

export default router;

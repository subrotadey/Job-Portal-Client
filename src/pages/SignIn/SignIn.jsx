import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import regLottieData from "../../assets/lottie/sign in.json";
import SuccessToast from "../shared/Toast/SuccessToast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import GoogleSignIn from "../shared/GoogleSignIn/GoogleSignIn";
import FacebookSignIn from "../shared/FacebookSignIn/FacebookSignIn";
import GitHubSIgnIn from "../shared/GitHubSIgnIn/GitHubSIgnIn";
import axios from "axios";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    // Optional: validation (like password match) can be added here
    const { email, password } = formData;

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Call your sign-in function here, e.g., using Firebase or any other auth service
    signInUser(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("User Signed In:", userCredential.user.email);
        toast.success("Sign In successful!");
        console.log(userCredential.user);

        const user = { email: email };

        axios.post("https://job-portal-server-7m7w.onrender.com/jwt-login", user).then((response) => {
          console.log(response.data);
        });


        // navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorMessage}, ${errorCode}`);
        // console.error("Error Sign In user:", errorCode, errorMessage);
        toast.error(
          "Sign In failed. Please try again.",
          errorCode,
          errorMessage
        );
      });

    // Reset form after successful registration
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="hero min-h-screen bg-transparent">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left w-1/3">
          <Lottie animationData={regLottieData} />
        </div>
        <SuccessToast></SuccessToast>
        <div className="card w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-gray-200 shadow-2xl">
          <div className="card-body">
            <div className="text-center space-y-2 mb-4">
              <p className="text-primary">Welcome back!</p>
              <h2 className="text-3xl font-bold">Member Login</h2>
              <p className="text-sm ">
                Access to all features. No credit card required.
              </p>
            </div>
            <GoogleSignIn></GoogleSignIn>
            <FacebookSignIn></FacebookSignIn>
            <GitHubSIgnIn></GitHubSIgnIn>
            <form onSubmit={handleSignIn}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                <p className="text-sm mt-2">
                  Forgot password?
                  <Link to="/reset-password" className="ml-1 link text-primary">
                    Reset here
                  </Link>
                </p>
              </div>
              <button className="btn btn-primary mt-4 w-full" type="submit">
                Sign In
              </button>

              <p className="mt-4 text-sm">
                Don't have an Account?
                <Link
                  to="/register"
                  className="link link-hover text-primary ml-1"
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

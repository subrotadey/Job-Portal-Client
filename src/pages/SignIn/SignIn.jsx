import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import regLottieData from "../../assets/lottie/sign in.json";
import SuccessToast from "../shared/Toast/SuccessToast";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import GoogleSignIn from "../shared/GoogleSignIn/GoogleSignIn";
import FacebookSignIn from "../shared/FacebookSignIn/FacebookSignIn";
import GitHubSIgnIn from "../shared/GitHubSIgnIn/GitHubSIgnIn";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
        const user = userCredential.user;
        console.log("User Signed In:", user);
        toast.success("Sign In successful!");
        console.log(userCredential.user);
        navigate("/");
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left w-1/3">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <Lottie animationData={regLottieData} />
        </div>
        <SuccessToast></SuccessToast>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
            <form onSubmit={handleSignIn} className="space-y-4">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
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

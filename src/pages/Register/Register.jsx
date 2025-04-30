import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import regLottieData from "../../assets/lottie/register.json";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import SuccessToast from "../shared/Toast/SuccessToast";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "../shared/GoogleSignIn/GoogleSignIn";
import FacebookSignIn from "../shared/FacebookSignIn/FacebookSignIn";
import GitHubSIgnIn from "../shared/GitHubSIgnIn/GitHubSIgnIn";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Optional: validation (like password match) can be added here
    const { email, password, confirmPassword } = formData;

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
    // password same or not
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    registerUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User registered:", user);
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
        toast.error("Registration failed. Please try again.");
      });

    // Reset form after successful registration
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left w-1/3">
          <h1 className="text-5xl font-bold">Register now!</h1>
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
            <form onSubmit={handleRegister} className="space-y-4">
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

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

              <label className="label">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              <button className="btn btn-primary mt-4 w-full" type="submit">
                Register
              </button>

              <p className="mt-4 text-sm">
                Already have an account?
                <Link
                  to="/signIn"
                  className="link link-hover text-primary ml-1"
                >
                  Sign In Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

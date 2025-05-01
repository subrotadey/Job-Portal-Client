import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext/AuthContext";
import resetPassEmail from "../../../assets/lottie/reset-password.json";
import Lottie from "lottie-react";

const ResetPassword = () => {
  const { resetPasswordEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

// with async/await
    //     if (!email) {
    //       toast.error("Please enter your email.");
    //       return;
    //     }

    //     try {
    //       await resetPasswordEmail(email);
    //       console.log("Password reset email sent! Please check your inbox.");
    //       toast.success("Password reset email sent! Please check your inbox.");
    //       setEmail("");
    //     } catch (error) {
    //       toast.error(error.message || "Failed to send reset email.");
    //     }


    resetPasswordEmail(email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password reset email sent! Please check your inbox.");
        console.log("Password reset email sent! Please check your inbox.");
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          "Error sending password reset email:",
          errorCode,
          errorMessage
        );
        toast.error(errorMessage || "Failed to send reset email.");
      });
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-10">
      {/* 📸 Image section */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <Lottie animationData={resetPassEmail} />
      </div>

      {/* 🔐 Form section */}
      <div className="card w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-gray-200 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">
            Reset Password
          </h2>
          <p className="text-sm text-center mb-4">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Reset Link
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/signIn" className="link link-hover text-sm text-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

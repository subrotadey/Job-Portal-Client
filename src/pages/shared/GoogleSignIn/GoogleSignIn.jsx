import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Token:", token);
        console.log("Google Sign In successful:", user);
        toast.success("Google Sign In successful!");
        // Optional: Navigate to dashboard or homepage
        Navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(email, credential);
        console.error("Google Sign In Error:", errorCode, errorMessage);
        toast.error("Google Sign In failed. Please try again.");
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </button>
      <div className="divider">Or Continue with</div>
    </div>
  );
};

export default GoogleSignIn;

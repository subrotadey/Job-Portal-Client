import { Facebook } from "lucide-react";
import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FacebookAuthProvider } from "firebase/auth";

const FacebookSignIn = () => {
  const { signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((result) => {
        const user = result.user;
        console.log("Facebook Sign In successful:", user);
        toast.success("Facebook Sign In successful!");
        // Optionally, you can also get the access token if needed
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("Access Token:", accessToken);
        // You can use the access token for further API calls if needed

        // Optional: Navigate to dashboard or homepage
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Facebook Sign In Error:", errorCode, errorMessage);
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleFacebookSignIn}
        className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
      >
        <Facebook className="w-5 h-5" />
        Sign in with Facebook
      </button>
      
    </div>
  );
};

export default FacebookSignIn;

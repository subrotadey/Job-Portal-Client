import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import regLottieData from "../../assets/lottie/sign in.json";
import SuccessToast from "../shared/Toast/SuccessToast";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../firebase/AuthProvider"; // path may vary
import auth from "../../firebase/firebase.init";
// import { sendSignInLinkToEmail } from "firebase/auth";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Google Sign In
   const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Token:", token);
        console.log("Google Sign In successful:", user);
        toast.success("Google Sign In successful!");
        // Optional: Navigate to dashboard or homepage
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

    

      // sendSignInLinkToEmail(email)
      // .then(() => {
      //   // The link was successfully sent. Inform the user.
      //   window.localStorage.setItem('emailForSignIn', email)
      //   toast.success("Email link sent! Check your inbox.");
      // })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   toast.error(`${errorMessage}, ${errorCode}`);
      // });

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


          <button
  type="button"
  onClick={handleGoogleSignIn}
  className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
>
  <FcGoogle className="w-5 h-5" />
  Sign in with Google
</button>

          <div className="divider">OR</div>

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
            <div className="divider">OR</div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

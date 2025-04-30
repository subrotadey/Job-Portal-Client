import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GithubAuthProvider } from "firebase/auth";
import { Github } from "lucide-react";

const GitHubSIgnIn = () => {
  const { signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        const user = result.user;
        console.log("GitHub Sign In successful:", user);
        toast.success("GitHub Sign In successful!");
        // Optionally, you can also get the access token if needed
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("Access Token:", accessToken);
        // Optional: Navigate to dashboard or homepage
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("GitHub Sign In Error:", errorCode, errorMessage);
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGitHubSignIn}
        className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
      >
        <Github className="w-5 h-5" />
        Sign in with GitHub
      </button>
      <div className="divider">Or Continue with</div>
    </div>
  );
};

export default GitHubSIgnIn;

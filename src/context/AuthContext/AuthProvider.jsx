import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";

const googleAuth = new GoogleAuthProvider();
const facebookAuth = new FacebookAuthProvider();
const githubAuth = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //for password authentication
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //for email verification
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser).finally(() => {
      setLoading(false);
    });
  };

  //for password reset
  const resetPasswordEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => {
      setLoading(false);
    });
  };

  //for sign out user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // for google authentication
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuth);
  };

  // for facebook authentication
  const signInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookAuth);
  };

  // for github authentication
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      if (CurrentUser) {
        setUser(CurrentUser);
        console.log(CurrentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    // Listen for authentication state changes
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    verifyEmail,
    resetPasswordEmail,
    signOutUser,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    // SignInLinkToEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

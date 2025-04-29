import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // signInWithPopup,
  signOut,
  // signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";

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

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  //Email Link Authentication
  // const SignInLinkToEmail = (email) => {
  //   const actionCodeSettings = {
  //     // URL you want to redirect back to after email link is finished
  //     url: "http://localhost:5173/",
  //     handleCodeInApp: true,
  //   };
  //   return SignInLinkToEmail(auth, email, actionCodeSettings);
  // }

  // for google authentication
  // const provider = new GoogleAuthProvider();

  // const handleGoogleSignIn = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, provider);
  // };

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
    signOutUser,
    // handleGoogleSignIn
    // SignInLinkToEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

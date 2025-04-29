import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const {user, signOutUser} = useContext(AuthContext)


  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorMessage}, ${errorCode}`);
      });
  };


  const links = (
    <>
      <li>
        <a>Item 1</a>
      </li>

      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <Link onClick={handleLogOut} className="btn btn-primary ml-4">
            Log Out
          </Link>
        ) : (
          <>
          <Link to="/register">Register</Link>
          <Link to="/signIn" className="btn btn-primary ml-4">Sign In</Link>
          </>
        )}
        


{/*         
        <Link to="/signIn" className="btn btn-primary ml-4">
        <button className="btn">Sign In</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;

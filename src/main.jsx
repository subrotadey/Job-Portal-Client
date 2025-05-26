import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import './App.css'
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);

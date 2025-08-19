import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-6">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-lg bg-primary text-white font-medium shadow-md hover:bg-primary/90 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

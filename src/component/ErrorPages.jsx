import React from "react";
import { Link } from "react-router-dom";

const ErrorPages = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-500 to-pink-500 text-white">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold mb-4">404</h1>
        {/* Error Message */}
        <h2 className="text-3xl font-semibold mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg mb-8">
          The page you are looking for does not exist. It might have been removed or the URL might be incorrect.
        </p>
        {/* Navigation Button */}
        <Link
          to="/"
          className="bg-white text-red-500 px-6 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPages;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(""); // Clear state
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="bg-gray-200 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-gray-800 text-xl font-bold">
          <Link to="/">Helen</Link>
        </div>

        {/* Navigation Links in a single line */}
        <div className="flex items-center gap-x-6">
          {username ? (
            <>
              <Link to="/notes" className="text-gray-800 hover:text-gray-600 transition duration-300">
                Notes
              </Link>
              <Link to="/learn" className="text-gray-800 hover:text-gray-600 transition duration-300">
                Learn
              </Link>
              <Link to="/test" className="text-gray-800 hover:text-gray-600 transition duration-300">
                Test Yourself
              </Link>
              <Link to="/analysis" className="text-gray-800 hover:text-gray-600 transition duration-300">
                Analysis
              </Link>
              <span className="text-black font-bold">{username}</span>
              <button 
                onClick={handleLogout} 
                className="text-black px-3 py-2 rounded-md hover:text-red-800 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

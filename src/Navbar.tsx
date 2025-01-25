import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./Components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-gray-800 text-xl font-bold">
          <Link to="/">Helen</Link>
        </div>

        {/* Menu items for desktop */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/notes"
            className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
          >
            Notes
          </Link>
          <Link
            to="/learn"
            className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
          >
            Learn
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
          >
            About Us
          </Link>

          {/* Conditionally render Sign In/Sign Up or Sign Out */}
          {!user ? (
            <>
              <Link
                to="/signin"
                className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md transition duration-300"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <Link
          to="/notes"
          className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
        >
          Notes
        </Link>
        <Link
          to="/learn"
          className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
        >
          Learn
        </Link>
        <Link
          to="/about"
          className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
        >
          About Us
        </Link>

        {/* Conditionally render Sign In/Sign Up or Sign Out */}
        {!user ? (
          <>
            <Link
              to="/signin"
              className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="text-gray-800 block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-200"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

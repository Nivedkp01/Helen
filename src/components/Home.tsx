import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/cute-school-girl-sitting-book-stack-yellow-background-cute-school-girl-sitting-book-stack-smiling-camera-yellow-157936431.jpg')" }} // Replace with your image path
    >
      <div className="text-center bg-white bg-opacity-70 p-8 rounded-lg shadow-lg ml-100">
        {/* Main Title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Helen</h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600 mb-6">Your journey to knowledge starts here</p>

        {/* Buttons */}
        <div className="space-x-10 ">
          <Link to="/book">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition duration-300">
              Start Learning
            </button>
          </Link>
          
          <Link to="/explore">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition duration-300">
              Explore Your Interest
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

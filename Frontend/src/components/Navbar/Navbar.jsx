import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/arogya_logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('user_id') && localStorage.getItem('token');

  // Logout function to clear user data and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav className="flex items-center justify-between py-1 px-5 bg-white shadow-lg relative">
      {/* Logo */}
      <div>
        <img src={logo} alt="logo" className="w-18 h-14 object-contain" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 text-md">
        <Link to="/" className="hover:text-[#DE7C7D] transition">Home</Link>
        <Link to="/AboutPCOS" className="hover:text-[#DE7C7D] transition">About PCOS</Link>
        <Link to="/SurveyForm" className="hover:text-[#DE7C7D] transition">Survey Form</Link>
        <Link to="/UltrasoundImage" className="hover:text-[#DE7C7D] transition">Ultrasound</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Login or Logout Button (visible on large screens) */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-pcosPink text-white font-medium rounded-full shadow-md hover:bg-gray-100 transition"
            style={{ backgroundColor: "#862949" }}
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button
              className="px-5 py-2 bg-pcosPink text-white font-medium rounded-full shadow-md hover:bg-gray-100 transition"
              style={{ backgroundColor: "#862949" }}
            >
              Log In
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu with Overlay */}
      {isOpen && (
        <>
          {/* Overlay to close the menu when clicking outside */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Mobile Menu */}
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
            <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 text-md">
              <Link to="/" className="hover:text-[#DE7C7D] transition" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/AboutPCOS" className="hover:text-[#DE7C7D] transition" onClick={() => setIsOpen(false)}>About PCOS</Link>
              <Link to="/SurveyForm" className="hover:text-[#DE7C7D] transition" onClick={() => setIsOpen(false)}>Survey Form</Link>
              <Link to="/UltrasoundImage" className="hover:text-[#DE7C7D] transition" onClick={() => setIsOpen(false)}>Ultrasound</Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-[#A72831] text-gray-700 font-medium rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  Log Out
                </button>
              ) : (
                <Link to="/login">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 bg-[#A72831] text-gray-700 font-medium rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    Log In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

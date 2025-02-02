import React, { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import loginIllustration from "../assets/3.jpeg";
import axios from "axios";

const Signup = () => {
  // const navigate = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      // Send login data to your backend (replace URL with your actual API endpoint)
      const response = await axios.post("http://localhost:8801/register", {
        email: formData.email,
        password: formData.password,
      });

      // If login is successful, save the user info to localStorage
      localStorage.setItem("user_id", response.data.user_id); // Assuming response contains user_id
      localStorage.setItem("token", response.data.token); // Assuming response contains token

      // Redirect to the homepage or a protected route after login
      // navigate("/"); // Or navigate to any other route you prefer
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  console.log("dghgk");

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Image Section, visible only on medium screens and above */}
          <div className="hidden md:flex md:w-1/2 bg-pink-100 items-center justify-center">
            <img
              src={loginIllustration}
              alt="Signup Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
              Sign Up
            </h2>
            <p className="text-gray-600 text-center mb-4 md:mb-6 text-sm md:text-base">
              By <span style={{ color: "#E7A3AC" }}>continuning</span>, you
              agree to our{" "}
              <span style={{ color: "#E7A3AC" }}>User Agreement</span> and{" "}
              <span style={{ color: "#E7A3AC" }}>Privacy Policy</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pcosPink text-white font-bold py-2 md:py-3 rounded-full hover:bg-pink-600 transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                style={{ backgroundColor: "#E7A3AC" }}
              >
                Continue
              </button>
            </form>

            {/* Log in link */}
            <p className="text-center mt-4 md:mt-6 text-gray-500 text-sm md:text-base">
              Already a member?{" "}
              <Link to="/login" className="text-pcosPink font-semibold ">
                <span style={{ color: "#E7A3AC" }}>Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you use axios for API calls
import loginIllustration from "../assets/3.jpeg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:8801/login", {
        email: formData.email,
        password: formData.password,
      });

      // If login is successful, save the user info to localStorage
      localStorage.setItem("user_id", response.data.user_id); // Assuming response contains user_id
      localStorage.setItem("token", response.data.token); // Assuming response contains token

      // Redirect to the homepage or a protected route after login
      // navigate('/');  // Or navigate to any other route you prefer
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-pink-100 items-center justify-center">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pcosPink text-white font-bold py-3 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              style={{ backgroundColor: "#E7A3AC" }}
            >
              Continue
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pcosPink font-semibold">
              <span style={{ color: "#E7A3AC" }}>Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

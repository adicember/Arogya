import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import Banner from "./pages/Banner";
import Question from "./pages/Question";
import SurveyForm from "./components/SurveyForm/SurveyForm";
import AboutPCOS from "./components/AboutPCOS/AboutPCOS";
import Footer from "./pages/Footer";
import UltrasoundImage from "./pages/UltrasoundImage";

const App = () => {
  // Check if user is logged in by verifying if user_id exists in localStorage
  const isLoggedIn = localStorage.getItem("user_id");
  console.log(isLoggedIn);

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Banner />
              <Question />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/SurveyForm"
          element={isLoggedIn ? <SurveyForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/AboutPCOS"
          element={isLoggedIn ? <AboutPCOS /> : <Navigate to="/login" />}
        />
        <Route
          path="/UltrasoundImage"
          element={isLoggedIn ? <UltrasoundImage /> : <Navigate to="/login" />}
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

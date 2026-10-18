import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MyReports from "./components/Profile/MyReports";
import SurveyForm from "./components/SurveyForm/SurveyForm";
import AboutPCOS from "./components/AboutPCOS/AboutPCOS";

import Home from "./components/HomePage/Home/Home";
import Footer from "./components/Footer/Footer";
import UltrasoundImage from "./components/Ultrasound/UltrasoundImage";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        {/* <Route
          path="/"
          element={
            <>
              <Hero />
              <Banner />
              <Question />
            </>
          }
        /> */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/signup" element={<Login initialMode="signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MyReports />} />

        {/* Login check removed for now: these routes are open to everyone */}
        <Route path="/SurveyForm" element={<SurveyForm />} />
        <Route path="/AboutPCOS" element={<AboutPCOS />} />
        <Route path="/UltrasoundImage" element={<UltrasoundImage />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

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
import Banner from "./pages/Banner";
import Question from "./pages/Question";
import SurveyForm from "./components/SurveyForm/SurveyForm";
import AboutPCOS from "./components/AboutPCOS/AboutPCOS";
import Footer from "./pages/Footer";
import UltrasoundImage from "./pages/UltrasoundImage";
import Home from "./components/HomePage/Home/Home";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

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

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BgPolygon from "../assets/polygon.png";
import Vector from "../assets/vector-wave.png";

const bgStyle = {
  backgroundImage: `url(${BgPolygon})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  backgroundColor: "white",
  position: "relative",
};

const Question = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleButtonClick = () => {
    navigate("/SurveyForm"); // Navigate to SurveyForm route
  };

  return (
    <div style={bgStyle} className="flex items-center justify-center">
      <div className="absolute top-0 w-full h-full">
        <img src={Vector} alt="wave overlay" className="w-full h-auto" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-4">
        <h1 className="text-4xl font-bold text-white tracking-wide mb-6">
          Do you have PCOS?
        </h1>

        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Public awareness of PCOS is necessary because over half of the
            6,000,000 people that have PCOS are unaware of it. Awareness helps
            the public understand that symptoms like irregular periods and
            excessive hair growth are often signs of a larger health concern
            and can be managed with proper treatment and lifestyle changes.
          </p>

          <div>
            <button
              onClick={handleButtonClick} // Navigate on button click
              className="bg-pink-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
            >
              Want to check symptoms?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;

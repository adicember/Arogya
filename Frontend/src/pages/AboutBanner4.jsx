import React, { useState } from "react";
import Risk from "../assets/try3.webp";

const AboutBanner4 = () => {
  // State to handle the "Read More" toggle
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the content visibility
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-50 p-6">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Health Risks Associated with PCOS
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Polycystic Ovary Syndrome (PCOS) is not just a hormonal condition
          affecting reproductive health; it also increases the risk of several
          long-term health complications if not managed properly. One of the
          most significant risks is type 2 diabetes, as insulin resistance is a
          common feature in individuals with PCOS, which can lead to elevated
          blood sugar levels over time. Additionally, PCOS is linked to an
          increased likelihood of developing cardiovascular diseases, including
          high blood pressure and unhealthy cholesterol levels, both of which
          contribute to heart disease.
        </p>
        {/* Conditionally Render More Content */}
        {isExpanded && (
          <p className="text-gray-600 text-lg mb-6">
            Women with PCOS are also at a higher risk of endometrial cancer, as
            prolonged irregular menstrual cycles can result in excessive
            buildup of the uterine lining. Beyond physical health, PCOS can
            have profound effects on mental well-being. Many individuals with
            PCOS experience anxiety, depression, and low self-esteem due to
            challenges like infertility, weight gain, and changes in physical
            appearance caused by excess androgen levels. Sleep disorders,
            including obstructive sleep apnea, are also more prevalent in
            individuals with PCOS, further exacerbating overall health risks.
            By addressing these risks with early diagnosis, lifestyle
            modifications, and appropriate medical care, individuals with PCOS
            can reduce the likelihood of long-term complications and improve
            their quality of life.
          </p>
        )}
        {/* Toggle Button */}
        <button
          className="bg-pink-900 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
          onClick={handleReadMore}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-full lg:w-1/2">
        <div className="relative w-full h-96">
          <img
            src={Risk}
            alt="Mental Health Illustration"
            className="absolute inset-0 object-cover w-full h-full rounded-lg shadow-lg"
          />
          {/* Background Details */}
          <div className="absolute bottom-0 left-6 w-64 h-64 bg-purple-50 rounded-full blur-xl opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner4;

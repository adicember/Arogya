// src/components/CovidTesting.js
import React, { useState } from "react";
import PCOS from "../assets/try2.jpg";

const AboutBanner1 = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 py-12 px-6 md:px-20">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mb-4">
          <span className="text-3xl">🩺</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Polycystic Ovary Syndrome
        </h1>
        <p className="text-gray-600 mb-6">
          Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects individuals  with ovaries, typically during their reproductive years.
          {showMore && (
            <span>
              It is characterized by a combination of symptoms that can vary widely, making diagnosis and management complex. PCOS impacts an estimated 10% of people assigned female at birth worldwide, making it a significant health concern.PCOS can cause hormonal imbalances, irregular periods, excess androgen levels and cysts in the ovaries. Irregular periods, usually with a lack of ovulation, can make it difficult to become pregnant. PCOS is a leading cause of infertility.

              PCOS is a chronic condition and cannot be cured. However, some symptoms can be improved through lifestyle changes, medications and fertility treatments.

              The cause of PCOS is unknown but women with a family history or type 2 diabetes are at higher risk.
            </span>
          )}
        </p>
        <button
          className="bg-pink-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700"
          onClick={handleLearnMore}
        >
          {showMore ? "Show Less" : "Learn More"}
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
        <img
          src={PCOS}// Replace with your image URL
          alt="Doctor with kid"
          className="rounded-lg"
        />
        {/* Green Decorative Element */}
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8">
          <div className="w-15 h-15 md:w-16 md:h-16 bg-pink-800 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner1;

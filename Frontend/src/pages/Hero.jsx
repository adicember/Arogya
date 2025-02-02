import React, { useState } from "react";
import HeroImg from "../assets/try1.jpg";

const Hero = () => {
  // State to toggle between showing full and limited text
  const [isExpanded, setIsExpanded] = useState(false);

  // Full description text
  const fullText = `AROGYA is a health-focused application designed for early detection and diagnosis of Polycystic Ovary Syndrome (PCOS) using machine learning. Polycystic ovary syndrome (PCOS) is a common hormonal condition that affects women of reproductive age. It usually starts during adolescence, but symptoms may fluctuate over time. 
  
  PCOS can cause hormonal imbalances, irregular periods, excess androgen levels, and cysts in the ovaries. Irregular periods, usually with a lack of ovulation, can make it difficult to become pregnant. PCOS is a leading cause of infertility.
  
  PCOS is a chronic condition and cannot be cured. However, some symptoms can be improved through lifestyle changes, medications, and fertility treatments.
  
  The cause of PCOS is unknown but women with a family history or type 2 diabetes are at higher risk.`;

  // Shortened preview text
  const previewText = `AROGYA is a health-focused application designed for early detection and diagnosis of Polycystic Ovary Syndrome (PCOS) using machine learning. Polycystic ovary syndrome (PCOS) is a common hormonal condition that affects women of reproductive age...`;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${HeroImg})` }}>
      {/* Overlay to darken the background for text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center text-white px-6 sm:px-12">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
          Arogya
        </h1>

        {/* Subtitle with custom color */}

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span style={{ color: 'white' }}>PCOS</span>{" "}
          <span style={{ color: 'white' }}>Diagnosis</span>
        </h2>

        {/* Description text with Read More / Read Less functionality */}
        <p className="max-w-3xl mx-auto mb-8">
          {isExpanded ? fullText : previewText}
        </p>

        {/* Read More / Read Less Button with custom color */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-semibold py-2 px-4 rounded-full hover:bg-gray-300"
          style={{
            backgroundColor: '#661d35',
            color: 'white',
          }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default Hero;

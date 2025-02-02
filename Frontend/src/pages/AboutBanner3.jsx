// src/components/FeaturesPage.js
import React from "react";

const AboutBanner3 = () => {
  const features = [
    "Irregular or absent menstrual cycles",
    "Acne or oily skin",
    "Excessive hair growth (hirsutism), particularly on the face, chest, or back",
    "Darkened skin patches, particularly on the neck or underarms ",
    "Thinning hair or hair loss on the scalp",
    "Weight gain or difficulty losing weight",
    "Scalp hair thinning or male-pattern baldness",
    "Ovarian cysts visible on ultrasound",
    "Increased appetite or cravings for sugary foods, linked to insulin resistance.",
    " Bloating, constipation, or digestive irregularities related to hormonal imbalances.",
    " Persistent discomfort or pain in the lower abdomen, especially around ovulation or menstruation",
    "  Insomnia or obstructive sleep apnea, which is common in individuals with PCOS",
  ];

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20 flex flex-col items-center justify-center ">
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Symptoms of PCOS
        </h1>
        <p className="text-lg text-pink-800 font-semibold mb-10">
          PCOS symptoms vary and may include:
        </p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-2 text-gray-700"
          >
            <span className="text-pink-900 text-lg">→</span>
            <p className="text-l">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutBanner3;

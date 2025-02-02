// src/components/InfoCards.js
import React from "react";
import Hormonal from "../assets/Hormonal.jpeg";
import Insulin from "../assets/Insulin.jpeg";
import Genetics from "../assets/Genetics.jpeg";

const InfoCards = () => {
  const cards = [
    {
      title: "Hormonal Imbalances",
      description: "Get expert advice",
      icon: Hormonal,
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/polycystic-ovarian-syndrome-pcos",
    },
    {
      title: "Insulin Resistance",
      description: "Get expert advice",
      icon: Insulin,
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/polycystic-ovarian-syndrome-pcos",
    },
    {
      title: "Genetics",
      description: "Get expert advice",
      icon: Genetics,
      link: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/polycystic-ovarian-syndrome-pcos",
    },
  ];

  return (
    <div className="bg-pink-50 py-12 px-6 md:px-20">
      <h2 className="text-center text-3xl text-pink-900 md:text-4xl font-bold mb-8">
        What Causes PCOS?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-20 h-20 object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">
              {card.title}
            </h3>
            <p className="text-gray-600 mb-4 text-center">{card.description}</p>
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-800 font-semibold flex items-center justify-center"
            >
              {card.description} <span className="ml-1">&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;

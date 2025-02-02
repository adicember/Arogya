import React, { useState } from 'react';
import Pic1 from "../assets/try3.webp";
import Pic2 from "../assets/try2.jpg";
import Pic3 from "../assets/pic3.jpg";
import Pic4 from "../assets/banner5.png";

// Sample data array for each item in the gallery
const items = [
  {
    title: "Overview",
    description: "Polycystic ovary syndrome (PCOS) is a common hormonal condition that affects women of reproductive age. It usually starts during adolescence, but symptoms may fluctuate over time.PCOS can cause hormonal imbalances, irregular periods, excess androgen levels and cysts in the ovaries. Irregular periods, usually with a lack of ovulation, can make it difficult to become pregnant. PCOS is a leading cause of infertility. PCOS is a chronic condition and cannot be cured. However, some symptoms can be improved through lifestyle changes, medications and fertility treatments.The cause of PCOS is unknown but women with a family history or type 2 diabetes are at higher risk.",
    image: Pic1,
  },
  {
    title: "Scope Of Problem",
    description: "PCOS a significant public health problem and is one of the commonest hormonal disturbances affecting women of reproductive age. The condition affects an estimated 8–13% of women of reproductive age, and up to 70% of cases are undiagnosed.The prevalence of PCOS is higher among some ethnicities and these groups often experience more complications, in particular related to metabolic problems.The biological and psychological effects of PCOS, particularly those related to obesity, body image and infertility, can lead to mental health challenges and social stigma.",
    image: Pic2,
  },
  {
    title: "Awareness",
    description: "PCOS awareness is vital to help individuals recognize its symptoms—like irregular periods, excess hair growth, acne, and weight gain—that often go undiagnosed. Understanding that PCOS can lead to more serious health risks, such as diabetes and heart disease, encourages proactive health management. Awareness also highlights the impact on mental health, with many experiencing depression and anxiety, as well as potential fertility challenges. By promoting knowledge of lifestyle changes, medical treatments, and support options, PCOS awareness empowers people to take control of their health, seek early diagnosis, and build supportive communities that reduce stigma and misinformation.",
    image: Pic4,
  },
  {
    title: "WHO response",
    description: "WHO works with Member States and partners to address PCOS as part of its efforts to improve women’s health and reproductive well-being globally. WHO works with governmental and non-governmental partners to enhance public awareness related to PCOS, and to generate guidance to healthcare providers on how it can be identified and treated. In addition, WHO promotes research related to the most effective ways of preventing, diagnosing and treating infertility due to PCOS, and identifies the most important unanswered questions related to it.",
    image: Pic3,
  },

];

const Banner = () => {
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle function to expand or collapse description
  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto py-14 px-8">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold" style={{ color: '#862949' }}>Do You Want To Know More?</h1>
        <p className="mt-4 text-lg text-gray-600">Lets See what we can find.</p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2" >{item.title}</h2>

              {/* Description with Read More / Read Less */}
              <p className="text-gray-700 mb-4 flex-grow">
                {expandedItems[index] ? item.description : `${item.description.slice(0, 100)}...`}
              </p>

              {/* Read More / Read Less Button */}
              <button
                onClick={() => toggleExpand(index)}
                style={{ color: '#862949' }}
                className="font-semibold"
              >
                {expandedItems[index] ? "Read Less" : "Read More"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

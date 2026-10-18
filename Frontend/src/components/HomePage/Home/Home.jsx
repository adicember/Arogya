import React from "react";
import Hero from "../HeroPage/Hero";
import About from "../About/About";
import HowItWorks from "../Working/HowItWorks";
import Testimonial from "../Testimonial/Testimonial";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Testimonial />
    </>
  );
}

export default Home;

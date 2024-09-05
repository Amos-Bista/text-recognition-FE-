import React from "react";
import "../../src/index.css"; // Make sure to use the correct path
import HeroLanding from "../components/home/hero";

const Home = () => {
  return (
    <div className="bg-black">
      <HeroLanding/>
   </div>
  );
};

export default Home;

import React from "react";
import "../../src/index.css"; // Make sure to use the correct path

const Home = () => {
  return (
    <div className='relative h-screen bg-black'>
      <div className="absolute inset-0 z-0 zoom-background"></div> {/* Background image */}
      <div className="absolute inset-0 z-10 bg-black/50"></div> {/* Overlay */}
      <div className="relative z-20">Home</div>
    </div>
  );
};

export default Home;

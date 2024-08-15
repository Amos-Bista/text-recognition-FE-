import React from "react";
import "../../index.css";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

const HeroLanding = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Convert Image to text",
        "Convert Video to text",
        "Convert live video to text",
      ],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      cursorChar: "|",
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="relative h-screen px-10 bg-black lg:px-24">
      <div className="absolute inset-0 z-0 zoom-background"></div>
      <div className="absolute inset-0 z-1 bg-black/50"></div>
      <div className="relative text-xl font-bold text-white md:text-4xl lg:text-6xl z-2 top-[20rem]">
        <h1>Welcome</h1>
      </div>
      <div className="relative text-xl font-bold text-white md:text-6xl lg:text-8xl z-2 top-[20rem]">
        <span ref={el} />
      </div>
    </div>
  );
};

export default HeroLanding;

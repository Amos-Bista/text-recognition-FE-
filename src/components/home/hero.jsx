import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Box, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import "../../index.css"; // Assuming zoom effect is defined here
import { useNavigate } from "react-router-dom";

const HeroLanding = () => {
  const el = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome", "Convert", "Image To Text"],
      typeSpeed: 90,
      loop: true,
      loopCount: Infinity,
      cursorChar: "|",
    });
    return () => {
      typed.destroy();
    };
  }, []);

  const handleLearn = () => {
    navigate("/upload");
  };
  const handleSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="relative h-screen px-10 bg-black lg:px-24 w-[100vw] flex-col">
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="overflow-hidden ">
          <img src="/signin.jpeg" alt="B  ackground 1" />
        </div>
        <div className="overflow-hidden ">
          <img src="/logo192.png" alt="Background 2" />
        </div>
        <div className="overflow-hidden ">
          <img src="/logo512.png" alt="Background 3" />
        </div>
      </Carousel>
      <div className="absolute inset-0 z-1 bg-black/50"></div>
      <Box
        className="absolute z-2"
        sx={{
          top: {
            xs: "14rem", // For extra small screens (xs)
            md: "18rem", // For medium screens (md) and up
            sm: "12rem", // For small screens (sm)
          },
          left: "50%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="mt-4 text-xl font-bold text-white md:text-6xl lg:text-8xl">
          <span ref={el} />
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          position: "absolute",
          bottom: "20%",
          left: "20rem",
          width: "50rem",
        }}
      >
        <Button
          variant="contained"
          onClick={handleLearn}
          sx={{
            height: "4rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
            "@media (max-width:600px)": {
              height: "3rem",
              fontSize: "1rem",
            },
          }}
        >
          Upload Docs
        </Button>
        <Button
          variant="contained"
          onClick={handleSignin}
          sx={{
            height: "4rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
            "@media (max-width:600px)": {
              height: "3rem",
              fontSize: "1rem",
            },
          }}
        >
          Sign In{" "}
        </Button>
      </Box>
    </div>
  );
};

export default HeroLanding;

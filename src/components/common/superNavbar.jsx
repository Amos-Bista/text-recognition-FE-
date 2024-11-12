import React, { useState } from "react";
import ResponsiveMenu from "./responsivemenu"; // Ensure this is your responsive menu component
import { Box } from "@mui/material";

const SuperNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        width: isHovered ? "200px" : "80px",
        transition: "width 0.3s ease",
        overflow: "hidden",
        backgroundColor: "#1A1F1F",
        height: "100vh",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ResponsiveMenu />
      <Box
        sx={{
          display: isHovered ? "block" : "none", // Show navbar only when hovered
          position: "absolute", // Position it absolutely for better control
          top: 0,
          left: 0,
          right: 0,
          padding: "1rem", // Optional padding
        }}
      >
        {/* {SidebarData.map((item, index) => (
          <Box
            key={index}
            component="a"
            href={item.path}
            sx={{
              // marginX: "1.5rem",
              paddingY: "0.6rem",
              paddingLeft: "0.9rem",
              width: "10.5rem",
              borderRadius: "0.6rem",
              display: "flex",
              gap: "0.6rem",
              color: "#B4B9BF",
              alignItems: "center",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#182637",
                color: "skyblue",
                transform: "scale(1.06)",
              },
              cursor: "pointer",
            }}
          >
            {/* <Box sx={{ marginRight: "0.5rem" }}>{item.icon}</Box> */}

        {/* </Box> */}
        {/* ))}  */}
      </Box>
    </Box>
  );
};

export default SuperNavbar;

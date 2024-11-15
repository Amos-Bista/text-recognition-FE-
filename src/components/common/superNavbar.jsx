import React, { useState } from "react";
import ResponsiveMenu from "./responsivemenu"; // Ensure this is your responsive menu component
import { Box } from "@mui/material";

const SuperNavbar = ({ isHovered, setIsHovered, width }) => {
  return (
    <Box
      sx={{
        width: isHovered ? "200px" : "80px",
        transition: "width 0.3s ease",
        backgroundColor: "#1A1F1F",
        height: "100vh",
      }}
    >
      <ResponsiveMenu />
    </Box>
  );
};

export default SuperNavbar;

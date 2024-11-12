import React from "react";
import UploadForm from "../components/upload/uploadform";
import { Box } from "@mui/material";

const UploadPages = () => {
  // #1f2937"
  return (
    <Box
      sx={{
        // backgroundColor: theme.palette.mode === "dark" ? "white" : "#1f2937",
        // backgroundColor:  theme === "light"  ? "wihte" : 'blue',
        // backgroundColor: theme === "dark" ? "white" : "#1f2937",
        backgroundColor: "black",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UploadForm />
    </Box>
  );
};

export default UploadPages;

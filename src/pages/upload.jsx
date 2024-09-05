import React from "react";
import UploadForm from "../components/upload/uploadform";
import { Box } from "@mui/material";
import { useTheme } from "../App";

const UploadPages = () => {
  const theme = useTheme();
  // #1f2937"
  return (
    <Box
      sx={{
        // backgroundColor: theme.palette.mode === "dark" ? "white" : "#1f2937",
        // backgroundColor:  theme === "light"  ? "wihte" : 'blue',
        backgroundColor: theme === "dark" ? "white" : "#1f2937",
        minHeight: "100vh",
        paddingTop: "1rem",
      }}
    >
      <UploadForm />
    </Box>
  );
};

export default UploadPages;

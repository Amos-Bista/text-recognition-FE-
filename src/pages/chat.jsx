import React, { useState, useEffect, useRef } from "react";
import { Stack, Typography, CircularProgress, Box, Grid } from "@mui/material"; // Import CircularProgress
import Button from "@mui/material/Button";
import axios from "axios";
import SidebarSection from "../components/chat/sidebar-Section";
import ChatSection from "../components/chat/chat-Section";

function Chat() {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle sidebar state
  };
  return (
    <Box sx={{ height: "94vh", backgroundColor: "red" }}>
      <Grid container>
        <Grid
          item
          xs={isOpen ? 2 : 0.32}
          sx={{
            transition: "width 3s ease-in-out",
            backgroundColor: "071952",
          }}
        >
          <SidebarSection isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </Grid>
        <Grid
          item
          xs={isOpen ? 10 : 11.68}
          sx={{ transition: "width 3s ease-in-out" }}
        >
          <ChatSection />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;

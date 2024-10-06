import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SidebarSection from "../components/chat/sidebar-Section";
import ChatSection from "../components/chat/chat-Section";

function Chat() {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle sidebar state
  };

  return (
    <Box sx={{ height: "90vh" }}>
      <Grid container>
        <Grid
          item
          xs={isOpen ? 2 : 0.5} // Change width based on isOpen state
          sx={{
            transition: "width 9s ease-out", // Smooth transition for width
            backgroundColor: "#071952", // Fixed the hex color format
            overflow: "hidden", // Prevent overflow during transition
            width: isOpen ? "200px" : "40px", // Use fixed width values for smoother effect
          }}
        >
          <SidebarSection isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </Grid>
        <Grid
          item
          xs={isOpen ? 10 : 11.5} // Adjust based on sidebar state
          sx={{
            transition: "width 9s ease-in", // Keep it consistent with the sidebar
            overflow: "hidden", // Prevent overflow during transition
            width: isOpen ? "200px" : "40px", // Use fixed width values for smoother effect
          }}
        >
          <ChatSection />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;

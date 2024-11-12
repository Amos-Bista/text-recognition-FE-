import React from "react";
import { Box } from "@mui/material";
import ChatSection from "../components/chat/chatSection";

function Chat() {
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <ChatSection />
    </Box>
  );
}

export default Chat;

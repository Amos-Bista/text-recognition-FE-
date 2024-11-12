import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./pages/signin";
import About from "./pages/home";
import UploadPages from "./pages/upload";
import Chat from "./pages/chat";
import { ToastContainer } from "react-toastify";
import SignupForm from "./pages/signup";
import { Box } from "@mui/material";
import SuperNavbar from "./components/common/superNavbar";
import ChatSection from "./components/chat/chatSection";
// import LoginForm from "./components/common/siginForm";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Router>
        <div className={`flex items-center  align-middle w-[100vh] }`}>
          <SuperNavbar className="w-[5vw]" />
          <Box
            className="w-[95vw]
        "
          >
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/upload" element={<UploadPages />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/chat" element={<ChatSection />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </Box>
        </div>
        <ToastContainer />
      </Router>
    </Box>
  );
}

export default App;

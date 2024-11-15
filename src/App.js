import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  // Simulate authentication for demonstration
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };
  return (
    <Box sx={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Router>
        <div className={`flex  w-[100vh]`}>
          <Box>
            <SuperNavbar />
          </Box>
          <Box className="w-[95vw]">
            <Routes>
              <Route path="/" element={<About />} />
              {/* <Route
                path="/upload"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UploadPages />
                  </PrivateRoute>
                }
              /> */}
              <Route
                path="/signin"
                // /element={<SignInForm onSignIn={handleLogin} />}
                element={<SignInForm />}
              />
              <Route path="/upload" element={<UploadPages />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/chat" element={<ChatSection />} />
            </Routes>
          </Box>
        </div>
        <ToastContainer />
      </Router>
    </Box>
  );
}

export default App;

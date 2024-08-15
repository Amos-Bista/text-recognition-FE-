import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Home from "./pages/video";
import UploadForm from "./pages/uploadImage";
import SignInForm from "./pages/signin";
import About from "./pages/home";
import Video from "./pages/video";
// import LoginForm from "./components/common/siginForm";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
  }, [theme]);

  return (
    <Router>
      <div
        className={`flex-col items-center justify-center  align-middle ${
          theme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <Navbar useTheme={useTheme} />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/sigin" element={<SignInForm />} />
          <Route path="/video" element={<Video/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

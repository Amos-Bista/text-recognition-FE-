import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { useTheme } from "../App";
// import { useTheme } from "../../App"; // Import the useTheme hook

const SignInForm = () => {
  const { theme } = useTheme(); // Access the current theme
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        // paddingBottom: '12rem'
        alignItems: "center",
        backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6", // Tailwind's bg-gray-900 for dark mode, bg-gray-100 for light mode
        backgroundImage: theme === "dark" ? 'url("/signin.jpeg")' : "none", // Use the image as the background in dark mode
        backgroundSize: "cover", // Ensure the background covers the entire area
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "1rem", sm: "2rem", md: "3rem" }, // Adjust padding for different screen sizes
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              backgroundColor: theme === "dark" ? "rgba(55, 65, 81, 0.9)" : "#fff", // Semi-transparent background in dark mode, solid in light mode
              padding: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Adjust padding for different screen sizes
              borderRadius: "0.5rem",
              boxShadow:
                theme === "dark"
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.7)" // Darker shadow for dark mode
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // Lighter shadow for light mode
              maxWidth: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                marginBottom: "1.5rem",
                color: theme === "dark" ? "#f3f4f6" : "#374151", // Lighter text for dark mode, darker text for light mode
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
              }}
            >
              Welcome back!
            </Typography>
            <GoogleButton
              style={{ marginBottom: "1rem", width: "100%" }}
              onClick={() => {
                console.log("Google button clicked");
                // Add your Google login logic here
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                margin: "1.5rem 0",
                color: theme === "dark" ? "#9ca3af" : "#6b7280", // Lighter gray for dark mode, darker gray for light mode
              }}
            >
              or
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{
                  marginBottom: "1.25rem",
                  "& .MuiInputBase-input": {
                    color: theme === "dark" ? "#f3f4f6" : "#374151", // Text color inside the input
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "#9ca3af" : "#d1d5db", // Border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "#9ca3af" : "#6b7280", // Label color
                  },
                }}
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                sx={{
                  marginBottom: "1.25rem",
                  "& .MuiInputBase-input": {
                    color: theme === "dark" ? "#f3f4f6" : "#374151", // Text color inside the input
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "#9ca3af" : "#d1d5db", // Border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "#9ca3af" : "#6b7280", // Label color
                  },
                }}
                value={password}
                onChange={handlePasswordChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    sx={{
                      color: theme === "dark" ? "#9ca3af" : "#374151", // Checkbox color
                      "&.Mui-checked": {
                        color: theme === "dark" ? "#9ca3af" : "#374151", // Checked color
                      },
                    }}
                  />
                }
                label="Remember for 30 days"
                sx={{
                  color: theme === "dark" ? "#f3f4f6" : "#374151", // Label color
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: theme === "dark" ? "#111827" : "#1f2937", // Darker background for dark mode
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#374151" : "#111827", // Darker background on hover
                  },
                }}
                type="submit"
              >
                Log in
              </Button>
            </form>
            <Typography
              sx={{
                textAlign: "center",
                color: theme === "dark" ? "#9ca3af" : "#6b7280", // Lighter gray for dark mode, darker gray for light mode
              }}
            >
              Don't have an account? <a href="/">Sign up for free</a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;

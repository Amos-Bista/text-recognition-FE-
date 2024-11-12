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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useTheme } from "../../App"; // Import the useTheme hook

const SignInForm = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://10.10.10.108:5000/login", { username, password })
      .then((response) => console.log(response));
    toast.success("login Success");
    navigate("/chat");
  };
  const handleEmailChange = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
        backgroundImage: 'url("/signin.jpeg")', // Use the image as the background in dark mode
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
              backgroundColor: "rgba(55, 65, 81, 0.9)", // Semi-transparent background in dark mode, solid in light mode
              padding: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Adjust padding for different screen sizes
              borderRadius: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.7)", // Darker shadow for dark mode // Lighter shadow for light mode
              maxWidth: "100%",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                // fontSize: "20px",
                textAlign: "center",
                // margin: "1.5rem 0",
                color: "white", // Lighter gray for dark mode, darker gray for light mode
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                margin: "1.5rem 0",
                color: "white", // Lighter gray for dark mode, darker gray for light mode
              }}
            >
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{
                  marginBottom: "1.25rem",
                  "& .MuiInputBase-input": {
                    color: "white", // Text color inside the input
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // Label color
                  },
                }}
                value={username}
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
                    color: "white", // Text color inside the input
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // Label color
                  },
                }}
                value={password}
                onChange={handlePasswordChange}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: "#111827", // Darker background for dark mode
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#374151", // Darker background on hover
                  },
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </form>
            <Typography
              sx={{
                textAlign: "center",
                color: "#9ca3af", // Lighter gray for dark mode, darker gray for light mode
              }}
            >
              Don't have an account? <a href="/signup">Sign up for free</a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;

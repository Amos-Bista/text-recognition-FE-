import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if passwords match when either password or confirmPassword is updated
    if (name === "password" || name === "confirmPassword") {
      if (name === "confirmPassword" && value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else if (
        name === "password" &&
        formData.confirmPassword &&
        value !== formData.confirmPassword
      ) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:5000/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        toast.success("Registration Successful");
        navigate("/chat");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        toast.error(
          "Error registering user: " +
            (error.response?.data?.message || "Unknown error")
        );
      });
  };

  return (
    <Container
      maxWidth="50rem"
      sx={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "40rem",
          backgroundColor: "#1A1F1F",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "white" }}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Last Name Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Username Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Confirm Password Field with Error Display */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                  },
                }}
              />
            </Grid>

            {/* Sign Up Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Sign up
              </Button>
            </Grid>

            {/* Login Link */}
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2" sx={{ color: "white" }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: "#4CAF50" }}>
                  Sign In
                </a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;

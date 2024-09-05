import React, { useEffect } from "react";
import { Button, Paper, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "../../App"; // Import the useTheme hook
import axios from "axios"; // Import Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUploadCloud } from "react-icons/fi"; // Import upload icon
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import loading icon

const UploadForm = () => {
  const { theme } = useTheme(); // Access the current theme
  const [selectedFiles, setSelectedFiles] = React.useState([]); // Initialize as an array
  const [loading, setLoading] = React.useState(false); // Loading state
  const [convertedTexts, setConvertedTexts] = React.useState([]); // Store converted texts

  useEffect(() => {
    // Reset converted texts on component mount
    return () => {
      setConvertedTexts([]); // Clear the state when the component unmounts
    };
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // Save selected files in state
  };

  const handleButtonClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleConvertClick = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files before converting.");
      return;
    }
    setConvertedTexts([]); // Clear previous texts

    // Create FormData object
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file); // Append files to formData
    });

    setLoading(true); // Start loading

    // Send the formData to the backend
    axios
      .post("http://127.0.0.1:5000/api/convert-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        // Refresh the list of converted texts only if POST request is successful
        return axios.get("http://127.0.0.1:5000/api/converted-texts");
      })
      .then((response) => {
        setConvertedTexts([response.data.text]); // Update state with the latest text
        setLoading(false); // Stop loading
        toast.success("Upload successful!"); // Show success toast
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        toast.error("Upload failed. Please try again."); // Show error toast
        console.error("Upload failed:", error);
      });
  };

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Upload files
        </Typography>

        <Box
          sx={{
            border: "2px dashed #ccc",
            padding: 2,
            textAlign: "center",
            borderRadius: "4px",
            marginBottom: 2,
            width: "100%",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <Typography variant="body1">Drop your files here!</Typography>
          <Typography variant="body2" color="textSecondary">
            or click
          </Typography>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 1 }}
            onClick={handleButtonClick}
            disabled={loading} // Disable button when loading
            startIcon={
              loading ? (
                <AiOutlineLoading3Quarters
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                <FiUploadCloud />
              )
            }
          >
            {loading ? "Uploading..." : "Add files"}
          </Button>
        </Box>

        {/* Display selected images */}
        <Grid container spacing={2} sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
          {selectedFiles.map((file, index) => (
            <Grid item xs={12} sm={6} key={index} sx={{display: 'flex', justifyContent: 'center'}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: ' center',
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: theme === "dark" ? "#2d3748" : "#fff",
                  boxShadow: theme === "dark" ? 0 : 1,
                  border:
                    theme === "dark" ? "1px solid #444" : "1px solid #ccc",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          mt={3}
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleConvertClick}
            disabled={loading}
          >
            Convert Image
          </Button>
          <Button
            color="secondary"
            fullWidth
            sx={{ mt: { xs: 2, sm: 0 } }}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>

        {/* Display converted texts */}
        <Box sx={{ marginTop: 3, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Converted Text
          </Typography>
          {convertedTexts.length > 0 ? (
            <Typography
              variant="body1"
              sx={{
                backgroundColor: theme === "dark" ? "#2d3748" : "#f3f4f6",
                padding: 1,
                borderRadius: 1,
              }}
            >
              {convertedTexts[0]} {/* Display the latest converted text */}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No converted text yet.
            </Typography>
          )}
        </Box>

        {/* Toast container for displaying toast notifications */}
        <ToastContainer />

        {/* Add keyframes for spinning animation */}
        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </Paper>
    </Box>
  );
};

export default UploadForm;

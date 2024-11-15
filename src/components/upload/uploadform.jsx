import React, { useState } from "react";
import { Button, Paper, Typography, Box, Grid } from "@mui/material";
import axios from "axios"; // Import Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUploadCloud } from "react-icons/fi"; // Import upload icon
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import loading icon
import * as docx from "docx";
import { saveAs } from "file-saver"; // Import file-saver to save files

const UploadForm = () => {
  const [toggle, setToggle] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(false); // Loading state
  const [convertedTexts, setConvertedTexts] = useState([]); // Store converted texts
  const [showText, setShowText] = useState(false); // State to control text visibility

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      toast.error("Some files are not images and will be ignored.");
    }
    setSelectedFiles(validFiles); // Save valid files in state
  };

  const handleButtonClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleClearConvertedTexts = () => {
    axios
      .delete("http://127.0.0.1:5000/api/clear-texts")
      .then((response) => {
        setConvertedTexts([]); // Clear texts in the frontend state
      })
      .catch((error) => {
        console.error(
          "Clear texts failed:",
          error.response ? error.response.data : error.message
        ); // Log detailed error
      });
  };

  const handleConvertFilesClick = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files before converting.");
      return;
    }
    setConvertedTexts([]); // Clear previous texts
    setLoading(true); // Start loading

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file); // Append files to formData
    });
    handleClearConvertedTexts();

    axios
      .post("http://127.0.0.1:5000/api/convert-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        return axios.get("http://127.0.0.1:5000/api/converted-texts");
      })
      .then((response) => {
        console.log("Converted texts response data:", response.data); // Log the response
        setConvertedTexts(response.data.texts); // Update state with all texts
        setLoading(false); // Stop loading
        toast.success("Conversion successful!"); // Show success toast
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        toast.error("Conversion failed. Please try again."); // Show error toast
        console.error(
          "Conversion failed:",
          error.response ? error.response.data : error.message
        ); // Log detailed error
      });
  };

  const handleDownloadWord = () => {
    try {
      if (convertedTexts.length === 0) {
        toast.error("No converted texts available for download.");
        return;
      }

      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: convertedTexts.map(
              (textObj) =>
                new docx.Paragraph({
                  children: [new docx.TextRun(textObj || "No text available")],
                })
            ),
          },
        ],
      });
      setToggle("");
      docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "converted-texts.docx");
      });
    } catch (error) {
      console.error("Error in handleDownloadWord:", error);
    }
  };

  const handleViewTextClick = () => {
    setShowText(!showText); // Toggle text visibility
  };

  const handleClearFiles = () => {
    setSelectedFiles([]); // Clear selected files
    handleClearConvertedTexts();
  };

  return (
    <Box sx={{ backgroundColor: "black", padding: "2rem" }}>
      <Paper
        elevation={10}
        sx={{
          padding: 2,
          minWidth: "40rem",
          maxWidth: "60rem",
          // height: "20rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1f2937",
          color: "#fff",
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
            color: "#fff",
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
          {selectedFiles.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              sx={{ marginTop: 1 }}
              onClick={handleClearFiles}
              disabled={loading}
            >
              Clear Files
            </Button>
          )}
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
        >
          {selectedFiles.map((file, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
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
            onClick={handleConvertFilesClick}
            disabled={loading}
          >
            Convert Files
          </Button>
          <Button
            variant="contained"
            color="info"
            fullWidth
            sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}
            onClick={handleViewTextClick}
            disabled={loading}
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
            {showText ? "Hide Text" : "View Text"}
          </Button>
          {/* <Button
            color="secondary"
            fullWidth
            sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}
            // onClick={() => setSelectedFiles([])}
            onClick={handleDownloadWord}
            disabled={loading}
          >
            Download Word
          </Button> */}
        </Box>

        {showText && (
          <Box
            sx={{
              marginTop: 3,
              padding: 2,
              width: "100%",
              backgroundColor: "#1f2937",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h6">Converted Texts:</Typography>
            {convertedTexts.length > 0 ? (
              <>
                {convertedTexts.map((textObj, index) => (
                  <Typography key={index} variant="body2" sx={{ marginTop: 1 }}>
                    {textObj}
                  </Typography>
                ))}
                <Button
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleDownloadWord}
                  disabled={loading}
                >
                  Download Word
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No texts available
              </Typography>
            )}
          </Box>
        )}
      </Paper>
      <ToastContainer autoClose={3000} />
    </Box>
  );
};

export default UploadForm;

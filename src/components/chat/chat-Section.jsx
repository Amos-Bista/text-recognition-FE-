import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useTheme } from "../../App"; // Adjust the import path as necessary
import axios from "axios";
import { toast } from "react-toastify";
import * as docx from "docx";
import { saveAs } from "file-saver"; // Import file-saver to save files

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Changed to an array
  const [imagePreviews, setImagePreviews] = useState([]);
  const [convertedTexts, setConvertedTexts] = useState("amos");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [copiedText, setCopiedText] = useState([]);

  const handleSendMessage = () => {
    if (selectedFiles.length > 0) {
      setMessages((prev) => [...prev, "Sent image files"]);
    }
  };
  const upload = () => {
    setConvertedTexts([]);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    const uploadedFiles = files.map((file) => file.name).join(", ");
    setMessages((prev) => [...prev, `Uploaded files: ${uploadedFiles}`]);
    setSelectedFiles((prev) => [...prev, ...files]); // Store files
  };

  const handleClearImages = () => {
    handleClearConvertedTexts();
    setImagePreviews([]);
    setSelectedFiles([]); // Clear selected files as well
  };

  const themeStyles = {
    light: {
      backgroundColor: "linear-gradient(135deg, #ffffff, #f4f4f4)",
      color: "#000",
    },
    dark: {
      backgroundColor: "linear-gradient(135deg, #3B4D87, #6482AD)",
      color: "#fff",
    },
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
        setConvertedTexts((prev) => [...prev, ...response.data.texts]);
        setLoading(false);
        toast.success("Conversion successful!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Conversion failed. Please try again.");
        console.error(
          "Conversion failed:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const handleDownloadWord = () => {
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

    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "converted-texts.docx");
    });
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #e0e0e0",
        background: themeStyles[theme].backgroundColor,
        color: themeStyles[theme].color,
      }}
    >
      <Paper
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          padding: 2,
          background: themeStyles[theme].backgroundColor,
          color: themeStyles[theme].color,
        }}
      >
        <List>
          {/* {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg} />
            </ListItem>
          ))} */}
          {imagePreviews.map((src, index) => (
            <ListItem
              key={`image-${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid black",
                paddingBottom: "4rem",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                  padding: "2rem",
                }}
              >
                <Box
                  sx={{
                    padding: "2rem",
                    background: themeStyles[theme].backgroundColor,
                    color: themeStyles[theme].color,
                    borderRadius: "2rem",
                    display: "flex", // Added to contain the Avatar
                    justifyContent: "center", // Center Avatar
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={src}
                    alt={`Uploaded image ${index + 1}`}
                    sx={{
                      width: 680,
                      height: 190,
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: "50rem",
                    padding: "2rem",
                    background: themeStyles[theme].backgroundColor,
                    color: themeStyles[theme].color,
                  }}
                >
                  {convertedTexts[index] && ( // Check if there's converted text for this image
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {convertedTexts[index]} {/* Display converted text */}
                    </Typography>
                  )}

                  {convertedTexts.length > 0 && ( // Corrected condition to check length of convertedTexts
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        gap: "2rem",
                      }}
                    >
                      <Button
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleDownloadWord}
                        disabled={loading}
                      >
                        Download Word
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(convertedTexts[index]);
                          setCopiedText(convertedTexts[index]);
                        }}
                      >
                        Copy
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          value={convertedTexts}
          placeholder="Type a message..."
          onChange={(e) => setMessages((prev) => [...prev, e.target.value])}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          sx={{
            background: themeStyles[theme].backgroundColor,
            color: themeStyles[theme].color,
          }}
        />
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="image-upload"
          multiple // Allow multiple image uploads
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload" onClick={upload}>
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <Button variant="contained" onClick={handleConvertFilesClick}>
          Convert and Send
        </Button>
        <Button variant="outlined" onClick={handleClearImages}>
          Clear Images
        </Button>
      </Box>
    </Box>
  );
};

export default ChatSection;

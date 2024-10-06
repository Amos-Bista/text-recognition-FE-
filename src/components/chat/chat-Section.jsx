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
import ConvertedTextSection from "./convertedTextSection";
import { TbFileUpload } from "react-icons/tb";
import { Scale } from "@mui/icons-material";

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Changed to an array
  const [imagePreviews, setImagePreviews] = useState([]);
  const [convertedTexts, setConvertedTexts] = useState();
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
    handleConvertFilesClick();
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
      backgroundColor: "linear-gradient(135deg, #ffffff, #6482AD)",
      color: "#000",
    },
    dark: {
      backgroundColor: "linear-gradient(135deg, #3B4D87, #6482AD)",
      color: "#fff",
    },
  };

  const themeStyles1 = {
    light: {
      backgroundColor: "linear-gradient(135deg, #5982AD, #6482AD)",
      color: "#000",
    },
    dark: {
      backgroundColor: "linear-gradient(135deg, #1F3045, #2B3C52)",
      color: "#fff",
    },
  };
  const themeStyles2 = {
    light: {
      backgroundColor: "linear-gradient(135deg, #ffffff, #6482AD)",
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
          children: convertedTexts.flatMap((textObj) => {
            // Split the text into paragraphs and create a TextRun for each
            return textObj
              .split("\n") // Split text into lines based on newline characters
              .filter((line) => line.trim() !== "") // Ignore empty lines
              .map(
                (line) =>
                  new docx.Paragraph({
                    children: [new docx.TextRun(line || "No text available")],
                    alignment: docx.AlignmentType.LEFT, // Set the alignment here
                  })
              );
          }),
        },
      ],
    });

    // Generate and download the Word document
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "converted_texts.docx");
    });
  };
  const handleCopy = (index) => {
    navigator.clipboard
      .writeText(convertedTexts[index])
      .then(() => {
        setCopiedText(convertedTexts[index]); // Update state with copied text
        toast.success("Text Copied To Clipboard"); // Show success toast
      })
      .catch((error) => {
        toast.success("Text Copied To Clipboard"); // Show success toast
        console.error("Copy failed:", error);
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
      <Box
        sx={{
          flex: 1,
          mb: 2,
          padding: 2,
          background: themeStyles[theme].backgroundColor,
          color: themeStyles[theme].color,
          width: "100%",
          overflowY: "auto", // Ensures overflow is handled within the Paper
        }}
      >
        <List
          sx={{
            overflowY: "auto", // Enables scrolling for the list content
            maxHeight: "34rem", // Ensures the List height is restricted to the Paper's height
          }}
        >
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
                  flexDirection: "column",
                  justifyContent: "right",
                  padding: "2rem",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Box
                    sx={{
                      height: "4rem",
                      width: "10rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "12rem",
                      background: themeStyles1[theme].backgroundColor,
                      color: themeStyles[theme].color,
                    }}
                  >
                    <Typography variant="body2">Your Image</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Box
                    sx={{
                      paddingX: "1.5rem",
                      background: themeStyles1[theme].backgroundColor,
                      color: themeStyles[theme].color,
                      borderRadius: "2rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={src}
                      alt={`Uploaded image ${index + 1}`}
                      sx={{
                        width: "100%",
                        maxWidth: 480,
                        height: "auto",
                        maxHeight: 490,
                        "@media (max-width: 600px)": {
                          width: "90%",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              {convertedTexts.length > 0 && (
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "72rem",
                      paddingTop: "0",
                      overflow: "hidden",
                      borderRadius: "1rem",
                      background: themeStyles1[theme].backgroundColor,
                      color: themeStyles1[theme].color,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingX: "2rem",
                        justifyContent: "space-between",
                        background: themeStyles2[theme].backgroundColor,
                        color: themeStyles1[theme].color,
                      }}
                    >
                      <Box>
                        <Typography>Converted Text</Typography>
                      </Box>
                      <Box>
                        {convertedTexts.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "start",
                              gap: "2rem",
                            }}
                          >
                            <Button
                              color="primary"
                              fullWidth
                              onClick={handleDownloadWord}
                              disabled={loading}
                            >
                              Download Word
                            </Button>
                            <Button
                              color="secondary"
                              onClick={() => handleCopy(index)}
                            >
                              Copy
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    {convertedTexts[index] && (
                      <Box
                        sx={{
                          paddingX: "2rem",
                          paddingY: "2rem",
                          background: themeStyles1[theme].backgroundColor,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            marginTop: 1,
                            color: themeStyles2[theme].color,
                          }}
                        >
                          {convertedTexts[index]
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            padding: "1rem",
            paddingX: "4rem",
            borderRadius: "1rem",
            border: "1px solid #071952 ",
            width: "70rem",
            alignItems: "center",
          }}
        >
          <label htmlFor="image-upload" onClick={upload}>
            <TbFileUpload
              size={50}
              sx={{
                color: "white", // Set text color to white
                transition: "transform 0.3s ease", // Smooth transition for the scaling effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale up to 105% on hover
                },
              }}
              onClick={upload}
            />
          </label>
          <TextField
            variant="outlined"
            fullWidth
            value={convertedTexts}
            placeholder="Type a message..."
            onChange={(e) => setMessages((prev) => [...prev, e.target.value])}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            InputProps={{
              sx: {
                border: "none", // Remove border
                backgroundColor: "transparent", // Transparent background
                color: themeStyles[theme].color, // Custom text color from themeStyles
                // Additional styles
                "&:focus": {
                  border: "none", // Remove border on focus
                  backgroundColor: "transparent", // Keep transparent background on focus
                },
              },
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
    </Box>
  );
};

export default ChatSection;

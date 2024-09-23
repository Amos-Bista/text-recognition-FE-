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
} from "@mui/material";
import { useTheme } from "../../App"; // Adjust the import path as necessary

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const { theme } = useTheme(); // Get the current theme

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    // Optionally, you can also add a message for the uploaded files
    const uploadedFiles = files.map((file) => file.name).join(", ");
    setMessages((prev) => [...prev, `Uploaded files: ${uploadedFiles}`]);
  };

  const handleClearImages = () => {
    setImagePreviews([]);
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
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
          {imagePreviews.map((src, index) => (
            <ListItem key={`image-${index}`}>
              <Avatar
                variant="rounded"
                src={src}
                alt={`Uploaded image ${index + 1}`}
                sx={{ width: 1506, height: 356, marginRight: 1 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
        <Button variant="outlined" onClick={handleClearImages}>
          Clear Images
        </Button>
      </Box>
    </Box>
  );
};

export default ChatSection;

import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import * as docx from "docx";
import { saveAs } from "file-saver"; // Import file-saver to save files
import { RiImageCircleLine } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { MdHideImage, MdOutlineAutoDelete } from "react-icons/md";

const ChatSection = () => {
  const fileInputRef = useRef(null);
  const [sendImg, setSendImg] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Changed to an array
  const [imagePreviews, setImagePreviews] = useState([]);
  const [convertedTexts, setConvertedTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  React.useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(chatMessages)) || [];
    setChatMessages(savedMessages);
    console.log("chat message", chatMessages);
  }, []);

  // Save messages to local storage whenever chatMessages changes
  React.useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageSelection = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : []; // Convert FileList to array

    if (files.length === 0) {
      console.log("No files selected.");
      return;
    }

    // Update state for selected files
    setSelectedFiles(files);
    console.log("selectedFiles", selectedFiles);
    setHideImg(true);

    // Generate image previews using URL.createObjectURL
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews); // Update previews for display
  };

  React.useEffect(() => {
    return () => {
      imagePreviews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    };
  }, [imagePreviews]);

  const handleClearImages = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    } else {
      console.warn("File input element not found.");
    }
    handleClearConvertedTexts();
    setImagePreviews([]);
    setSelectedFiles([]); // Clear selected files as well
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
    console.log("handleConvertFilesClick");

    if (selectedFiles.length === 0) {
      toast.error("Please select files before converting.");
      return;
    }

    setConvertedTexts([]); // Clear previous texts
    setLoading(true);
    setSendImg(true);

    // Generate a unique ID for both messages
    const messageId = Date.now();

    // Add the image message to the chat
    // setChatMessages((prevMessages) => [...prevMessages, newImageMessage]);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    axios
      .delete("http://localhost:5000/api/clear-texts")
      .then(() => {
        return axios.post("http://localhost:5000/api/convert-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      })
      .then(() => {
        return axios.get("http://localhost:5000/api/converted-texts");
      })
      .then((response) => {
        const newConvertedTexts = response.data.texts; // Extract texts from the response

        setConvertedTexts((prev) => [...prev, ...response.data.texts]);

        const newMessage = {
          id: messageId,
          type: "both", // Indicates that the message contains both image and text
          image: {
            content: selectedFiles,
            timestamp: new Date().toISOString(),
          },
          text: {
            content: newConvertedTexts, // Placeholder for the text content
            timestamp: new Date().toISOString(),
          },
        };
        console.log("text inside submit", convertedTexts);
        setHideImg(false);

        // Add the text message to the chat (same ID as the image message)
        setChatMessages((prevMessages) => [
          ...prevMessages.filter((msg) => msg.id !== messageId), // Remove previous message with the same ID if any
          newMessage, // Ensure to keep the image message in chat
        ]);

        setLoading(false);
        toast.success("Conversion successful!");
      })
      .catch((error) => {
        setLoading(false);
        setSendImg(false);
        toast.error("Conversion failed. Please try again.");
        console.error(
          "Conversion failed:",
          error.response ? error.response.data : error.message
        );
      });
  };
  console.log("image", hideImg);

  console.log("chat", chatMessages);

  const handleDownloadWord = () => {
    if (convertedTexts.length === 0) {
      toast.error("No converted texts available for download.");
      return;
    }

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: convertedTexts.map((textObj) => {
            return new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: textObj || "No text available",
                  break: 1, // Adding a line break between each converted text entry
                }),
              ],
              alignment: docx.AlignmentType.LEFT,
            });
          }),
        },
      ],
    });

    docx.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, "converted_texts.docx");
      })
      .catch((error) => {
        toast.error("Failed to create Word document. Please try again.");
        console.error("Word document generation error:", error);
      });
  };

  // const handleDownload = () => {
  //   // Trigger download without interacting with a `toggle` function.
  //   fetch(fileUrl)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "file.docx";
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     })
  //     .catch((error) => console.error("Download error:", error));
  // };

  const handleCopy = (index) => {
    if (!convertedTexts || !convertedTexts[index]) {
      console.error("Invalid text or index");
      toast.error("No text to copy");
      return;
    }

    navigator.clipboard
      .writeText(convertedTexts[index])
      .then(() => {
        setCopiedText(convertedTexts[index]); // Update state with copied text
        toast.success("Text Copied To Clipboard"); // Show success toast
      })
      .catch((error) => {
        toast.error("Failed to copy text. Please try again."); // Show error toast
        console.error("Copy failed:", error);
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "screen",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #e0e0e0",
        background: "#3B4545",
        // color: themeStyles[theme].color,
      }}
    >
      <Box
        sx={{
          flex: 1,
          mb: 2,
          padding: 2,
          overflowY: "auto", // Ensures overflow is handled within the Paper
        }}
      >
        <List
          sx={{
            overflowY: "auto", // Enables scrolling for the list content
            maxHeight: "34rem", // Restricts list height
            display: "flex",
            flexDirection: "column-reverse", // Ensures new messages appear at the bottom
          }}
        >
          {/* Display welcome message if no messages exist */}
          {chatMessages.length === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "2rem",
              }}
            >
              <h1>Welcome</h1>
            </Box>
          )}

          {/* Map through chatMessage to display text and images */}
          {chatMessages
            .slice(0)
            .reverse()
            .map((message, index) => (
              <ListItem
                key={message.id || `message-${index}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid black",
                  paddingBottom: "4rem",
                  mb: 2,
                }}
              >
                {/* Display image if available */}
                {message.image.content?.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "12rem",
                        backgroundColor: "#1A1F1F",
                        color: "white",
                        padding: "0.5rem 1rem",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Your Image</Typography>
                    </Box>

                    {/* Display Image */}
                    <Avatar
                      variant="rounded"
                      src={URL.createObjectURL(message.image.content[0])}
                      alt={`Uploaded image ${index + 1}`}
                      sx={{
                        width: "100%",
                        maxWidth: 480,
                        height: "auto",
                        maxHeight: 490,
                        "@media (max-width: 600px)": {
                          width: "90%",
                        },
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                )}

                {/* Display text if available */}
                {message.text.content?.length > 0 && (
                  <Box
                    sx={{ width: "50rem", mt: 2 }}
                    // key={message.id || `message-${index}`}
                  >
                    <Box
                      sx={{
                        height: "auto",
                        backgroundColor: "#1A1F1F",
                        color: "white",
                        borderRadius: 2,
                        padding: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Converted Text</Typography>
                        <Button onClick={handleDownloadWord}>Download</Button>
                        <Button onClick={() => handleCopy(index)}>Copy</Button>
                      </Box>
                      {/* Display Converted Text */}
                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: 1,
                          color: "white",
                          whiteSpace: "pre-wrap", // Preserves line breaks
                        }}
                      >
                        {message.text.content.join("\n")}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
      {/* <Typography
        variant="body2"
        mutiline="true"
        sx={{
          marginTop: 1,
          color: "white",
        }}
      >
        {convertedTexts}
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // paddingY: "2rem",
          width: "100vw",
        }}
      >
        {/* <div>
          {imagePreviews?.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} />
          ))}
        </div> */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            paddingY: "1rem",
            paddingX: "2rem",
            borderRadius: "4rem",
            border: "1px solid #071952 ",
            alignItems: "center",
            backgroundColor: "#1A1F1F",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            // position: "relative",
          }}
        >
          <>
            {/* <input
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              id="image-upload"
              multiple // Allow multiple image uploads
              onChange={handleImageUpload}
            />
            <RiImageCircleLine
              size={50}
              color="white"
              sx={{
                color: "white", // Set text color to white
                transition: "transform 0.3s ease", // Smooth transition for the scaling effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale up to 105% on hover
                },
              }}
              onClick={handleOpenFileDialog}
              // onClick={handleImageUpload}
              // onClick={() => document.getElementById("image-upload").click()} // Trigger file input click
            /> */}
            <Box>
              {/* Hidden input field for selecting files */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                multiple // Allow multiple file selection
                onChange={handleImageSelection}
              />
              {/* Button to open file dialog */}
              <RiImageCircleLine
                size={50}
                color="white"
                sx={{
                  color: "white", // Set text color to white
                  transition: "transform 0.3s ease", // Smooth transition for the scaling effect
                  "&:hover": {
                    transform: "scale(1.05)", // Scale up to 105% on hover
                  },
                }}
                onClick={handleOpenFileDialog}
              />{" "}
              {/* Display selected images */}
            </Box>
          </>
          {hideImg && (
            <Box
              mt={2}
              display="flex"
              gap={2}
              flexWrap="wrap"
              // sx={{ position: "absolute" }}
            >
              {imagePreviews.map((src, index) => (
                <Avatar
                  key={index}
                  src={src}
                  alt={`Selected image ${index}`}
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              ))}
            </Box>
          )}
          <TextField
            variant="outlined"
            fullWidth
            // value={convertedTexts}
            placeholder="Type a message..."
            onChange={(e) => setMessages((prev) => [...prev, e.target.value])}
            // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            InputProps={{
              sx: {
                color: "white", // Custom text color
                backgroundColor: "transparent", // Transparent background
              },
              classes: {
                notchedOutline: "remove-border",
              },
            }}
            className="remove-border"
          />
          <style jsx>{`
            .remove-border .MuiOutlinedInput-notchedOutline {
              border: none; // Removes the border
            }
          `}</style>
          <TbSend color="white" size={52} onClick={handleConvertFilesClick} />
          <MdOutlineAutoDelete
            onClick={handleClearImages}
            color="white"
            size={52}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatSection;

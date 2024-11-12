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
import { MdOutlineAutoDelete } from "react-icons/md";

const ChatSection = () => {
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Changed to an array
  const [imagePreviews, setImagePreviews] = useState([]);
  const [convertedTexts, setConvertedTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState([]);

  const handleSendMessage = () => {
    if (selectedFiles.length > 0) {
      setMessages((prev) => [...prev, "Sent image files"]);
    }
  };
  // const upload = (event) => {
  //   // document.getElementById("fileInput").click();
  //   // handleImageUpload();
  //   // setConvertedTexts([]);
  //   handleConvertFilesClick();
  // };

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

    // Generate image previews using URL.createObjectURL
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews); // Update previews for display
  };

  React.useEffect(() => {
    return () => {
      imagePreviews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    };
  }, [imagePreviews]);
  // const handleImageSelection = (event) => {
  //   setSelectedFiles(event.target.files);
  // };

  // if (imageFiles.length > 0) {
  //   const newPreviews = imageFiles.map((file) => URL.createObjectURL(file)); // Create image previews
  //   setImagePreviews((prev) => [...prev, ...newPreviews]);
  // } else {
  //   toast.error("error");
  //   console.log("error");
  // }`

  const handleClearImages = () => {
    document.getElementById("fileInput").click();

    handleClearConvertedTexts();
    setImagePreviews([]);
    setSelectedFiles([]); // Clear selected files as well
  };

  // const themeStyles = {
  //     backgroundColor: "linear-gradient(135deg, #ffffff, #6482AD)",
  //     color: "#000",
  //   dark: {
  //     backgroundColor: "linear-gradient(135deg, #3B4D87, #6482AD)",
  //     color: "#fff",
  //   },
  // };

  // const themeStyles1 = {
  //   light: {
  //     backgroundColor: "linear-gradient(135deg, #5982AD, #6482AD)",
  //     color: "#000",
  //   },
  //   dark: {
  //     backgroundColor: "linear-gradient(135deg, #1F3045, #2B3C52)",
  //     color: "#fff",
  //   },
  // };
  // const themeStyles2 = {
  //   light: {
  //     backgroundColor: "linear-gradient(135deg, #ffffff, #6482AD)",
  //     color: "#000",
  //   },
  //   dark: {
  //     backgroundColor: "linear-gradient(135deg, #3B4D87, #6482AD)",
  //     color: "#fff",
  //   },
  // };

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

    // setConvertedTexts([]); // Clear previous texts
    setLoading(true); // Start loading

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file); // Append each selected file as 'file'
    });

    // const payload = {
    //   files: selectedFiles,
    // };
    axios
      .post("http://localhost:5000/api/convert-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        return axios.get("http://localhost:5000/api/converted-texts");
      })
      .then((response) => {
        setConvertedTexts((prev) => [...prev, ...response.data.texts]);
        // setImagePreviews([]);
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
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #e0e0e0",
        background: "#1A1F1F",
        // color: themeStyles[theme].color,
      }}
    >
      <Box
        sx={{
          flex: 1,
          mb: 2,
          padding: 2,
          // background: "black",
          // color: themeStyles[theme].color,
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
                      // background: themeStyles1.backgroundColor,
                      // color: themeStyles.color,
                      backgroundColor: "#1A1F1F",
                      color: "white",
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
                      color: "white",

                      // background: themeStyles1.backgroundColor,
                      // color: themeStyles.color,
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
              {convertedTexts && convertedTexts.lenght > 0 && (
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "72rem",
                      paddingTop: "0",
                      overflow: "hidden",
                      borderRadius: "1rem",
                      // background: themeStyles1.backgroundColor,
                      // color: themeStyles1.color,
                      // color: "white",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingX: "2rem",
                        justifyContent: "space-between",
                        // background: themeStyles2.backgroundColor,
                        // color: themeStyles1.color,
                        color: "white",
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: "" }}>
                          Converted Text
                        </Typography>
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
                          backgroundColor: "white",
                          // background: themeStyles1.backgroundColor,
                        }}
                      >
                        <Typography
                          variant="body2"
                          mutiline="true"
                          sx={{
                            marginTop: 1,
                            // color: themeStyles2.color,
                            color: "white",
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

      <Box sx={{ display: "flex", justifyContent: "center", paddingY: "2rem" }}>
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
            width: "50rem",
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
          <TextField
            variant="outlined"
            fullWidth
            value={convertedTexts}
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

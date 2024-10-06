import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "../../App"; // Adjust the import path
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SidebarSection = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme(); // Get the current theme

  const themeStyles = {
    light: {
      backgroundColor: "#6482AD",
      color: "#fff",
    },
    dark: {
      backgroundColor: "#071952",
      color: "#fff",
    },
  };

  return (
    <Box
      sx={{
        height: "91.5vh", // Combine both heights
        width: isOpen ? "20rem" : "10rem", // Adjust the expanded width
        overflow: "hidden",
        transition: "width 0.3s ease-in-out",
        ...themeStyles[theme],
      }}
    >
      <Button
        onClick={toggleSidebar}
        sx={{
          color: themeStyles[theme].color,
          display: "flex",
          alignItems: "center",
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <Box sx={{ padding: 2, display: isOpen ? "block" : "none" }}>
        <Typography variant="h6">Sidebar Title</Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
      </Box>
      {!isOpen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="caption" color="white">
            Open Sidebar
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SidebarSection;

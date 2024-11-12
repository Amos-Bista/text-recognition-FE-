import React from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SidebarSection = ({ isOpen, toggleSidebar }) => {
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
        height: "91.5vh",
        width: isOpen ? "20rem" : "10rem",
        overflow: "hidden",
        transition: "width 0.3s ease-in-out",
        ...themeStyles,
      }}
    >
      <Button
        onClick={toggleSidebar}
        sx={{
          color: themeStyles.color,
          display: "flex",
          alignItems: "right",
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
    </Box>
  );
};

export default SidebarSection;

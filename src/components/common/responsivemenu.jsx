import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdDesignServices, MdSettings } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiFillHome size={20} />,
  },
  {
    title: "Upload",
    path: "/upload",
    icon: <FaUser size={19} />,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <MdDesignServices size={19} />,
    subItems: [
      { title: "General Chat", path: "/chat/general" },
      { title: "Project Chat", path: "/chat/project" },
    ],
  },
  {
    title: "SignIn",
    path: "/signin",
    icon: <TbFileReport size={20} />,
  },
  {
    title: "Settings",
    path: "/admin/setting",
    icon: <MdSettings size={20} />,
  },
];

const ResponsiveMenu = ({ showMenu }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: showMenu ? "220px" : "80px",
        backgroundColor: "#1A1F1F",
        color: "#B4B9BF",
        transition: "width 0.3s ease",
        zIndex: 1000,
        padding: "1rem",
        overflow: "hidden",
        "&:hover": {
          width: "250px",
        },
      }}
    >
      <Stack mt={4}>
        {SidebarData.map((item, index) => (
          <Box
            key={index}
            component="a"
            href={item.path}
            sx={{
              // marginX: "1.5rem",
              paddingY: "0.6rem",
              paddingLeft: "0.9rem",
              width: "10.5rem",
              borderRadius: "0.6rem",
              display: "flex",
              gap: "1.6rem",
              color: "#B4B9BF",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#182637",
                color: "skyblue",
                transform: "scale(1.06)",
              },
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                minWidth: "24px",
                minHeight: "24px",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                transition: "opacity 0.3s",
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ResponsiveMenu;

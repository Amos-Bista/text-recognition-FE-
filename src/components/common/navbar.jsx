// import React, { useState } from "react";
// import ResponsiveMenu, { Navlinks } from "./responsivemenu";
// import { useTheme } from "../../App";
// import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
// import { AiFillHome } from "react-icons/ai";
// import { FaUser } from "react-icons/fa";
// import { MdDesignServices, MdSettings } from "react-icons/md";
// import { TbFileReport } from "react-icons/tb";
// import { Box, Stack, Typography, Collapse } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export const SidebarData = [
//   {
//     title: "Dashboard",
//     path: "/",
//     icon: <AiFillHome size={20} />,
//   },
//   {
//     title: "Upload",
//     path: "/upload",
//     icon: <FaUser size={19} />,
//   },
//   {
//     title: "Chat",
//     path: "/chat",
//     icon: <MdDesignServices size={19} />,
//     subItems: [
//       { title: "General Chat", path: "/chat/general" },
//       { title: "Project Chat", path: "/chat/project" },
//     ],
//   },
//   {
//     title: "SignIn",
//     path: "/signin",
//     icon: <TbFileReport size={20} />,
//   },
//   {
//     title: "Settings",
//     path: "/admin/setting",
//     icon: <MdSettings size={20} />,
//   },
// ];

// const Navbar = () => {
//   const { theme, setTheme } = useTheme();
//   const [showMenu, setShowMenu] = useState(false);
//   const [openIndex, setOpenIndex] = useState(null); // Track open index
//   const navigate = useNavigate();

//   const toggleMenu = () => setShowMenu(!showMenu);

//   const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         paddingY: "1.6rem",
//         paddingX: "1rem",
//         color: "#B4B9BF",
//         backgroundColor: "#1A1F1F",
//         height: "100vh",
//       }}
//     >
//       <Stack spacing={3}>
//         <Box
//           sx={{
//             display: "flex",
//             marginX: "auto",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
       
//         </Box>

//         <Box sx={{ marginX: "auto" }}>
//           {SidebarData.map((item, index) => (
//             <Box key={index}>
//               <Box
//                 component="a"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleToggle(index);
//                 }}
//                 sx={{
//                   paddingY: "0.6rem",
//                   paddingLeft: "0.9rem",
//                   width: "10.5rem",
//                   borderRadius: "0.6rem",
//                   display: "flex",
//                   gap: "0.6rem",
//                   color: "#B4B9BF",
//                   alignItems: "center",
//                   transition: "background-color 0.3s, color 0.3s",
//                   "&:hover": {
//                     backgroundColor: "#182637",
//                     color: "skyblue",
//                     transform: "scale(1.06)",
//                   },
//                   cursor: "pointer",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     padding: "0",
//                     width: "22px",
//                     height: "22px",
//                     transition: "transform 0.3s",
//                   }}
//                 >
//                   {item.icon}
//                 </Box>
//                 <Typography sx={{ fontSize: "14px", paddingTop: "1px" }}>
//                   {item.title}
//                 </Typography>
//               </Box>

//               {item.subItems && (
//                 <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
//                   <Stack spacing={1} sx={{ paddingLeft: "2rem" }}>
//                     {item.subItems.map((subItem, subIndex) => (
//                       <Box
//                         key={subIndex}
//                         component="a"
//                         href={subItem.path}
//                         sx={{
//                           display: "flex",
//                           gap: "0.5rem",
//                           color: "#B4B9BF",
//                           textDecoration: "none",
//                           "&:hover": {
//                             color: "skyblue",
//                           },
//                         }}
//                       >
//                         <Typography>{subItem.title}</Typography>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Collapse>
//               )}
//             </Box>
//           ))}
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default Navbar;

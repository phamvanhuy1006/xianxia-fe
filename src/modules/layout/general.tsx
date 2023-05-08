import { Box, CssBaseline } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
// import CustomizeAsideLeft from "./aside-left";
// import CustomizeHeader from "./header";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const generalLayout = ({ children }: GeneralLayoutProps) => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline />
      <CustomizeHeader
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <CustomizeAsideLeft
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose}
        isMobile={false}
      />
      <Main open={open}>
        <DrawerHeader />
        <Box>{children}</Box>
      </Main> */}
    </Box>
  );
};

export default generalLayout;

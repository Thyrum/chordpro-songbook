import InputSongbookUpload from "../inputs/songbook-upload";
import GoogleAuthButton from "../google/google-auth-button";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { Menu } from "@mui/icons-material";

const drawerWidth = 240;

function NavigationLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawerContent = useRef(<InputSongbookUpload />);

  const drawer = isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      sx={{
        display: "block",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      slotProps={{
        root: {
          keepMounted: true, // Better open performance on mobile.
        },
      }}
    >
      {drawerContent.current}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        display: "block",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      open
    >
      {drawerContent.current}
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChordPro Songbook
          </Typography>
          <GoogleAuthButton />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation drawer"
      >
        {drawer}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default NavigationLayout;

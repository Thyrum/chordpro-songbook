import GoogleAuthButton from "../login/google-auth-button";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Paper,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { Menu } from "@mui/icons-material";
import { NavigationContext } from "../../context/navigation-context";
import { DrawerContent } from "./drawer-content";

const drawerWidth = 250;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "hasDrawer",
})<{
  open?: boolean;
  hasDrawer?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  // transition: theme.transitions.create("margin", {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  marginLeft: 0,
  variants: [
    {
      props: ({ open, hasDrawer }) => !open && hasDrawer,
      style: {
        marginLeft: `-${drawerWidth}px`,
      },
    },
    {
      props: ({ open, hasDrawer }) => open && hasDrawer,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

function NavigationLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setDrawerOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setDrawerOpen(!drawerOpen);
    }
  };

  const drawerContent = useMemo(
    () => (
      <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {isMobile ? null : <Toolbar />}
        <DrawerContent />
      </Paper>
    ),
    [isMobile],
  );

  const drawer = useMemo(
    () =>
      isMobile ? (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            height: "100%",
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            height: "100%",
          }}
        >
          {drawerContent}
        </Drawer>
      ),
    [isMobile, drawerOpen, drawerContent],
  );

  return (
    <NavigationContext.Provider value={{ setDrawerOpen, isMobile }}>
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => ({ md: theme.zIndex.drawer + 1 }) }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
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
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar sx={{ flexGrow: 0 }} />
          <Main open={drawerOpen} hasDrawer={!isMobile}>
            {children}
          </Main>
        </Box>
      </Box>
    </NavigationContext.Provider>
  );
}

export default NavigationLayout;

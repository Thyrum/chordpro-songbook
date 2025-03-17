import { Google } from "@mui/icons-material";
import { useState } from "react";
import {
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";

function GoogleAuthButton() {
  const auth = useAuth();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {auth.isAuthenticated && (
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt={auth.user?.username}
                src={auth.user?.photo}
                slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                auth.signOut();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {!auth.isAuthenticated && (
        <Button
          endIcon={<Google />}
          onClick={() => auth.signIn("GOOGLE")}
          variant="contained"
        >
          Sign in
        </Button>
      )}
    </>
  );
}

export default GoogleAuthButton;

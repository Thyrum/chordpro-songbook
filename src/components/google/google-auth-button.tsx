import { Google } from "@mui/icons-material";
import { TokenResponse } from "@react-oauth/google";
import { useContext, useState } from "react";
import { GapiContext } from "./gapi-context";
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

export type Error = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

function GoogleAuthButton() {
  const { authenticate, profile, logout } = useContext(GapiContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(profile);
  return (
    <>
      {profile.name && (
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={profile.name} src={profile.photo} />
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
                logout();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {!profile.name && (
        <Button endIcon={<Google />} onClick={authenticate} variant="contained">
          Sign in
        </Button>
      )}
    </>
  );
}

export default GoogleAuthButton;

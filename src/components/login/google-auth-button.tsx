import { Google } from "@mui/icons-material";
import { TokenResponse } from "@react-oauth/google";
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
import { useGoogleAuthClient } from "../../hooks/use-google-auth-client";
import { useProfile } from "../../hooks/use-profile";

export type Error = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

function GoogleAuthButton() {
  const authClient = useGoogleAuthClient();
  const [profile] = useProfile();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                authClient.logout();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {!profile.name && (
        <Button
          endIcon={<Google />}
          onClick={authClient.authenticate}
          variant="contained"
        >
          Sign in
        </Button>
      )}
    </>
  );
}

export default GoogleAuthButton;

import InputSongbookUpload from "../inputs/songbook-upload";
import ModeSwitcher from "../inputs/mode-switcher";
import GoogleAuthButton from "../google/google-auth-button";
import { AppBar, Toolbar, Typography } from "@mui/material";

function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <InputSongbookUpload />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChordPro Songbook
        </Typography>
        <GoogleAuthButton />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

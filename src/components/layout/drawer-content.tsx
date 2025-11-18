import { Box, useTheme } from "@mui/material";
import { NewSongButton } from "../inputs/new-song";
import InputSongbookUpload from "../inputs/songbook-upload";
import { SongList } from "../song-list";

export function DrawerContent() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(1),
        gap: theme.spacing(1),
      }}
    >
      <SongList />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <InputSongbookUpload />
        <NewSongButton />
      </Box>
    </Box>
  );
}

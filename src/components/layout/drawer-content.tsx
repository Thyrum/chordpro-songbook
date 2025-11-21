import { Box } from "@mui/material";
import { NewSongButton } from "../inputs/new-song";
import InputSongbookUpload from "../inputs/songbook-upload";
import { SongList } from "../song-list";

export function DrawerContent() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 1,
        gap: 1,
        overflow: "hidden",
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

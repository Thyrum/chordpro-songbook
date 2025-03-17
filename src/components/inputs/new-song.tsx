import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { db } from "../../database/database";
import { useNavigate } from "react-router";

export function NewSongButton() {
  const navigate = useNavigate();

  async function newSong() {
    const songId = await db.songs.put({
      title: "",
      content: "",
      lastModified: Date.now(),
    });
    navigate(`/song/${songId}`);
  }

  return (
    <IconButton onClick={newSong}>
      <Add />
    </IconButton>
  );
}

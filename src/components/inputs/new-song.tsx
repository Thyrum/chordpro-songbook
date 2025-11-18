import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { db } from "../../database/database";
import { useNavigate } from "react-router";

export function NewSongButton() {
  const navigate = useNavigate();

  async function newSong() {
    console.log("Creating new song");
    const songId = await db.songContent.put({
      content: "",
    });
    await db.songMetadata.put({
      id: songId,
      title: "Untitled",
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

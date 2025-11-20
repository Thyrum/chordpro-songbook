import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { db } from "../../database/database";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { NavigationContext } from "../../context/navigation-context";

export function NewSongButton() {
  const navigate = useNavigate();
  const { isMobile, setDrawerOpen } = useContext(NavigationContext);

  async function newSong() {
    console.log("Creating new song");
    const songId = await db.songContent.put({
      content: "",
      lastModified: Date.now(),
    });
    await db.songMetadata.put({
      id: songId,
      title: "Untitled",
      artists: [],
    });
    navigate(`/song/${songId}`);
    if (isMobile) setDrawerOpen(false);
  }

  return (
    <Tooltip title="New Song">
      <IconButton onClick={newSong}>
        <Add />
      </IconButton>
    </Tooltip>
  );
}

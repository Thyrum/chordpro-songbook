import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import { List, ListItem, ListItemButton, Paper, useTheme } from "@mui/material";
import { Link, useParams } from "react-router";
import { useContext } from "react";
import { NavigationContext } from "../context/navigation-context";

export function SongList() {
  const songs = useLiveQuery(() => db.songs.toArray()) ?? [];
  const theme = useTheme();
  const { songId } = useParams();
  console.log("Got songs", songs);
  const { isMobile, setDrawerOpen } = useContext(NavigationContext);

  return (
    <Paper
      sx={{ margin: theme.spacing(1), flexGrow: 1, overflowY: "auto" }}
      variant="outlined"
    >
      <List dense={!isMobile}>
        {songs.map((song) => (
          <ListItemButton
            key={song.id}
            component={Link}
            to={`/song/${song.id}`}
            onClick={() => isMobile && setDrawerOpen(false)}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              display: "block",
            }}
            selected={songId !== undefined && Number(songId) === song.id}
            autoFocus={songId !== undefined && Number(songId) === song.id}
          >
            {song.id} - {song.title}
          </ListItemButton>
        ))}
        <ListItem></ListItem>
      </List>
    </Paper>
  );
}

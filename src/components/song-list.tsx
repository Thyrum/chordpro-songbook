import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import { List, ListItem, ListItemButton, Paper, useTheme } from "@mui/material";
import { Link, useParams } from "react-router";

export function SongList() {
  const songs = useLiveQuery(() => db.songs.toArray()) ?? [];
  const theme = useTheme();
  const { songId } = useParams();
  console.log("Got songId", songId);

  return (
    <Paper
      sx={{ margin: theme.spacing(1), overflow: "scroll" }}
      variant="outlined"
    >
      <List>
        {songs.map((song) => (
          <ListItemButton
            key={song.id}
            component={Link}
            to={`/song/${song.id}`}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              display: "block",
            }}
            selected={songId !== undefined && Number(songId) === song.id}
          >
            {song.id} - {song.title}
          </ListItemButton>
        ))}
        <ListItem></ListItem>
      </List>
    </Paper>
  );
}

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import { List, ListItemButton, Paper } from "@mui/material";
import { Link, useParams } from "react-router";
import { useEffect, useRef } from "react";

function scrollIntoViewIfNotVisible(
  container: HTMLElement,
  target: HTMLElement,
  options?: ScrollIntoViewOptions,
) {
  if (
    target.getBoundingClientRect().bottom >
      container.getBoundingClientRect().bottom ||
    target.getBoundingClientRect().top < container.getBoundingClientRect().top
  ) {
    target.scrollIntoView(options ?? { block: "nearest" });
  }
}

export function SongList() {
  const songs = useLiveQuery(() => db.songMetadata.toArray()) ?? [];
  const { songId } = useParams();
  console.log("Got songId", songId);

  const currentSongRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Scrolling into view", currentSongRef.current);
    if (currentSongRef.current && containerRef.current)
      scrollIntoViewIfNotVisible(
        containerRef.current!,
        currentSongRef.current!,
        { behavior: "smooth", block: "nearest" },
      );
  }, [songId]);

  return (
    <Paper sx={{ overflow: "scroll" }} variant="outlined" ref={containerRef}>
      <List disablePadding>
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
            ref={
              songId !== undefined && Number(songId) === song.id
                ? currentSongRef
                : null
            }
          >
            {song.id} - {song.title}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

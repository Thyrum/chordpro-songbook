import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { deleteSong } from "../hooks/song/util";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavigationContext } from "../context/navigation-context";

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
  const navigate = useNavigate();
  const { isMobile, setDrawerOpen } = useContext(NavigationContext);

  const currentSongRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSongRef.current && containerRef.current)
      scrollIntoViewIfNotVisible(
        containerRef.current!,
        currentSongRef.current!,
        { behavior: "smooth", block: "nearest" },
      );
  }, [songId]);

  return (
    <Paper
      sx={{ overflow: "scroll", flexGrow: 1 }}
      variant="outlined"
      ref={containerRef}
    >
      <List dense={!isMobile} disablePadding>
        {songs.map((song, index) => (
          <ListItem
            disablePadding
            key={song.id}
            secondaryAction={
              song.id !== Number(songId) ? null : (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = songs[index + 1]?.id
                      ? songs[index + 1].id
                      : songs[index - 1]?.id
                        ? songs[index - 1].id
                        : null;
                    navigate(targetId ? `/song/${targetId}` : "/");
                    void deleteSong(song.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
          >
            <ListItemButton
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
              onClick={() => isMobile && setDrawerOpen(false)}
            >
              {song.id} - {song.title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

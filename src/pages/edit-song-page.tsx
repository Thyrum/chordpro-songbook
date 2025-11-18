import { useNavigate, useParams } from "react-router";
import SongInput from "../components/inputs/song-input";
import { db } from "../database/database";
import { useEffect } from "react";

export function EditSongPage() {
  const { songId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    db.songMetadata.get(Number(songId)).then((metadata) => {
      if (!metadata) {
        navigate("/");
      }
    });
  }, [navigate, songId]);

  if (!songId) {
    return null;
  }

  return <SongInput songId={Number(songId)} />;
}

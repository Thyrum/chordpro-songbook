import { useParams } from "react-router";
import SongInput from "../components/inputs/song-input";

export function EditSongPage() {
  const { songId } = useParams();

  if (!songId) {
    return null;
  }

  return <SongInput songId={Number(songId)} />;
}

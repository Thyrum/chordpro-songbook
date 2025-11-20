import { Typography } from "@mui/material";
import SongMetadata from "../../database/entities/song-metadata";

export function SongMetadataView({ metadata }: { metadata: SongMetadata }) {
  return <Typography variant="h4">{metadata?.title}</Typography>;
}

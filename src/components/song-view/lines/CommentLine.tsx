import { Typography } from "@mui/material";
import { CommentLine } from "@models/lines";

export function CommentLineView({ line }: { line: CommentLine }) {
  return (
    <Typography variant="body1" color="textSecondary">
      {line.comment}
    </Typography>
  );
}

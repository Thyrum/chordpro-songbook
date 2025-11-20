import { CommentLine, Line, LyricsLine } from "../../../models/lines";
import { LineType } from "../../../models/lines/Line";
import { CommentLineView } from "./CommentLine";
import EmptyLineView from "./EmptyLine";
import { LyricsLineView } from "./LyricsLine";

export function LineView({ line }: { line: Line }) {
  switch (line.lineType) {
    case LineType.Empty:
      return <EmptyLineView />;
    case LineType.Lyrics:
      return <LyricsLineView line={line as LyricsLine} />;
    case LineType.Comment:
      return <CommentLineView line={line as CommentLine} />;
    default:
      return null;
  }
}

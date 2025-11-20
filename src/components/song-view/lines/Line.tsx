import { CommentLineView, EmptyLineView, LyricsLineView, TabLineView } from ".";
import { CommentLine, Line, LyricsLine, TabLine } from "../../../models/lines";
import { LineType } from "../../../models/lines/Line";

export function LineView({ line }: { line: Line }) {
  switch (line.lineType) {
    case LineType.Empty:
      return <EmptyLineView />;
    case LineType.Lyrics:
      return <LyricsLineView line={line as LyricsLine} />;
    case LineType.Comment:
      return <CommentLineView line={line as CommentLine} />;
    case LineType.Tabs:
      return <TabLineView line={line as TabLine} />;
    default:
      return null;
  }
}

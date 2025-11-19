export type TChord = string;

export type TChordSegment =
  | {
      chord?: TChord;
      text: string;
    }
  | {
      chord: TChord;
      text?: string;
    };

export type TChordLine = TChordSegment[];

export type TLyricsLine = string;

export type TSongLine = TChordLine | TLyricsLine;

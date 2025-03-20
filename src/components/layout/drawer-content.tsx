import { NewSongButton } from "../inputs/new-song";
import InputSongbookUpload from "../inputs/songbook-upload";
import { SongList } from "../song-list";

export function DrawerContent() {
  return (
    <>
      <SongList />
      <NewSongButton />
      <InputSongbookUpload />
    </>
  );
}

import { useLocalStorage } from "usehooks-ts";
import InputFileUpload from "./file-upload";

function InputSongbookUpload() {
  const [_, setSongbook] = useLocalStorage("songbook", "");

  async function saveFile(files: FileList | null) {
    if (files === null || files.length === 0) {
      return;
    }

    setSongbook(await files[0].text());
  }

  return (
    <InputFileUpload
      text="Upload songbook"
      accept=".cho,.crd,.chopro,.chord,.pro"
      onChange={saveFile}
    />
  );
}

export default InputSongbookUpload;

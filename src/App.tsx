import "./App.css";
import { Textarea, Typography } from "@mui/joy";
import { useLocalStorage } from "usehooks-ts";
import Toolbar from "./components/layout/toolbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [text, setText] = useLocalStorage("songbook", "");

  return (
    <>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Toolbar />
        <Typography level="h1">Chordpro Songbook</Typography>
        <Textarea
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;

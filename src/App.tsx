import "./App.css";
import { useLocalStorage } from "usehooks-ts";
import Toolbar from "./components/layout/toolbar";
import { GapiProvider } from "./components/google/gapi-provider";
import {
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const [text, setText] = useLocalStorage("songbook", "");

  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline />
      <GapiProvider>
        <Toolbar />
        <Typography variant="h1">Chordpro Songbook</Typography>
        <TextField
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          value={text}
          multiline
        />
      </GapiProvider>
    </ThemeProvider>
  );
}

export default App;

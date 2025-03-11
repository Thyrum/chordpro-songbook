import { useLocalStorage } from "usehooks-ts";
import { GapiProvider } from "./components/google/gapi-provider";
import {
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NavigationLayout from "./components/layout/navigation";

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
        <NavigationLayout>
          <TextField
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
            value={text}
            multiline
          />
        </NavigationLayout>
      </GapiProvider>
    </ThemeProvider>
  );
}

export default App;

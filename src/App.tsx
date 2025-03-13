import { GapiProvider } from "./components/providers/gapi-provider";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import SongInput from "./components/inputs/song-input";
import { SongProvider } from "./components/inputs/song/song-provider";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline />
      <GapiProvider>
        <NavigationLayout>
          <SongInput songId="test" />
        </NavigationLayout>
      </GapiProvider>
    </ThemeProvider>
  );
}

export default App;

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import SongInput from "./components/inputs/song-input";
import { FileApiProvider } from "./components/providers/file-api-provider";
import { ApiLoadedProvider } from "./components/providers/api-loaded-provider";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline />
      <ApiLoadedProvider>
        <NavigationLayout>
          <FileApiProvider>
            <SongInput songId="test" />
          </FileApiProvider>
        </NavigationLayout>
      </ApiLoadedProvider>
    </ThemeProvider>
  );
}

export default App;

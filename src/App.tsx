import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import SongInput from "./components/inputs/song-input";
import { FileApiProvider } from "./components/providers/file-api-provider";
import { AuthProvider } from "./context/auth/auth-provider";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline />
      <AuthProvider>
        <NavigationLayout>
          <FileApiProvider>
            <SongInput songId="test" />
          </FileApiProvider>
        </NavigationLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

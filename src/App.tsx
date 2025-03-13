import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import SongInput from "./components/inputs/song-input";
import { LoginProvider } from "./components/providers/login-provider";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} noSsr>
      <CssBaseline />
      <LoginProvider>
        <NavigationLayout>
          <SongInput songId="test" />
        </NavigationLayout>
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App;

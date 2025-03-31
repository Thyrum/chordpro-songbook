import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import { AuthProvider } from "./context/auth/auth-provider";
import { HashRouter, Route, Routes } from "react-router";
import { EditSongPage } from "./pages/edit-song-page";
import { NoSongPage } from "./pages/no-song-page";
import { DEV } from "./env-config";
import { useEffect } from "react";
import { FilesProvider } from "./context/files/files-provider";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  useEffect(() => {
    if (DEV) {
      import("eruda").then(({ default: eruda }) => eruda.init());
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme} noSsr>
        <CssBaseline enableColorScheme />
        <AuthProvider>
          <FilesProvider>
            <HashRouter>
              <Routes>
                <Route
                  path="/song/:songId"
                  element={
                    <NavigationLayout>
                      <EditSongPage />
                    </NavigationLayout>
                  }
                />
                <Route
                  path="/"
                  element={
                    <NavigationLayout>
                      <NoSongPage />
                    </NavigationLayout>
                  }
                />
              </Routes>
            </HashRouter>
          </FilesProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

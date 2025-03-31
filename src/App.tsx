import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import { FileApiProvider } from "./components/providers/file-api-provider";
import { AuthProvider } from "./context/auth/auth-provider";
import { HashRouter, Route, Routes } from "react-router";
import { EditSongPage } from "./pages/edit-song-page";
import { NoSongPage } from "./pages/no-song-page";
import { DEV } from "./env-config";
import { useEffect } from "react";
import { ABCEditor } from "./pages/abc-editor";

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
          <FileApiProvider>
            <HashRouter>
              <Routes>
                <Route
                  path="song/:songId"
                  element={
                    <NavigationLayout>
                      <EditSongPage />
                    </NavigationLayout>
                  }
                />
                <Route
                  index
                  element={
                    <NavigationLayout>
                      <NoSongPage />
                    </NavigationLayout>
                  }
                />
                <Route path="/tools">
                  <Route index element={<></>} />
                  <Route path="abceditor" element={<ABCEditor />} />
                </Route>
              </Routes>
            </HashRouter>
          </FileApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

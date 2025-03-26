import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavigationLayout from "./components/layout/navigation";
import { FileApiProvider } from "./components/providers/file-api-provider";
import { AuthProvider } from "./context/auth/auth-provider";
import { HashRouter, Route, Routes } from "react-router";
import { EditSongPage } from "./pages/edit-song-page";
import { NoSongPage } from "./pages/no-song-page";
import { lazy, Suspense } from "react";
import { DEV } from "./env-config";

console.log("DEV=", DEV);
const Eruda = DEV
  ? lazy(() => import("./components/scripts/Eruda"))
  : undefined;

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <>
      {Eruda && (
        <Suspense fallback={null}>
          <Eruda />
        </Suspense>
      )}
      <ThemeProvider theme={theme} noSsr>
        <CssBaseline enableColorScheme />
        <AuthProvider>
          <FileApiProvider>
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
          </FileApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

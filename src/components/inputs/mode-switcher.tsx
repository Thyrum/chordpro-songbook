import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { MenuItem, Select, useColorScheme } from "@mui/material";

function ModeSwitcher() {
  const { mode, setMode, systemMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const actualMode = mode === "system" ? systemMode : mode;

  return (
    <>
      {actualMode &&
        (mode === "light" ? <LightModeOutlined /> : <DarkModeOutlined />)}
      <Select
        value={mode}
        sx={{ width: 135 }}
        onChange={(event) => {
          setMode(event.target.value as "system" | "light" | "dark");
        }}
      >
        <MenuItem value="system">System</MenuItem>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </>
  );
}

export default ModeSwitcher;

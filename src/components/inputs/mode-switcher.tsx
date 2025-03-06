import { useColorScheme, Select, Option } from "@mui/joy";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

function ModeSwitcher() {
  const { mode, setMode, systemMode } = useColorScheme();

  const actualMode = mode === "system" ? systemMode : mode;

  return (
    <Select
      variant="soft"
      value={mode}
      sx={{ width: 135 }}
      onChange={(_, newMode) => {
        setMode(newMode);
      }}
      startDecorator={
        actualMode &&
        (mode === "light" ? <LightModeOutlined /> : <DarkModeOutlined />)
      }
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default ModeSwitcher;

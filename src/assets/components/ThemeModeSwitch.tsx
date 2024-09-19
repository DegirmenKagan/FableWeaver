import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";

const ThemeModeSwitch = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        minHeight: "56px",
      }}
    >
      <Select
        value={mode}
        onChange={(event) =>
          setMode(event.target.value as "system" | "light" | "dark")
        }
      >
        <MenuItem value="system">System</MenuItem>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </Box>
  );
};

export default ThemeModeSwitch;

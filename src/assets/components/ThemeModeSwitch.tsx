import { useColorScheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeModeSwitch = () => {
  const { mode, setMode } = useColorScheme();
  const handleButtonClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <IconButton sx={{ marginInline: 2 }} onClick={handleButtonClick}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
    // <Box
    //   sx={{
    //     display: "flex",
    //     width: "100%",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     bgcolor: "background.default",
    //     color: "text.primary",
    //     borderRadius: 1,
    //     p: 3,
    //     minHeight: "56px",
    //   }}
    // >
    //   <Select
    //     value={mode}
    //     onChange={(event) =>
    //       setMode(event.target.value as "system" | "light" | "dark")
    //     }
    //   >
    //     <MenuItem value="system">System</MenuItem>
    //     <MenuItem value="light">Light</MenuItem>
    //     <MenuItem value="dark">Dark</MenuItem>
    //   </Select>
    // </Box>
  );
};

export default ThemeModeSwitch;

import { useColorScheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
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
  );
};

export default ThemeModeSwitch;

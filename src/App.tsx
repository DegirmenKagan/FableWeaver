import ResponsiveAppBar from "./assets/components/ResponsiveAppBar";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { customTheme } from "./assets/components/Theme";
function App() {
  return (
    <div className="mainContainer">
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;

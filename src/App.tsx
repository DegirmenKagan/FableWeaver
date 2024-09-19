import ResponsiveAppBar from "./assets/components/ResponsiveAppBar";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./assets/components/Theme";
function App() {
  return (
    <div className="mainContainer">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;

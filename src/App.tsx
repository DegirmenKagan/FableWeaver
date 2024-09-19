import ResponsiveAppBar from "./assets/components/ResponsiveAppBar";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { customTheme } from "./assets/components/Theme";
import Home from "./assets/components/Home";

function App() {
  return (
    <div className="mainContainer">
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Container>
          <Home />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

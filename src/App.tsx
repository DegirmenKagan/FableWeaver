import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { customTheme } from "./assets/components/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./assets/pages/ErrorPage";
import ReadPage from "./assets/pages/ReadPage";
import CreatePage from "./assets/pages/CreatePage";
import Home from "./assets/components/Home";
import Layout from "./assets/pages/Layout";

function App() {
  function Root() {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/read/*" element={<ReadPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="mainContainer">
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { customTheme } from "./assets/components/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./assets/pages/ErrorPage";
import ReadPage from "./assets/pages/PaperPages/ReadPage";
import CreatePage from "./assets/pages/PaperPages/CreatePage";
import HomePage from "./assets/pages/HomePage";
import Layout from "./assets/pages/Layout";
import LibraryPage from "./assets/pages/LibraryPage/LibraryPage";

function App() {
  function Root() {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/read/:bookId" element={<ReadPage />} />
          <Route path="/create/:bookId" element={<CreatePage />} />
          <Route path="/library" element={<LibraryPage />} />
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

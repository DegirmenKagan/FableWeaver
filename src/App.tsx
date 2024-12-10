import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { customTheme } from "./assets/components/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./assets/pages/ErrorPage";
import ReadPage from "./assets/pages/PaperPages/ReadPage";
import HomePage from "./assets/pages/HomePage";
import Layout from "./assets/pages/Layout";
import LibraryPage from "./assets/pages/LibraryPage/LibraryPage";
import BookPage from "./assets/pages/BookPage/BookPage";
import ProfilePage from "./assets/pages/ProfilePage/ProfilePage";
import { ProfileProvider } from "./assets/contexts/ProfileContext";
import SettingPage from "./assets/pages/SettingPage/SettingPage";

function App() {
  function Root() {
    return (
      <ProfileProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/read/:bookId" element={<ReadPage />} />
            <Route path="/create/:bookId" element={<ReadPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/book/:bookId" element={<BookPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ProfileProvider>
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

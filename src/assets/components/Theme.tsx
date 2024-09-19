import { createTheme } from "@mui/material/styles";

// Define your custom theme
export const customTheme = createTheme({
  colorSchemes: {
    dark: true,
  },

  palette: {
    primary: {
      main: "#8b5e3c", // A warm brown for a cozy, vintage feel
    },
    secondary: {
      main: "#d4a373", // Muted amber for highlights or interactive elements
    },
    background: {
      default: "#f2ede3", // Light beige background for less eye strain
      paper: "#f9f5ec", // Slightly off-white for reading surfaces
    },
    text: {
      primary: "#4a4a4a", // Dark grey for text to avoid harsh contrast
      secondary: "#7a7a7a", // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: "'Merriweather', serif", // A serif font for better readability in long texts
    h1: {
      fontFamily: "'Playfair Display', serif", // Elegant serif font for headers
      fontSize: "2.2rem",
      fontWeight: 700,
      color: "#4a4a4a",
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#4a4a4a",
    },
    body1: {
      fontFamily: "'Merriweather', serif",
      fontSize: "1.1rem",
      lineHeight: 1.75, // Increased line-height for readability
      color: "#4a4a4a",
    },
    body2: {
      fontFamily: "'Merriweather', serif",
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#7a7a7a", // Secondary text for less important content
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "10px 20px",
          textTransform: "none", // Keep button text in normal case
        },
      },
    },
  },
});

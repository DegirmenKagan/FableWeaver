import "./ReadPage.css";
import React, { useState } from "react";
import { Box, Button, List, Typography, Paper, ListItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { styled } from "@mui/material/styles";
import { FormatBold } from "@mui/icons-material";

// Dummy chapters for the chapter tree
const chapters = [
  { id: 1, title: "Chapter 1: Introduction" },
  { id: 2, title: "Chapter 2: The Journey" },
  { id: 3, title: "Chapter 3: Challenges Ahead" },
  { id: 4, title: "Chapter 4: The Climax" },
];

// Dummy text content for the book
const textContent = [
  "This is the first page of the book. It's all about setting the scene...",
  "The journey begins with the main character stepping into the unknown...",
  "Challenges emerge, testing the character's strength and resolve...",
  "Finally, the climax reveals the hidden truth that changes everything...",
];

// Styled paper for reading content
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: "400px",
  maxHeight: "600px",
  overflowY: "auto",
  fontSize: "1.2rem",
  lineHeight: "1.75",
  textAlign: "justify",
}));

const ReadPage = () => {
  // State to manage the current page and underlined text
  const [currentPage, setCurrentPage] = useState(0);
  const [underlined, setUnderlined] = useState(false);
  const [bold, setBold] = useState(false);

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < textContent.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle underline feature
  const toggleUnderline = () => {
    setUnderlined(!underlined);
  };

  const toggleBold = () => {
    setBold(!bold);
  };

  const handleChapterClick = (chapterId: number) => {
    setCurrentPage(chapterId - 1);
  };

  return (
    <Box display="flex" width="100%" height="100vh" p={2}>
      {/* Chapter Tree (Left Sidebar) */}
      <Box flex="1" pr={2}>
        <Typography variant="h4" gutterBottom>
          Chapters
        </Typography>
        <List>
          {chapters.map((chapter) => (
            <ListItem
              className="chapterListItem"
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              style={{
                backgroundColor:
                  currentPage === chapter.id - 1 ? "lightgray" : undefined,
              }}
            >
              {chapter.title}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Text Reader (Middle Section) */}
      <Box flex="2" px={2}>
        <StyledPaper>
          <Typography
            variant="body1"
            component="p"
            style={{
              textDecoration: underlined ? "underline" : bold ? "bold" : "none",
            }}
          >
            {textContent[currentPage]}
          </Typography>
        </StyledPaper>
      </Box>

      {/* Page Controls (Right Sidebar) */}
      <Box flex="1" pl={2}>
        <Typography variant="h6" gutterBottom>
          Page Controls
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextPage}
            disabled={currentPage === textContent.length - 1}
          >
            Next
          </Button>
          <Button
            variant="outlined"
            startIcon={<FormatUnderlinedIcon />}
            onClick={toggleUnderline}
            color={underlined ? "secondary" : "primary"}
          >
            {underlined ? "Remove Underline" : "Underline Text"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FormatBold />}
            onClick={toggleBold}
            color={bold ? "secondary" : "primary"}
          >
            {bold ? "Remove Bold" : "Bold Text"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReadPage;

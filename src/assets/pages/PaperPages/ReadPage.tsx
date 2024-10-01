import "./ReadPage.css";
import { useEffect, useState } from "react";
import { Box, Button, List, Typography, ListItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor";
import { useParams } from "react-router-dom";
import { Book } from "../../types/types";
import {
  chapters,
  doGetBook,
  emptyBook,
  handleChapterClick,
  handleNextPage,
  handlePrevPage,
} from "./PaperPage.functions";
import { StyledPaper } from "../../components/StyledPaper";

const ReadPage = () => {
  // State to manage the current page and underlined text

  const [currentPage, setCurrentPage] = useState(0);
  const [markdown, setMarkdown] = useState<string>(chapters[0]?.content);
  const { bookId } = useParams();

  const [book, setBook] = useState<Book>(emptyBook);

  useEffect(() => {
    if (currentPage >= 0 && currentPage < chapters.length) {
      setMarkdown("-1");
      //wait 1 seconds
      setTimeout(() => {
        console.log(
          "Current Page: ",
          currentPage,
          chapters[currentPage].content
        );
        setMarkdown(chapters[currentPage].content);
      }, 50);
    }
  }, [currentPage]);

  // Effect to set initial content on mount
  useEffect(() => {
    if (markdown !== "-1") {
      chapters[currentPage ?? 0].content = markdown;
    }
  }, [markdown]); // Only run once on mount

  useEffect(() => {
    if (bookId) {
      const validId = parseInt(bookId);
      if (validId > 0) {
        doGetBook(validId, setBook);
      }
    }
  }, [bookId]);

  return (
    <Box display="flex" width="100%" height="100vh" p={2}>
      <Typography variant="h4" gutterBottom>
        {}
      </Typography>
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
              onClick={() => handleChapterClick(chapter.id, setCurrentPage)}
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
          {markdown !== "-1" ? (
            <MDXEditor
              markdown={markdown}
              onChange={(value) => setMarkdown(value)}
              readOnly
            />
          ) : (
            <></>
          )}
        </StyledPaper>
      </Box>

      {/* Page Controls (Right Sidebar) */}
      <Box flex="1" pl={2}>
        <Typography variant="h6" gutterBottom>
          Ads and Controls
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => handlePrevPage(currentPage, setCurrentPage)}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            onClick={() =>
              handleNextPage(currentPage, setCurrentPage, chapters)
            }
            disabled={currentPage === markdown.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReadPage;

import "./ReadPage.css";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, List, Typography, Paper, ListItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { styled } from "@mui/material/styles";
import { FormatBold } from "@mui/icons-material";
import "@mdxeditor/editor/style.css";
import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

// Dummy chapters for the chapter tree
const chapters = [
  {
    id: 1,
    title: "Chapter 1: Introduction",
    content: "This is the first chapter",
  },
  {
    id: 2,
    title: "Chapter 2: The Journey",
    content: "This is the second chapter",
  },
  {
    id: 3,
    title: "Chapter 3: Challenges Ahead",
    content: "This is the third chapter",
  },
  {
    id: 4,
    title: "Chapter 4: The Climax",
    content: "This is the fourth chapter",
  },
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
  const editorRef = useRef<MDXEditorMethods | null>(null); // Ref for the editor methods

  const [currentPage, setCurrentPage] = useState(0);
  const [underlined, setUnderlined] = useState(false);
  const [bold, setBold] = useState(false);
  const [markdown, setMarkdown] = useState<string>(chapters[0]?.content);

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < chapters.length - 1) {
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
          {markdown !== "-1" ? (
            <MDXEditor
              markdown={markdown}
              onChange={(value) => setMarkdown(value)}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                    </>
                  ),
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
              ]}
            />
          ) : (
            <></>
          )}
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
            disabled={currentPage === markdown.length - 1}
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

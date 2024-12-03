import "./ReadPage.css";
import { useEffect, useState } from "react";
import { Box, Button, List, Typography, ListItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Delete, Edit, NoteAdd, Save } from "@mui/icons-material";
import "@mdxeditor/editor/style.css";
import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { Book } from "../../types/types";
import { useParams } from "react-router-dom";
import {
  chapters,
  doSaveBook,
  emptyBook,
  handleChapterClick,
  handleDeletePage,
  handleEdit,
  handleNewPage,
  handleNextPage,
  handlePrevPage,
} from "./PaperPage.functions";
import { StyledPaper } from "../../components/StyledPaper";
import { doGetBook } from "../BookPage/BookPage.functions";

const CreatePage = () => {
  // State to manage the current page and underlined text

  const { bookId } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [markdown, setMarkdown] = useState<string>(chapters[0]?.content);
  const [editMode, setEditMode] = useState<number>(0);
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
            editMode === 1 ? (
              <MDXEditor
                markdown={markdown}
                onChange={(value) => setMarkdown(value)}
                plugins={[
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <Box sx={{ flex: 1 }}></Box>
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
            ) : editMode === 0 ? (
              <MDXEditor
                markdown={markdown}
                onChange={(value) => setMarkdown(value)}
                readOnly
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </StyledPaper>
      </Box>

      {/* Page Controls (Right Sidebar) */}
      <Box flex="1" pl={2}>
        <Typography variant="h6" gutterBottom>
          Empty Space
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
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => handleEdit(editMode, setEditMode, currentPage)}
            // disabled={} if user is not an editor
          >
            Edit
          </Button>
          <Button
            variant="contained"
            startIcon={<NoteAdd />}
            onClick={() => handleNewPage(book.id, chapters, setCurrentPage)}
            disabled={editMode === 0} // add the "if user is not an editor"
          >
            Add Page
          </Button>
          <Button
            variant="contained"
            startIcon={<Delete />}
            onClick={() =>
              handleDeletePage(chapters, currentPage, setCurrentPage)
            }
            disabled={editMode === 0 || chapters.length <= 1} // add the "if user is not an editor"
          >
            Delete Page
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={() => doSaveBook(book)}
            disabled={editMode === 0 || chapters.length <= 1} // add the "if user is not an editor"
          >
            Save Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePage;

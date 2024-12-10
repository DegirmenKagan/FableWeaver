import "./ReadPage.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  Typography,
  ListItem,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";

import "@mdxeditor/editor/style.css";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ButtonWithTooltip,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { useLocation, useParams } from "react-router-dom";
import { BookChapter } from "../../types/types";
import {
  doGetBookChaptersByBookId,
  handleChapterClick,
  handleDeletePage,
  handleEdit,
  handleNewMarkdown,
  handleNewPage,
  handleNextPage,
  handlePrevPage,
} from "./PaperPage.functions";
import { StyledPaper } from "../../components/StyledPaper";
import { Delete, Edit, NoteAdd, Save } from "@mui/icons-material";

const ReadPage = () => {
  // State to manage the current page and underlined text

  const [currentPage, setCurrentPage] = useState(-1);
  const [markdown, setMarkdown] = useState<string>(""); // chapters[0]?.content
  const { bookId } = useParams();
  //get route from url
  const location = useLocation();

  const [chapters, setChapters] = useState<BookChapter[]>([]);
  const [isReadPage, setIsReadPage] = useState<boolean>(true);

  const [editMode, setEditMode] = useState<number>(0);
  const [validBookId, setValidBookId] = useState<number>(0);

  useEffect(() => {
    if (currentPage >= 0 && currentPage < chapters.length) {
      setMarkdown("");
      // wait 1 seconds
      setTimeout(() => {
        handleNewMarkdown(chapters, currentPage, setMarkdown);
      }, 25);
    }
  }, [currentPage]);

  // Effect to set initial content on mount
  useEffect(() => {
    if (chapters.length > 0 && markdown !== "" && currentPage >= 0) {
      setMarkdown(chapters[currentPage ?? 0].content);
      console.log(chapters, markdown, currentPage);
    }
  }, [chapters]); // Only run once on mount

  useEffect(() => {
    if (bookId) {
      const _validId = parseInt(bookId);
      if (_validId > 0) {
        setValidBookId(_validId);
        doGetBookChaptersByBookId(_validId, setChapters, setCurrentPage);
        console.log(_validId, chapters, currentPage);
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (location) {
      setIsReadPage(location.pathname.split("/").includes("read"));
    }
  }, [location]);

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
          {markdown === "" ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : isReadPage || editMode === 0 ? (
            <MDXEditor
              markdown={markdown}
              readOnly
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
              ]}
            />
          ) : (
            <MDXEditor
              markdown={markdown}
              onChange={(value) => setMarkdown(value)}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                      <ButtonWithTooltip
                        title="Save Button"
                        onClick={() =>
                          console.log("Custom Button Clicked!", markdown)
                        }
                      >
                        <SaveIcon sx={{ width: 20 }} />
                      </ButtonWithTooltip>
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
          )}
        </StyledPaper>
      </Box>

      {/* Page Controls (Right Sidebar) */}
      <Box flex="1" pl={2}>
        {/* <Typography variant="h6" gutterBottom>
           Empty Space 
        </Typography> */}
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
            disabled={currentPage === chapters.length - 1}
          >
            Next
          </Button>
          {isReadPage ? (
            <></>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleEdit(editMode, setEditMode)}
                // disabled={} if user is not an editor
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<NoteAdd />}
                onClick={() =>
                  handleNewPage(validBookId, chapters, setCurrentPage)
                }
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
                // onClick={() => doSaveBook(book)}
                disabled={editMode === 0 || chapters.length <= 1} // add the "if user is not an editor"
              >
                Save Book
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReadPage;

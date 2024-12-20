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
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";

import CallSplitIcon from "@mui/icons-material/CallSplit";
import "@mdxeditor/editor/style.css";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
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
import { BookChapter, BookDirection } from "../../types/types";
import {
  checkUnsavedChapterChanges,
  doGetBookChaptersByBookId,
  doGetBookDirectionByBookId,
  handleChapterClick,
  handleDeleteChapter,
  handleNewMarkdown,
  handleNextChapter,
  handlePrevChapter,
  handleSaveChapter,
} from "./PaperPage.functions";
import { StyledPaper } from "../../components/StyledPaper";
import { Delete, NoteAdd, Save } from "@mui/icons-material";
import NewChapterDialog from "./NewChapterDialog";
import MessageDialog from "../../components/MessageDialog";
import DirectionDialog from "./DirectionDialog";

const ReadPage = () => {
  // State to manage the current page and underlined text

  const [currentPage, setCurrentPage] = useState(-1);
  const [markdown, setMarkdown] = useState<string>(""); // chapters[0]?.content
  const { bookId } = useParams();
  //get route from url
  const location = useLocation();

  const [chapters, setChapters] = useState<BookChapter[]>([]);
  const [isReadPage, setIsReadPage] = useState<boolean>(true);

  const [validBookId, setValidBookId] = useState<number>(0);

  const [newChapterDialogVisible, setNewChapterDialogVisible] =
    useState<boolean>(false);
  const [directionDialogVisible, setDirectionDialogVisible] =
    useState<boolean>(false);
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);

  const [isNext, setIsNext] = useState<boolean>(false);

  const [bookDirectionList, setBookDirectionList] = useState<BookDirection[]>(
    []
  );
  const [currentBookDirection, setCurrentBookDirection] =
    useState<BookDirection>({
      id: 0,
      bookId: 0,
      chapterId: 0,
    });

  useEffect(() => {
    if (currentPage >= 0 && currentPage < chapters.length) {
      setMarkdown("");
      // wait 1 seconds
      setTimeout(() => {
        handleNewMarkdown(chapters, currentPage, setMarkdown);
      }, 25);
      const tmpCurDir = bookDirectionList.find(
        (x) => x.chapterId === chapters[currentPage].id
      );
      if (tmpCurDir) {
        console.log("setCurrentBookDirection", tmpCurDir);
        setCurrentBookDirection(tmpCurDir);
      }
    }
  }, [currentPage]);

  // Effect to set initial content on mount
  useEffect(() => {
    if (chapters.length > 0 && markdown !== "" && currentPage >= 0) {
      setMarkdown(chapters[currentPage ?? 0].content);
    }
  }, [chapters]); // Only run once on mount

  useEffect(() => {
    if (bookId) {
      const _validId = parseInt(bookId);
      if (_validId > 0) {
        setValidBookId(_validId);
        doGetBookChaptersByBookId(_validId, setChapters, setCurrentPage);
        doGetBookDirectionByBookId(_validId, setBookDirectionList);
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
              key={chapter.chapterId}
              onClick={() =>
                handleChapterClick(
                  chapter.chapterId,
                  chapters,
                  currentPage,
                  markdown,
                  setCheckModalVisible,
                  setCurrentPage
                )
              }
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
          ) : isReadPage ? (
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
                      {/* <ButtonWithTooltip
                        title="Save Button"
                        onClick={() =>
                          console.log("Custom Button Clicked!", markdown)
                        }
                      >
                        <SaveIcon sx={{ width: 20 }} />
                      </ButtonWithTooltip> */}
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
            // onClick={() => handlePrevChapter(currentPage, setCurrentPage)}
            onClick={() =>
              checkUnsavedChapterChanges(
                chapters,
                currentPage,
                setCurrentPage,
                markdown,
                setCheckModalVisible,
                false,
                setIsNext
              )
            }
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            // onClick={() =>
            //   handleNextChapter(currentPage, setCurrentPage, chapters)
            // }
            onClick={() =>
              checkUnsavedChapterChanges(
                chapters,
                currentPage,
                setCurrentPage,
                markdown,
                setCheckModalVisible,
                true,
                setIsNext
              )
            }
            disabled={currentPage === chapters.length - 1}
          >
            Next
          </Button>
          {isReadPage ? (
            <></>
          ) : (
            <>
              {(currentBookDirection.pathOneChapterId ?? 0) > 0 ? (
                <Button
                  variant="contained"
                  startIcon={<TurnLeftIcon />}
                  // onClick={() => setDirectionDialogVisible(true)}
                >
                  {currentBookDirection.pathOneDesc}
                </Button>
              ) : (
                <></>
              )}
              {(currentBookDirection.pathTwoChapterId ?? 0) > 0 ? (
                <Button
                  variant="contained"
                  startIcon={<TurnRightIcon />}
                  // onClick={() => setDirectionDialogVisible(true)}
                >
                  {currentBookDirection.pathTwoDesc}
                </Button>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                startIcon={<CallSplitIcon />}
                onClick={() => setDirectionDialogVisible(true)}
              >
                Add Direction
              </Button>
              <Button
                variant="contained"
                startIcon={<NoteAdd />}
                onClick={() => setNewChapterDialogVisible(true)}
              >
                Add Chapter
              </Button>
              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={() =>
                  handleDeleteChapter(chapters, currentPage, setCurrentPage)
                }
                disabled={chapters.length <= 1} // add the "if user is not an editor"
              >
                Delete Chapter
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() =>
                  handleSaveChapter(chapters, markdown, currentPage)
                }
                disabled={chapters.length <= 1} // add the "if user is not an editor"
              >
                Save Chapter
              </Button>
            </>
          )}
        </Box>
        <NewChapterDialog
          dialogVisible={newChapterDialogVisible}
          setDialogVisible={setNewChapterDialogVisible}
          bookId={validBookId}
          chaptersLength={chapters.length}
          setCurrentPage={setCurrentPage}
          _onAddChapter={() =>
            doGetBookChaptersByBookId(validBookId, setChapters, setCurrentPage)
          }
          // doGetBookChaptersByBookId(_validId, setChapters, setCurrentPage);
        />

        <DirectionDialog
          dialogVisible={directionDialogVisible}
          setDialogVisible={setDirectionDialogVisible}
          bookId={validBookId}
          chapters={chapters}
          currentPage={currentPage}
        />

        <MessageDialog
          title={"You have unsaved changes"}
          dialogVisible={checkModalVisible}
          setDialogVisible={setCheckModalVisible}
          _onOKClick={() =>
            isNext
              ? handleNextChapter(currentPage, setCurrentPage, chapters)
              : handlePrevChapter(currentPage, setCurrentPage)
          }
        >
          <Typography>
            You have unsaved changes. Are you sure you want to leave this
            chapter?
          </Typography>
        </MessageDialog>
      </Box>
    </Box>
  );
};

export default ReadPage;

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material";
import { BookChapter, BookDirection } from "../../types/types";
import { useEffect, useState } from "react";
import {
  doGetBookDirectionByChapterId,
  doSaveBookDirection,
} from "./PaperPage.functions";
import DirectionDialogItem from "./DirectionDialogItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type IProps = {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  bookId: number;
  chapters: BookChapter[];
  currentPage: number;
  _onAfterOK?: () => void;
};
const NewChapterDialog = (props: IProps) => {
  // const [open, setOpen] = React.useState(false);
  const [localBookDirection, setLocalBookDirection] = useState<BookDirection>({
    id: 0,
    bookId: props.bookId,
    chapterId: 0,
  });
  const [desc1, setDesc1] = useState<string>("");
  const [chapter1IdStr, setChapter1IdStr] = useState<string>("");
  const [desc2, setDesc2] = useState<string>("");
  const [chapter2IdStr, setChapter2IdStr] = useState<string>("");

  const handleChapter1Change = (event: SelectChangeEvent) => {
    console.log("chapter1", event.target.value);
    setChapter1IdStr(event.target.value);
  };

  const handleChapter2Change = (event: SelectChangeEvent) => {
    setChapter2IdStr(event.target.value);
  };

  const {
    chapters,
    dialogVisible,
    setDialogVisible,
    currentPage,
    bookId,
    // _onAddChapter,
  } = props;

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleOkClick = async () => {
    const chapter1Id = parseInt(chapter1IdStr);
    //check chapter1Id is not NaN
    console.log(chapter1Id, !!chapter1Id, !!desc1);
    if (!(!!chapter1Id && !!desc1)) {
      return;
    }

    const chapter2Id = parseInt(chapter2IdStr);
    console.log(
      chapter2Id,
      desc2,
      (!!chapter1Id && !desc2) || (desc2 && !!chapter2Id)
    );
    if (!(!!chapter2Id && !!desc2)) {
      return;
    }

    console.log(
      "chapter1Id",
      chapter1Id,
      "chapter2Id",
      chapter2Id,
      !chapter2Id,
      !!chapter2Id
    );

    const tmpBookDirection: BookDirection = {
      id: localBookDirection.id,
      bookId: bookId,
      chapterId: chapters[currentPage].id,
      pathOneChapterId: chapter1Id > 0 ? chapter1Id : undefined,
      pathOneDesc: desc1 ?? undefined,
      pathTwoChapterId: chapter2Id > 0 ? chapter2Id : undefined,
      pathTwoDesc: desc2 ?? undefined,
    };
    doSaveBookDirection(tmpBookDirection);
    if (props._onAfterOK) {
      props._onAfterOK();
    }
    handleClose();
  };

  const handleDesc1NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("chapter1", e.target.value);
    setDesc1(e.target.value);
  };
  const handleDesc2NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc2(e.target.value);
  };

  useEffect(() => {
    if (dialogVisible) {
      const tmpChapter = chapters[currentPage];
      doGetBookDirectionByChapterId(tmpChapter.id, setLocalBookDirection);
    } else {
      setChapter1IdStr("");
      setChapter2IdStr("");
      setDesc1("");
      setDesc2("");
      setLocalBookDirection({ id: 0, bookId: bookId, chapterId: 0 });
    }
  }, [dialogVisible]);

  useEffect(() => {
    if (localBookDirection.id > 0) {
      console.log("bookDirectioAAAAAAAA", localBookDirection);
      if (localBookDirection.pathOneChapterId) {
        const tmpChp1 = chapters.find(
          (item) => item.id === localBookDirection.pathOneChapterId
        );
        console.log("tmpChp1", tmpChp1);
        if (tmpChp1) setChapter1IdStr(tmpChp1.id.toString());
      }
      if (localBookDirection.pathOneDesc) {
        setDesc1(localBookDirection.pathOneDesc);
      }

      if (localBookDirection.pathTwoChapterId) {
        const tmpChp2 = chapters.find(
          (item) => item.id === localBookDirection.pathTwoChapterId
        );
        if (tmpChp2) setChapter2IdStr(tmpChp2.id.toString());
      }
      if (localBookDirection.pathTwoDesc) {
        setDesc2(localBookDirection.pathTwoDesc);
      }
    }
  }, [localBookDirection]);

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogVisible}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Direction
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            maxWidth: 500,
          }}
        >
          {/* {createDirectionDialogItem(
            chapters,
            chapter1IdStr,
            handleChapter1Change,
            handleDesc1NameChange
          )}

          {createDirectionDialogItem(
            chapters,
            chapter2IdStr,
            handleChapter2Change,
            handleDesc2NameChange
          )} */}

          <DirectionDialogItem
            chapters={chapters}
            chapterIdStr={chapter1IdStr}
            chapterDesc={desc1}
            handleChapterChange={handleChapter1Change}
            handleDescChange={handleDesc1NameChange}
          />
          <DirectionDialogItem
            chapters={chapters}
            chapterIdStr={chapter2IdStr}
            chapterDesc={desc2}
            handleChapterChange={handleChapter2Change}
            handleDescChange={handleDesc2NameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={handleOkClick}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default NewChapterDialog;

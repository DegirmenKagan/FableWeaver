import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { handleNewChapter } from "./PaperPage.functions";
import { TextField } from "@mui/material";

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
  chaptersLength: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  _onAddChapter: () => void;
};
const NewChapterDialog = (props: IProps) => {
  // const [open, setOpen] = React.useState(false);
  const [chapterName, setChapterName] = React.useState<string>("");
  const {
    bookId,
    chaptersLength,
    // setCurrentPage,
    dialogVisible,
    setDialogVisible,
    _onAddChapter,
  } = props;

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleOkClick = async () => {
    if (!chapterName) {
      return;
    }
    const response = await handleNewChapter(
      bookId,
      chaptersLength
      // setCurrentPage
    );
    if (response) {
      console.log("Chapter added, refreshing chapters");
      _onAddChapter();
    }
    handleClose();
  };

  const handleChapterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapterName(e.target.value);
  };

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
          Add New Chapter
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
        <DialogContent dividers>
          <TextField
            id="standard-basic"
            label="New Chapter Name"
            variant="standard"
            onChange={handleChapterNameChange}
            error={!chapterName}
            helperText={!chapterName ? "Chapter name is required" : ""}
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

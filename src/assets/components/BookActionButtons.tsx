import React, { useContext, useState } from "react";
import { Book } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  doHandleBookFavorite,
  handleDeleteBook,
} from "../pages/BookPage/BookPage.functions";
import {
  editBook,
  openBook,
  readBook,
} from "../pages/LibraryPage/LibraryPage.functions";
import { ProfileContext } from "../contexts/ProfileContext";
import MessageDialog from "./MessageDialog";

type Props = {
  book: Book;
  setBook: React.Dispatch<React.SetStateAction<Book>>;
  detailMode?: boolean;
};

const BookActionButtons = (props: Props) => {
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const { book, setBook, detailMode } = props;
  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <Box>
        {/* Favorite Button */}
        <IconButton
          onClick={() => doHandleBookFavorite(book, setBook, profile.id)}
        >
          <FavoriteIcon color={book.favorite ? "secondary" : "inherit"} />
        </IconButton>
        {/* Open Button */}
        {detailMode ? (
          <></>
        ) : (
          <IconButton onClick={() => openBook(book.id, navigate)}>
            <OpenInNewIcon />
          </IconButton>
        )}

        {/* Read Button */}
        <IconButton onClick={() => readBook(book.id, navigate)}>
          <AutoStoriesIcon />
        </IconButton>
        {/* Edit Button */}
        <IconButton onClick={() => editBook(book.id, navigate)}>
          <EditIcon />
        </IconButton>
        {/* Delete Button */}
        <IconButton onClick={() => setMessageModalVisible(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <MessageDialog
        title={"Delete Book"}
        dialogVisible={messageModalVisible}
        setDialogVisible={setMessageModalVisible}
        _onOKClick={() => handleDeleteBook(book.id, navigate)}
      >
        <Typography>{`Are you sure you want to delete "${book.title}"?`}</Typography>
      </MessageDialog>
    </>
  );
};

export default BookActionButtons;

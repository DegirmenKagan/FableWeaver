import { useContext, useEffect, useState } from "react";
import { Box, Typography, Rating, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book, IGenre } from "../../types/types";
import { emptyBook } from "../PaperPages/PaperPage.functions";
import BookComments from "./BookComments/BookComments";
import {
  doGetBook,
  doGetBookRating,
  doAddUserRating,
  doGetGenres,
  handleGenreLookupClick,
} from "./BookPage.functions";
import TextLookup, { ILookupItem } from "../../components/TextLookup";

import { ProfileContext } from "../../contexts/ProfileContext";
import BookActionButtons from "../../components/BookActionButtons";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>(emptyBook);
  const [bookRating, setBookRating] = useState<number>(0);

  const [userRating, setUserRating] = useState(0);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [booksGenreName, setBooksGenreName] = useState<string>("No Genre");
  const [genreLookup, setGenreLookup] = useState<ILookupItem[]>([]);

  const { profile } = useContext(ProfileContext);

  const handleUserRating = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    setUserRating(value ?? 0);
    //patchUserRating(book.id, value);
  };

  useEffect(() => {
    if (bookId) {
      const validId = parseInt(bookId);
      if (validId > 0) {
        doGetBook(validId, profile.id, setBook, setBooksGenreName);
        doGetBookRating(validId, setBookRating);
        doGetGenres(setGenres);
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (userRating > 0) {
      console.log("User Rating CHANGED", userRating);
      doAddUserRating(userRating, book.id, 1, setBookRating);
    }
  }, [userRating]);

  useEffect(() => {
    if (genres.length > 0) {
      const tmpLookup: ILookupItem[] = [];
      genres.forEach((x) => {
        const _lookupItem: ILookupItem = {
          id: x.id,
          name: x.name,
          onClick: () =>
            handleGenreLookupClick(book, x, setBook, setBooksGenreName), //genreName updateleniyor ama yazdırmıyor ekranda
        };
        tmpLookup.push(_lookupItem);
        setGenreLookup(tmpLookup);
      });
    }
  }, [genres]);

  useEffect(() => {
    if (booksGenreName) {
      console.log("genredeis", booksGenreName);
    }
  }, [booksGenreName]);

  return (
    <Box p={3}>
      {/* Book Details */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Book Cover */}
        <Box flex="1">
          <img
            src={book.image}
            alt={book.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* Book Info */}
        <Box flex="2">
          <Typography variant="h3" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {book.author}
          </Typography>
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>
          <Box mb={3}>
            <TextLookup title={booksGenreName} lookupItems={genreLookup} />
          </Box>
          {/* Book Actions */}
          <Box mb={3}>
            <BookActionButtons book={book} setBook={setBook} detailMode />
          </Box>
          {/* Star Rating */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" mr={1}>
              Rating:
            </Typography>
            <Rating
              name="read-only"
              value={bookRating}
              precision={0.5}
              readOnly
            />
          </Box>

          {/* User Rating */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Rating:
            </Typography>
            <Rating
              name="user-rating"
              value={userRating}
              onChange={handleUserRating}
              precision={0.5}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <BookComments bookId={book.id} />
    </Box>
  );
};

export default BookPage;

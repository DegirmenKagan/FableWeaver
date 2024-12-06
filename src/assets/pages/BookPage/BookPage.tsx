import { useEffect, useState } from "react";
import { Box, Typography, Rating, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Book } from "../../types/types";
import { emptyBook } from "../PaperPages/PaperPage.functions";
import BookComments from "./BookComments/BookComments";
import {
  doGetBook,
  doGetBookRating,
  doAddUserRating,
} from "./BookPage.functions";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>(emptyBook);
  const [bookRating, setBookRating] = useState<number>(0);

  const [userRating, setUserRating] = useState(0);

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
        doGetBook(validId, setBook);
        doGetBookRating(validId, setBookRating);
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (userRating > 0) {
      console.log("User Rating CHANGED", userRating);
      doAddUserRating(userRating, book.id, 1, setBookRating);
    }
  }, [userRating]);

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
          <Box mb={3}>
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

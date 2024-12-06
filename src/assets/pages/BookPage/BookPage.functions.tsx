import {
  addBookRating,
  getBookRatingByBookId,
} from "../../api/BookRatingService";
import { getBook } from "../../api/BookService";
import { Book, BookRating } from "../../types/types";

export const doGetBook = async (
  bookId: number,
  setBook: React.Dispatch<React.SetStateAction<Book>>
) => {
  const response = await getBook(bookId);
  if (response) {
    console.log(`Fetched books: with ID: ${bookId}`, response);
    const book = response as Book;
    setBook(book);
  } else {
    console.log(`Error fetching book with ID: ${bookId}`);
  }
};

export const doGetBookRating = async (
  bookId: number,
  setRating: React.Dispatch<React.SetStateAction<number>>
) => {
  const response = await getBookRatingByBookId(bookId);
  if (response) {
    console.log(`Fetched bookRating: with bookId: ${bookId}`, response);
    const rating = response as number;
    setRating(rating);
  } else {
    console.log(`Error fetching bookRating with bookId: ${bookId}`);
  }
};

export const doAddBookRating = async (
  rating: number,
  bookId: number,
  userId: number
) => {
  const localRating: BookRating = {
    rating: rating,
    bookId: bookId,
    userId: userId,
  };
  const response = await addBookRating(localRating);
  if (response) {
    console.log(`Added bookRating: with bookId: ${bookId}`, response);
    return true;
  } else {
    console.log(`Error adding bookRating with bookId: ${bookId}`);
    return false;
  }
};

export const doAddUserRating = async (
  userRating: number,
  bookId: number,
  userId: number,
  setBookRating: React.Dispatch<React.SetStateAction<number>>
) => {
  console.log("User Rating", userRating);
  if (await doAddBookRating(userRating, bookId, userId)) {
    // guestUser is 1 of 1, use the actual userId
    doGetBookRating(bookId, setBookRating);
  }
};

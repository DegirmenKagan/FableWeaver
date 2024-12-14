import {
  addBookRating,
  getBookRatingByBookId,
} from "../../api/BookRatingService";
import { getBook } from "../../api/BookService";
import { getGenres, patchBookGenre } from "../../api/GenreService";
import { Book, BookRating, IGenre } from "../../types/types";

export const doGetBook = async (
  bookId: number,
  setBook: React.Dispatch<React.SetStateAction<Book>>,
  setBooksGenreName: React.Dispatch<React.SetStateAction<string>>
) => {
  const response = await getBook(bookId);
  if (response) {
    console.log(`Fetched books: with ID: ${bookId}`, response);
    const book = response as Book;
    setBook(book);
    if (book.genrename) setBooksGenreName(book.genrename);
  } else {
    console.log(`Error fetching book with ID: ${bookId}`);
  }
};

export const doGetGenres = async (
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>
) => {
  const response = await getGenres();
  if (response) {
    console.log("Fetched genres", response);
    const genres = response as IGenre[];
    setGenres(genres);
  } else {
    console.log("Error fetching genres");
  }
};

export const handleGenreLookupClick = async (
  book: Book,
  genre: IGenre,
  setBook: React.Dispatch<React.SetStateAction<Book>>,
  setBooksGenreName: React.Dispatch<React.SetStateAction<string>>
) => {
  const response = await patchBookGenre(book.id, genre.id);
  if (response) {
    console.log(response, genre);
    const tmpBook = book;
    tmpBook.genreId = genre.id;
    tmpBook.genrename = genre.name;
    setBook(tmpBook);
    setBooksGenreName(genre.name);
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

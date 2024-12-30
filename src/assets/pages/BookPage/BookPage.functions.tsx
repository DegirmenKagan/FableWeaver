import { NavigateFunction } from "react-router-dom";
import {
  addBookRating,
  getBookRatingByBookId,
} from "../../api/BookRatingService";
import { deleteBook, getBook } from "../../api/BookService";
import { getGenres, patchBookGenre } from "../../api/GenreService";
import { Book, BookRating, IGenre } from "../../types/types";
import {
  addBookFavorite,
  deleteBookFavoriteByBookIdUserId,
} from "../../api/BookFavoriteService";

export const doGetBook = async (
  bookId: number,
  profileId: number,
  setBook: React.Dispatch<React.SetStateAction<Book>>,
  setBooksGenreName: React.Dispatch<React.SetStateAction<string>>
) => {
  const response = await getBook(bookId, profileId);
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

export const doDeleteBook = async (id: number) => {
  const response = await deleteBook(id);
  if (response) {
    console.log(`Deleted book with ID: ${id}`, response);
    return true;
  }
  console.log(`Error deleting book with ID: ${id}`);
};

export const handleDeleteBook = async (
  bookId: number,
  navigate: NavigateFunction
) => {
  doDeleteBook(bookId);
  navigate("/library");
};

export const doHandleBookFavorite = async (
  // bookId: number,
  // bookFavorite: boolean,
  book: Book,
  setBook: React.Dispatch<React.SetStateAction<Book>>,
  userId: number
) => {
  if (userId < 2) {
    alert("Please login to favorite a book");
    return false;
  }

  if (book.favorite) {
    const response = await deleteBookFavoriteByBookIdUserId(book.id, userId);
    if (response) {
      console.log(`Deleted favorite with bookId: ${book.id}`, response);
      setBook({ ...book, favorite: !book.favorite });
      return true;
    } else {
      alert("Error deleting favorite");
      return false;
    }
  } else {
    const response = await addBookFavorite(book.id, userId);
    if (response) {
      console.log(`Added favorite with bookId: ${book.id}`, response);
      setBook({ ...book, favorite: !book.favorite });
      return true;
    } else {
      alert("Error adding favorite");
      return false;
    }
  }
};

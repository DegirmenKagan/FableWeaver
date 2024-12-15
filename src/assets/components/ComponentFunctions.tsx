import { getTopBooksByGenre } from "../api/BookService";
import { BookTopGenre } from "../types/types";

export const doGetTopBooksByGenre = async (
  setBooks: React.Dispatch<React.SetStateAction<BookTopGenre[]>>
) => {
  const response = await getTopBooksByGenre();
  if (response) {
    setBooks(response);
  } else {
    alert("Error while getting Books by genre");
  }
};

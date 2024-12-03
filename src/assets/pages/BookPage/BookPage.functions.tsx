import { getBook } from "../../api/BookService";
import { Book } from "../../types/types";

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

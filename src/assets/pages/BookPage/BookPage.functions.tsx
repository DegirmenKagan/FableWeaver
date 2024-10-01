import { Book } from "../../types/types";

export const doGetBookInfo = async (
  bookId: number,
  setBook: React.Dispatch<React.SetStateAction<Book>>
) => {
  const response = await fetch(`http://localhost:3000/bookInfo/${bookId}`);
  const data = await response.json();
  console.log(data);
  setBook(data);
};

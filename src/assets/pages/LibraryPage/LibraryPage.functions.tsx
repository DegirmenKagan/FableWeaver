import { NavigateFunction } from "react-router-dom";
import { Book } from "../../types/types";

export const initialBooks: Book[] = [
  {
    id: 1,
    img: "",
    title: "The Great Gatsby",
    description:
      "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    author: "F. Scott Fitzgerald",
    favorite: false,
    chapters: [],
  },
  {
    id: 2,
    img: "",
    title: "1984",
    description:
      "1984 is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    author: "George Orwell",
    favorite: true,
    chapters: [],
  },
  {
    id: 3,
    img: "",
    title: "Moby Dick",
    description: "Moby Dick",
    author: "Herman Melville",
    favorite: false,
    chapters: [],
  },
  {
    id: 4,
    img: "",
    title: "To Kill a Mockingbird",
    description: "aaaaa",
    author: "Harper Lee",
    favorite: false,
    chapters: [],
  },
];

// Function to handle searching books
export const handleSearch = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
  setSearchQuery(event.target.value);
};

// Function to mark a book as favorite
export const toggleFavorite = (
  id: number,
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
) => {
  const updatedBooks = books.map((book) =>
    book.id === id ? { ...book, favorite: !book.favorite } : book
  );
  setBooks(updatedBooks);
};

// Function to delete a book
export const deleteBook = (
  id: number,
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
) => {
  const updatedBooks = books.filter((book) => book.id !== id);
  setBooks(updatedBooks);
};

// Function to open the reading page (navigate or display in a modal)
export const openBook = (id: number, navigate: NavigateFunction) => {
  // alert(`Opening book with ID: ${id}`);
  navigate(`/book/${id}`);
  // You can implement navigation to a reading page here
};

export const readBook = (id: number, navigate: NavigateFunction) => {
  navigate(`/read/${id}`);
};

// Function to edit a book (this can open an edit modal or navigate to an edit page)
export const editBook = (id: number, navigate: NavigateFunction) => {
  // alert(`Editing book with ID: ${id}`);
  navigate(`/create/${id}`);
};

// Filter books based on search query
export const filteredBooks = (books: Book[], searchQuery: string): Book[] => {
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// Function to handle switching between grid and list views
export const handleViewChange = (
  event: React.MouseEvent<HTMLElement>,
  view: string,
  setView: React.Dispatch<React.SetStateAction<string>>
) => {
  if (view !== null) {
    setView(view);
  }
};

export const handleNewBookClick = (navigate: NavigateFunction) => {
  navigate("/create/0");
};

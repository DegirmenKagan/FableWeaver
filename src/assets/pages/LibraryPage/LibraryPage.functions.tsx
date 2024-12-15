import { NavigateFunction } from "react-router-dom";
import { Book, BookFavorite, IGenre } from "../../types/types";
import { getBooks } from "../../api/BookService";
import {
  addBookFavorite,
  deleteBookFavoriteByBookIdUserId,
} from "../../api/BookFavoriteService";

// export const initialBooks: Book[] = [
//   {
//     id: 1,
//     img: "",
//     title: "The Great Gatsby",
//     description:
//       "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
//     author: "F. Scott Fitzgerald",
//     favorite: false,
//     chapters: [],
//   },
//   {
//     id: 2,
//     img: "",
//     title: "1984",
//     description:
//       "1984 is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
//     author: "George Orwell",
//     favorite: true,
//     chapters: [],
//   },
//   {
//     id: 3,
//     img: "",
//     title: "Moby Dick",
//     description: "Moby Dick",
//     author: "Herman Melville",
//     favorite: false,
//     chapters: [],
//   },
//   {
//     id: 4,
//     img: "",
//     title: "To Kill a Mockingbird",
//     description: "aaaaa",
//     author: "Harper Lee",
//     favorite: false,
//     chapters: [],
//   },
// ];

// Function to handle searching books
export const handleSearch = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
  setSearchQuery(event.target.value);
};

export const handleGenreFilterAllClick = async (
  setGenreIdFilter: React.Dispatch<React.SetStateAction<number>>,
  setGenreName: React.Dispatch<React.SetStateAction<string>>
) => {
  setGenreIdFilter(0);
  setGenreName("Genre");
};

export const handleGenreFilterClick = async (
  clickedGenre: IGenre,
  genreIdFilter: number,
  setGenreIdFilter: React.Dispatch<React.SetStateAction<number>>,
  setGenreName: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log(
    genreIdFilter,
    clickedGenre
    // genreIdFilter.includes(clickedGenre)
  );
  // if (genreIdFilter.includes(clickedGenre)) {
  if (genreIdFilter === clickedGenre.id) {
    setGenreIdFilter(0);
    setGenreName("Genre");
  } else {
    setGenreIdFilter(clickedGenre.id);
    setGenreName(clickedGenre.name);
  }
  // let tmpFilterArr = genreIdFilter;
  // //push if not exists
  // if (tmpFilterArr.includes(clickedGenreId)) {
  //   tmpFilterArr = tmpFilterArr.filter((x) => x !== clickedGenreId);
  // } else {
  //   tmpFilterArr.push(clickedGenreId);
  // }

  // setGenreIdFilter(tmpFilterArr);
};

// Function to mark a book as favorite
export const toggleFavorite = async (
  bookId: number,
  userId: number,
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
) => {
  const newFav: BookFavorite = {
    bookId,
    userId,
  };

  if (books.find((x) => x.id === bookId)?.favorite) {
    const response = await deleteBookFavoriteByBookIdUserId(
      newFav.bookId,
      newFav.userId
    );
    if (response) {
      const updatedBooks = books.map((book) =>
        book.id === bookId ? { ...book, favorite: !book.favorite } : book
      );
      setBooks(updatedBooks);
    } else {
      alert("Error deleting favorite");
    }
  } else {
    const response = await addBookFavorite(newFav);
    if (response) {
      const updatedBooks = books.map((book) =>
        book.id === bookId ? { ...book, favorite: !book.favorite } : book
      );
      setBooks(updatedBooks);
    } else {
      alert("Error adding favorite");
    }
  }
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
export const filteredBooks = (
  books: Book[],
  searchQuery: string,
  genreId: number
): Book[] => {
  const filteredBooks = books.filter((x) =>
    genreId > 0 ? x.genreId === genreId : true
  );
  return filteredBooks.filter(
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

export const getLibraryBooks = async (
  profileId: number,
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
) => {
  const response = await getBooks(profileId);
  if (response) {
    console.log("Fetched books:", response);
    setBooks(response);
  } else {
    console.log("Error fetching books");
  }
};

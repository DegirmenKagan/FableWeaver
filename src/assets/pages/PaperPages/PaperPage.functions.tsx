import { getBookChaptersByBookId } from "../../api/BookChapterService";
import { Book, BookChapter } from "../../types/types";

export const emptyBook: Book = {
  id: 0,
  image: "",
  title: "",
  description: "",
  author: "",
  rating: undefined,
  chapters: [],
  favorite: false,
};

export const chapters: BookChapter[] = [
  // Dummy chapters for the chapter tree
  {
    id: 1,
    bookId: 1,
    title: "Chapter 1: Introduction",
    content: "This is the first chapter",
  },
  {
    id: 2,
    bookId: 2,
    title: "Chapter 2: The Journey",
    content: "This is the second chapter",
  },
  {
    id: 3,
    bookId: 3,
    title: "Chapter 3: Challenges Ahead",
    content: "This is the third chapter",
  },
  {
    id: 4,
    bookId: 4,
    title: "Chapter 4: The Climax",
    content: "This is the fourth chapter",
  },
];

// Function to handle next page
export const handleNextPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  chapters: BookChapter[]
) => {
  if (currentPage < chapters.length - 1) {
    setCurrentPage(currentPage + 1);
  }
};

// Function to handle previous page
export const handlePrevPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

export const handleChapterClick = (
  chapterId: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  setCurrentPage(chapterId - 1);
};

export const handleEdit = (
  oldState: number,
  setEditMode: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number
) => {
  setEditMode(-1);
  //wait little bit
  setTimeout(() => {
    console.log("Current Page: ", currentPage, chapters[currentPage].content);
    setEditMode(oldState == 1 ? 0 : 1);
  }, 50);
};
export const handleNewPage = (
  bookId: number,
  chapters: BookChapter[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newChapter: BookChapter = {
    id: chapters.length + 1,
    bookId: bookId,
    title: `Chapter ${chapters.length + 1}: New Chapter`,
    content: "This is a new chapter",
  };
  chapters.push(newChapter);
  setCurrentPage(chapters.length - 1);
};

export const handleDeletePage = (
  chapters: BookChapter[],
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  // delete the current page
  chapters.splice(currentPage, 1);

  // update the content of the current page
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  } else {
    setCurrentPage(0);
  }
};

export const doSaveBook = async (book: Book) => {
  const response = await fetch(`http://localhost:3000/book/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  const data = await response.json();
  console.log(data);
};

export const doGetBookChaptersByBookId = async (
  bookId: number,
  setChapters: React.Dispatch<React.SetStateAction<BookChapter[]>>
) => {
  const response = await getBookChaptersByBookId(bookId);
  if (response) {
    setChapters(response);
  } else {
    console.log(`Error fetching BookChapters with bookId: ${bookId}`);
  }
};

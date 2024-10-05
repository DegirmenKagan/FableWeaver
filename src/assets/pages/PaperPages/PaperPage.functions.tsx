import { Book, Chapter } from "../../types/types";

export const emptyBook: Book = {
  id: 0,
  img: "",
  title: "",
  desc: "",
  author: "",
  rating: undefined,
  chapters: [],
  favorite: false,
};

export const chapters: Chapter[] = [
  // Dummy chapters for the chapter tree
  {
    id: 1,
    title: "Chapter 1: Introduction",
    content: "This is the first chapter",
  },
  {
    id: 2,
    title: "Chapter 2: The Journey",
    content: "This is the second chapter",
  },
  {
    id: 3,
    title: "Chapter 3: Challenges Ahead",
    content: "This is the third chapter",
  },
  {
    id: 4,
    title: "Chapter 4: The Climax",
    content: "This is the fourth chapter",
  },
];

export const doGetBook = async (
  bookId: number,
  setBook: React.Dispatch<React.SetStateAction<Book>>
) => {
  const response = await fetch(`http://localhost:3000/book/${bookId}`);
  const data = await response.json();
  console.log(data);
  setBook(data);
};

// Function to handle next page
export const handleNextPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  chapters: Chapter[]
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
  chapters: Chapter[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newChapter = {
    id: chapters.length + 1,
    title: `Chapter ${chapters.length + 1}: New Chapter`,
    content: "This is a new chapter",
  };
  chapters.push(newChapter);
  setCurrentPage(chapters.length - 1);
};

export const handleDeletePage = (
  chapters: Chapter[],
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

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
  setEditMode: React.Dispatch<React.SetStateAction<number>>
) => {
  setEditMode(-1);
  //wait little bit
  setTimeout(() => {
    setEditMode(oldState == 1 ? 0 : 1);
  }, 50);
};
//fix new chapter
export const handleNewPage = (
  bookId: number,
  chapters: BookChapter[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newChapter: BookChapter = {
    id: 0,
    chapterId: chapters.length + 1,
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

export const handleNewMarkdown = (
  chapters: BookChapter[],
  currentPage: number,
  setMarkdown: (value: React.SetStateAction<string>) => void
) => {
  const newMarkdown =
    (chapters[currentPage].content.includes(
      `## ${chapters[currentPage].title}\n`
    )
      ? ""
      : `## ${chapters[currentPage].title}\n`) + chapters[currentPage].content;
  setMarkdown(newMarkdown);
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
  setChapters: React.Dispatch<React.SetStateAction<BookChapter[]>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const response = await getBookChaptersByBookId(bookId);
  if (response) {
    setChapters(response);
    setCurrentPage(0);
  } else {
    console.log(`Error fetching BookChapters with bookId: ${bookId}`);
  }
};

import {
  addBookChapter,
  deleteBookChapter,
  getBookChaptersByBookId,
} from "../../api/BookChapterService";
import { Book, BookChapter, IBookChapter } from "../../types/types";

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
export const handleNextChapter = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  chapters: BookChapter[]
) => {
  if (currentPage < chapters.length - 1) {
    setCurrentPage(currentPage + 1);
  }
};

// Function to handle previous page
export const handlePrevChapter = (
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
export const handleNewChapter = async (
  bookId: number,
  chaptersLength: number
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newChapter: IBookChapter = {
    // id: 0, giving zero doesnt iterate as last id
    chapterId: chaptersLength + 1,
    bookId: bookId,
    title: `Chapter ${chaptersLength + 1}: New Chapter`,
    content: "This is a new chapter",
  };

  const response = await addBookChapter(newChapter);

  if (response) {
    console.log("Chapter added, refreshing chapters");
    // setCurrentPage(chaptersLength - 1);
    return true;
  } else {
    console.log("Error adding chapter");
    return false;
  }
};

export const handleSaveChapter = async (
  chapters: BookChapter[],
  currentPage: number,
  setMarkdown: (value: React.SetStateAction<string>) => void
) => {
  chapters[currentPage].content = chapters[currentPage].content.replace(
    chapters[currentPage].content,
    ""
  );
  setMarkdown(chapters[currentPage].content);
};

export const handleDeleteChapter = async (
  chapters: BookChapter[],
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const response = await deleteBookChapter(chapters[currentPage].id);
  if (response) {
    // delete the current page
    chapters.splice(currentPage, 1);
    // update the content of the current page
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
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
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  isNewChapterAdded?: boolean
) => {
  const response = await getBookChaptersByBookId(bookId);
  if (response) {
    setChapters(response);
    setCurrentPage(isNewChapterAdded ? response.length - 1 : 0);
  } else {
    console.log(`Error fetching BookChapters with bookId: ${bookId}`);
  }
};

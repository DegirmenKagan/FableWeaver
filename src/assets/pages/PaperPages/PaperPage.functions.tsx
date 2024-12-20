import {
  addBookChapter,
  deleteBookChapter,
  getBookChaptersByBookId,
  updateBookChapter,
} from "../../api/BookChapterService";
import {
  addBookDirection,
  getBookDirectionByChapterId,
  getBookDirectionsByBookId,
  updateBookDirection,
} from "../../api/BookDirectionService";
import {
  Book,
  BookChapter,
  BookDirection,
  IBookChapter,
} from "../../types/types";

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

export const checkUnsavedChapterChanges = (
  chapters: BookChapter[],
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  markdown: string,
  setCheckModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isNext: boolean,
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log(
    currentPage,
    chapters[currentPage].content !== markdown,
    "chapcontent\n",
    chapters[currentPage].content.length,
    "\nmarkdown",
    markdown.length
    // show differences of two strings;
  );
  if (chapters[currentPage].content !== markdown) {
    setCheckModalVisible(true);
    setIsNext(isNext);
  } else {
    if (isNext) {
      handleNextChapter(currentPage, setCurrentPage, chapters);
    } else {
      handlePrevChapter(currentPage, setCurrentPage);
    }
  }
};

export const handleChapterClick = (
  chapterId: number,
  chapters: BookChapter[],
  currentPage: number,
  markdown: string,
  setCheckModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  if (chapters[currentPage].content !== markdown) {
    setCheckModalVisible(true);
  } else {
    setCurrentPage(chapterId - 1);
  }
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
  chaptersLength: number,
  title: string
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const newChapter: IBookChapter = {
    // id: 0, giving zero doesnt iterate as last id
    chapterId: chaptersLength + 1,
    bookId: bookId,
    title: title,
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
  markdown: string,
  currentPage: number
  // setMarkdown: (value: React.SetStateAction<string>) => void
) => {
  // chapters[currentPage].content = chapters[currentPage].content.replace(
  //   chapters[currentPage].content,
  //   ""
  // );
  const updatedChapter = chapters[currentPage];
  updatedChapter.content = markdown;
  console.log(updatedChapter);
  const response = await updateBookChapter(updatedChapter);
  if (response) {
    return true;
  } else {
    console.log("Error updating chapter");
    return false;
  }

  // setMarkdown(chapters[currentPage].content);
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
  // const newMarkdown =
  //   (chapters[currentPage].content.includes(
  //     `## ${chapters[currentPage].title}\n`
  //   )
  //     ? ""
  //     : `## ${chapters[currentPage].title}\n`) + chapters[currentPage].content;
  setMarkdown(chapters[currentPage].content);
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

export const doGetBookDirectionByBookId = async (
  bookId: number,
  setBookDirectionList: React.Dispatch<React.SetStateAction<BookDirection[]>>
) => {
  const response = await getBookDirectionsByBookId(bookId);
  if (response) {
    console.log("Directions fetched", response);
    setBookDirectionList(response);
  } else {
    console.log(`Error fetching Directions with bookId: ${bookId}`);

    setBookDirectionList([]);
  }
};

export const doGetBookDirectionByChapterId = async (
  chapterId: number,
  setBookDirection: React.Dispatch<React.SetStateAction<BookDirection>>
) => {
  const response = await getBookDirectionByChapterId(chapterId);
  if (response) {
    console.log("Directions fetched", response);
    setBookDirection(response);
  } else {
    console.log(`Error fetching Directions with chapterId: ${chapterId}`);

    setBookDirection({ id: 0, bookId: 0, chapterId: 0 });
  }
};

export const doSaveBookDirection = async (bookDirection: BookDirection) => {
  if (bookDirection.id === 0) {
    const response = await addBookDirection(bookDirection);
    if (response) {
      console.log("Direction added");
    } else {
      console.log("Error adding direction");
    }
  } else {
    const response = await updateBookDirection(bookDirection);
    if (response) {
      console.log("Direction updated");
    } else {
      console.log("Error updating direction");
    }
  }
};

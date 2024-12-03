import { addComment, getCommentsByBookId } from "../../../api/CommentService";
import { IComment, ICommentDto } from "../../../types/types";

export const doGetBookComments = async (
  bookId: number,
  setComments: React.Dispatch<React.SetStateAction<ICommentDto[]>>
) => {
  const response = await getCommentsByBookId(bookId);
  if (response) {
    console.log(`Fetched comments: with bookId: ${bookId}`, response);
    const comments = response as ICommentDto[];
    setComments(comments);
  } else {
    console.log(`Error fetching comments with bookId: ${bookId}`);
  }
};

export const doAddComment = async (comment: IComment) => {
  const response = await addComment(comment);
  if (response) {
    console.log(`Added comment: ${comment.text}`, response);
  } else {
    console.log(`Error adding comment: ${comment.text}`);
  }
};

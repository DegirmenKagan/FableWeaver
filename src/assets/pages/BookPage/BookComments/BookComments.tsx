import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deepPurple } from "@mui/material/colors";
import { IComment, ICommentDto } from "../../../types/types";
import { doAddComment, doGetBookComments } from "./BookComments.functions";
import { dateFormat } from "../../../components/StringFormat";
import { ProfileContext } from "../../../contexts/ProfileContext";

// Dummy comments for the book
// const initialComments: IComment[] = [
//   {
//     id: 1,
//     bookId: 1,
//     username: "John Doe",
//     text: "Amazing book! The writing style is fantastic.",
//     avatar: "",
//   },
//   {
//     id: 2,
//     bookId: 1,
//     username: "Jane Smith",
//     text: "The ending left me speechless.",
//     avatar: "",
//   },
// ];

type Props = {
  bookId: number;
};

const BookComments = (props: Props) => {
  const [comments, setComments] = useState<ICommentDto[]>([]);
  const [newComment, setNewComment] = useState("");
  const { profile } = useContext(ProfileContext);

  const getComments = (bookId: number) => {
    doGetBookComments(bookId, setComments);
  };

  const addComment = async (comment: IComment) => {
    doAddComment(comment);
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment: IComment = {
        // id: comments.length + 1,
        bookId: props.bookId,
        userId: profile.id,
        text: newComment,
      };
      console.log("comment", comment, profile);
      addComment(comment);
      setNewComment("");
      getComments(props.bookId);
    } else {
      alert("Please write a comment before posting.");
    }
  };

  useEffect(() => {
    if (props.bookId) {
      getComments(props.bookId);
    }
  }, [props.bookId]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {/* New Comment Input */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            label="Write a comment..."
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={3}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
          >
            Post Comment
          </Button>
        </CardActions>
      </Card>

      {/* List of Comments */}
      <List>
        {comments.map((comment) => (
          <ListItem
            sx={{ display: "flex", flexDirection: "row" }}
            key={comment.id}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar
                sx={{ bgcolor: deepPurple[500] }}
                src={comment.avatar ?? undefined}
              >
                {comment.avatar
                  ? undefined
                  : comment.username.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.username ?? "Guest"}
              secondary={
                <Typography variant="body2">{comment.text}</Typography>
              }
            />
            <Typography sx={{ marginTop: 0.8 }}>
              {dateFormat(comment.updatedAt ?? comment.createdAt)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BookComments;

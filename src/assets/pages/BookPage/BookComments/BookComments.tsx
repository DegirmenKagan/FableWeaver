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
import { useState } from "react";
import { deepPurple } from "@mui/material/colors";

// Dummy comments for the book
const initialComments = [
  {
    id: 1,
    bookId: 1,
    name: "John Doe",
    text: "Amazing book! The writing style is fantastic.",
    avatar: "",
  },
  {
    id: 2,
    bookId: 1,
    name: "Jane Smith",
    text: "The ending left me speechless.",
    avatar: "",
  },
];

type Props = {
  bookId: number;
};

const BookComments = (props: Props) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const getComments = () => {
    // Fetch comments from the server
    // setComments();
  };

  const addComment = async () => {
    // Add the comment to the server
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        bookId: props.bookId,
        name: "Anonymous", // For now, the name is static, can be dynamic based on user data
        text: newComment,
        avatar: "", // Could be dynamic if the user has an avatar
      };

      addComment(comment);

      setComments([comment, ...comments]);
      setNewComment("");
    }
  };
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
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {comment.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.name}
              secondary={
                <Typography variant="body2">{comment.text}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BookComments;

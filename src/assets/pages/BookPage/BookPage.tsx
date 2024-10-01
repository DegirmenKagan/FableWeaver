import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { Book } from "../../types/types";
import { emptyBook } from "../PaperPages/PaperPage.functions";
import { doGetBookInfo } from "./BookPage.functions";

// Sample Book Data
const bookData = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  description:
    "A novel set in the Roaring Twenties that explores themes of wealth, love, and the American Dream.",
  rating: 4.2,
  image: "https://via.placeholder.com/150", // Placeholder image
};

// Dummy comments for the book
const initialComments = [
  {
    id: 1,
    name: "John Doe",
    text: "Amazing book! The writing style is fantastic.",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "The ending left me speechless.",
    avatar: "",
  },
];

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>(emptyBook);

  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        name: "Anonymous", // For now, the name is static, can be dynamic based on user data
        text: newComment,
        avatar: "", // Could be dynamic if the user has an avatar
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  useEffect(() => {
    if (bookId) {
      const validId = parseInt(bookId);
      if (validId > 0) {
        doGetBookInfo(validId, setBook);
      }
    }
  }, [bookId]);

  return (
    <Box p={3}>
      {/* Book Details */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Book Cover */}
        <Box flex="1">
          <img
            src={bookData.image}
            alt={bookData.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* Book Info */}
        <Box flex="2">
          <Typography variant="h3" gutterBottom>
            {bookData.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            by {bookData.author}
          </Typography>
          <Typography variant="body1" paragraph>
            {bookData.description}
          </Typography>

          {/* Star Rating */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" mr={1}>
              Rating: {bookData.rating}
            </Typography>
            <Rating
              name="read-only"
              value={bookData.rating}
              precision={0.5}
              readOnly
            />
          </Box>

          {/* User Rating */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Your Rating:
            </Typography>
            <Rating
              name="user-rating"
              value={userRating}
              onChange={(event, newValue) => setUserRating(newValue)}
              precision={1}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Comments Section */}
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
    </Box>
  );
};

export default BookPage;

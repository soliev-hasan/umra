import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

interface ReviewFormProps {
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setSnackbar({
        open: true,
        message: "Пожалуйста, поставьте оценку.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://umra-vjr0.onrender.com/api/reviews", {
        author,
        comment,
        rating,
      });
      setSnackbar({
        open: true,
        message: "Спасибо за ваш отзыв!",
        severity: "success",
      });
      setAuthor("");
      setComment("");
      setRating(0);
      onReviewSubmitted(); // Call parent function to refresh reviews
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.error ||
          "Произошла ошибка при отправке отзыва.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ py: 8, width: "100%" }}>
      <Container maxWidth="sm">
        {" "}
        {/* Use container to limit form width */}
        <Paper sx={{ p: { xs: 2, md: 4 }, boxShadow: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{
              mb: 4,
              color: "primary.main",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Оставить отзыв
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Ваше имя"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Ваш отзыв"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3 }}>
              <Typography component="legend" sx={{ mr: 2 }}>
                Ваша оценка:
              </Typography>
              <Rating
                name="review-rating"
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue);
                }}
                precision={1}
                size="large"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
            >
              Отправить отзыв
            </Button>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;

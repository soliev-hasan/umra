import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Avatar,
} from "@mui/material";
import axios from "axios";

interface Review {
  _id: string;
  author: string;
  comment: string;
  rating: number;
  createdAt: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(
          "https://umra-vjr0.onrender.com/api/reviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box sx={{ py: 8, backgroundColor: "background.paper", width: "100%" }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 6,
          color: "primary.main",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Отзывы клиентов
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {/* Basic Avatar for now */}
                  <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
                    {review.author.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" component="div">
                    {review.author}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly precision={0.5} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {review.comment}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ mt: 1 }}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewsSection;

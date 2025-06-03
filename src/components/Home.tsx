import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";
import ReviewsSection from "./ReviewsSection";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

const Home = () => {
  const [refreshReviews, setRefreshReviews] = useState(false);

  const handleReviewSubmitted = () => {
    setRefreshReviews(!refreshReviews);
  };

  return (
    <Box>
      <Carousel />
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "60vh", md: "80vh" },
          backgroundImage: "url('/images/kaaba.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              color="white"
              sx={{
                textAlign: "center",
                mb: 4,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Umra Tours
            </Typography>
            <Typography
              variant="h4"
              color="white"
              sx={{
                textAlign: "center",
                mb: 6,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Ваш путь к духовному просветлению
            </Typography>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                component={RouterLink}
                to="/gallery"
                variant="contained"
                size="large"
                fullWidth={false}
                sx={{
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
              >
                Наши туры
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
                fullWidth={false}
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "secondary.main",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Связаться с нами
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Reviews Section */}
      <ReviewsSection key={refreshReviews.toString()} />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />

      {/* Tours Section */}
      <Box sx={{ py: 8, width: "100%" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "primary.main",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Наши туры
          </Typography>
          {/* <Grid container spacing={4}>
            {tours.map((tour) => (
              <Grid item xs={12} md={4} key={tour.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={tour.image}
                    alt={tour.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        color: "primary.main",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {tour.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {tour.description}
                    </Typography>
                    <Typography variant="h6" color="secondary.main">
                      {tour.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Длительность: {tour.duration}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={RouterLink}
                      to={`/tours/${tour.id}`}
                    >
                      Подробнее
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      component={RouterLink}
                      to="/contact"
                    >
                      Забронировать
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, width: "100%" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              color: "primary.main",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Наши преимущества
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                >
                  Профессиональная организация
                </Typography>
                <Typography color="text.secondary">
                  Мы обеспечиваем полное сопровождение и поддержку на всех
                  этапах путешествия
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                >
                  Комфортное проживание
                </Typography>
                <Typography color="text.secondary">
                  Тщательно подобранные отели рядом с священными местами
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                >
                  Опытные гиды
                </Typography>
                <Typography color="text.secondary">
                  Наши гиды помогут вам лучше понять духовную значимость каждого
                  места
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

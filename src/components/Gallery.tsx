import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import Footer from "./Footer";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://umra-vjr0.onrender.com/api/gallery"
        );
        setImages(response.data as GalleryImage[]);
      } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
      }
    };

    fetchImages();
  }, []);

  const categories = [
    { value: "all", label: "Все" },
    { value: "umra", label: "Умра" },
    { value: "hajj", label: "Хадж" },
    { value: "ziyarat", label: "Зиярат" },
    { value: "special", label: "Специальные" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          color: "primary.main",
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Галерея
      </Typography>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: { xs: 3, md: 4 },
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "4px",
          },
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minWidth: { xs: "100%", sm: "auto" },
            "& .MuiTab-root": {
              color: "text.secondary",
              minWidth: { xs: "auto", sm: 120 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              value={category.value}
              label={category.label}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {filteredImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
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
                image={`https://umra-vjr0.onrender.com${image.imageUrl}`}
                alt={image.title}
                sx={{
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {image.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {image.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary.main"
                  sx={{
                    mt: 2,
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                  }}
                >
                  Категория: {image.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
};

export default Gallery;

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://umra-vjr0.onrender.com/api/gallery"
      );
      setImages(response.data as GalleryImage[]);
    } catch (error) {
      // setError("Ошибка при загрузке изображений галереи");
    }
  };

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Галерея
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Фотографии наших паломнических туров
      </Typography>

      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => handleImageClick(image)}
            >
              <CardMedia
                component="img"
                height="300"
                image={`https://umra-vjr0.onrender.com${image.imageUrl}`}
                alt={image.title}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Диалог просмотра изображения */}
      <Dialog
        open={!!selectedImage}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Box>
              <img
                src={`https://umra-vjr0.onrender.com${selectedImage.imageUrl}`}
                alt={selectedImage.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                }}
              >
                <Typography variant="h6">{selectedImage.title}</Typography>
                <Typography variant="body2">
                  {selectedImage.description}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Gallery;

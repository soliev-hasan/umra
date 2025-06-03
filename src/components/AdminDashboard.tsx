import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import TourIcon from "@mui/icons-material/Tour";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const AdminDashboard = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get<GalleryImage[]>(
        "https://umra-vjr0.onrender.com/api/gallery"
      );
      setImages(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке изображений:", error);
    }
  };

  const handleOpen = (image?: GalleryImage) => {
    if (image) {
      setSelectedImage(image);
      setTitle(image.title);
      setDescription(image.description);
      setCategory(image.category);
    } else {
      setSelectedImage(null);
      setTitle("");
      setDescription("");
      setCategory("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setImageFile(null);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (selectedImage) {
        await axios.put(
          `https://umra-vjr0.onrender.com/api/gallery/${selectedImage._id}`,
          formData
        );
      } else {
        await axios.post(
          "https://umra-vjr0.onrender.com/api/gallery",
          formData
        );
      }

      handleClose();
      fetchImages();
    } catch (error) {
      console.error("Ошибка при сохранении изображения:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://umra-vjr0.onrender.com/api/gallery/${id}`);
      fetchImages();
    } catch (error) {
      console.error("Ошибка при удалении изображения:", error);
    }
  };

  const adminSections = [
    {
      title: "Управление турами",
      description: "Добавление, редактирование и удаление туров",
      icon: <TourIcon sx={{ fontSize: 40 }} />,
      path: "/admin/tours",
    },
    {
      title: "Управление галереей",
      description: "Добавление и управление изображениями в галерее",
      icon: <ImageIcon sx={{ fontSize: 40 }} />,
      path: "/admin/gallery",
    },
    {
      title: "Управление каруселью",
      description: "Настройка слайдов на главной странице",
      icon: <ViewCarouselIcon sx={{ fontSize: 40 }} />,
      path: "/admin/carousel",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "primary.main",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Панель администратора
      </Typography>

      <Grid container spacing={4}>
        {adminSections.map((section) => (
          <Grid item xs={12} md={4} key={section.title}>
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
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>{section.icon}</Box>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {section.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate(section.path)}
                  sx={{
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  Перейти
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Управление галереей
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Добавить изображение
        </Button>
      </Box>

      <Grid container spacing={4}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={`https://umra-vjr0.onrender.com${image.imageUrl}`}
                alt={image.title}
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
                  {image.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {image.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary.main"
                  sx={{ mb: 2 }}
                >
                  Категория: {image.category}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => handleOpen(image)}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(image._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedImage ? "Редактировать изображение" : "Добавить изображение"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Категория</InputLabel>
              <Select
                value={category}
                label="Категория"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="umra">Умра</MenuItem>
                <MenuItem value="hajj">Хадж</MenuItem>
                <MenuItem value="ziyarat">Зиярат</MenuItem>
                <MenuItem value="special">Специальные</MenuItem>
              </Select>
            </FormControl>
            {!selectedImage && (
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Загрузить изображение
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedImage ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;

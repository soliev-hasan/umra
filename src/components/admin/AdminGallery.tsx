import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const AdminGallery = () => {
  const { token } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("Ошибка при загрузке изображений");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!image) {
      setError("Пожалуйста, выберите изображение");
      return;
    }

    if (!title || !description || !category) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    // Проверяем содержимое FormData перед отправкой
    console.log("Отправляемые данные:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios({
        method: "post",
        url: "https://umra-vjr0.onrender.com/api/gallery",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess("Изображение успешно добавлено");
        setTitle("");
        setDescription("");
        setCategory("");
        setImage(null);
        fetchImages();
      }
    } catch (error: any) {
      console.error("Ошибка при загрузке:", error);
      if (error.response) {
        // Сервер ответил с ошибкой
        console.error("Детали ошибки:", error.response.data);
        setError(
          error.response.data?.message || "Ошибка при добавлении изображения"
        );
      } else if (error.request) {
        // Запрос был отправлен, но ответ не получен
        setError("Сервер не отвечает. Пожалуйста, попробуйте позже.");
      } else {
        // Ошибка при настройке запроса
        setError("Ошибка при отправке запроса");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://umra-vjr0.onrender.com/api/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Изображение успешно удалено");
      fetchImages();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Ошибка при удалении изображения"
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление галереей
      </Typography>

      {/* Форма добавления */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Категория"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value="umra">Умра</MenuItem>
              <MenuItem value="hajj">Хадж</MenuItem>
              <MenuItem value="ziyarat">Зиярат</MenuItem>
              <MenuItem value="special">Специальные</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Выбрать изображение
              </Button>
            </label>
            {image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Выбрано: {image.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Добавить изображение
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Сообщения об ошибках и успехе */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}

      {/* Сетка изображений */}
      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`https://umra-vjr0.onrender.com${image.imageUrl}`}
                alt={image.title}
              />
              <CardContent>
                <Typography variant="h6">{image.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Категория: {image.category}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(image._id)}
                  color="error"
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminGallery;

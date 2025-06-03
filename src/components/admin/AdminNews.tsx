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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

const AdminNews = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://umra-vjr0.onrender.com/api/news"
      );
      setArticles(response.data as NewsArticle[]);
    } catch (error) {
      setError("Ошибка при загрузке новостей");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Пожалуйста, выберите изображение");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("date", new Date().toISOString());

    try {
      await axios.post("https://umra-vjr0.onrender.com/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Новость успешно добавлена");
      setTitle("");
      setContent("");
      setImage(null);
      fetchArticles();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Ошибка при добавлении новости"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://umra-vjr0.onrender.com/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Новость успешно удалена");
      fetchArticles();
    } catch (error: any) {
      setError(error.response?.data?.message || "Ошибка при удалении новости");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление новостями
      </Typography>

      {/* Форма добавления */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Содержание"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
              required
            />
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
              Добавить новость
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

      {/* Сетка новостей */}
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} md={6} key={article._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`https://umra-vjr0.onrender.com${article.imageUrl}`}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Дата: {new Date(article.date).toLocaleDateString()}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(article._id)}
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

export default AdminNews;

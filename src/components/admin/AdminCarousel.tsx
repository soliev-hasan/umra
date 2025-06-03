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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface CarouselSlide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

const AdminCarousel = () => {
  const { token } = useAuth();
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get<CarouselSlide[]>(
        "https://umra-vjr0.onrender.com/api/carousel",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSlides(response.data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSlide(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImageFile(null);
    setOrder(0);
  };

  const handleEdit = (slide: CarouselSlide) => {
    setEditingSlide(slide);
    setTitle(slide.title);
    setSubtitle(slide.subtitle);
    setOrder(slide.order);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот слайд?")) {
      try {
        await axios.delete(
          `https://umra-vjr0.onrender.com/api/carousel/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchSlides();
      } catch (error) {
        console.error("Error deleting slide:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("order", order.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingSlide) {
        await axios.patch(
          `https://umra-vjr0.onrender.com/api/carousel/${editingSlide._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "https://umra-vjr0.onrender.com/api/carousel",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      handleClose();
      fetchSlides();
    } catch (error) {
      console.error("Error saving slide:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Управление каруселью
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Добавить слайд
        </Button>
      </Box>

      <Grid container spacing={4}>
        {slides.map((slide) => (
          <Grid item xs={12} sm={6} md={4} key={slide._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://umra-vjr0.onrender.com${slide.imageUrl}`}
                alt={slide.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {slide.subtitle}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Порядок: {slide.order}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => handleEdit(slide)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(slide._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSlide ? "Редактировать слайд" : "Добавить слайд"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Подзаголовок"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Порядок"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              margin="normal"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ marginTop: "16px" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingSlide ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCarousel;

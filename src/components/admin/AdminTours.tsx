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
import { useAuth } from "../../contexts/AuthContext";

interface Tour {
  _id: string;
  title: string;
  type: string;
  duration: string;
  price: string;
  date: string;
  description: string;
  imageUrl: string;
}

const AdminTours = () => {
  const { token } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get<Tour[]>(
        "https://umra-vjr0.onrender.com/api/tours",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTour(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setType("");
    setDuration("");
    setPrice("");
    setDate("");
    setDescription("");
    setImageFile(null);
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setTitle(tour.title);
    setType(tour.type);
    setDuration(tour.duration);
    setPrice(tour.price);
    setDate(tour.date);
    setDescription(tour.description);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот тур?")) {
    
      
      try {
        await axios.delete(`https://umra-vjr0.onrender.com/api/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTours();
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingTour) {
        await axios.put(
          `https://umra-vjr0.onrender.com/api/tours/${editingTour._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("https://umra-vjr0.onrender.com/api/tours", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      handleClose();
      fetchTours();
    } catch (error) {
      console.error("Error saving tour:", error);
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
          Управление турами
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
          Добавить тур
        </Button>
      </Box>

      <Grid container spacing={4}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://umra-vjr0.onrender.com${tour.imageUrl}`}
                alt={tour.title}
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
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {tour.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {tour.price}$
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => handleEdit(tour)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(tour._id)}
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
          {editingTour ? "Редактировать тур" : "Добавить тур"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Тип тура</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Тип тура"
                required
              >
                <MenuItem value="Umra">Умра</MenuItem>
                <MenuItem value="Hajj">Хадж</MenuItem>
                <MenuItem value="Ziyarat">Зиярат</MenuItem>
                <MenuItem value="Special">Специальные</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Длительность (дней)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Цена ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Дата выезда"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
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
            {editingTour ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminTours;

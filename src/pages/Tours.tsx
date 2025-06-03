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
  Stack,
} from "@mui/material";
import axios from "axios";
import Footer from "../components/Footer";

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

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filters, setFilters] = useState({
    type: "",
    date: "",
    priceRange: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get(
        "https://umra-vjr0.onrender.com/api/tours"
      );
      setTours(response.data as Tour[]);
    } catch (error) {
      // setError("Ошибка при загрузке туров");
    }
  };

  const handleFilterChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        [field]: event.target.value,
      });
    };

  const filteredTours = tours.filter((tour) => {
    if (filters.type && tour.type !== filters.type) return false;
    if (filters.date && tour.date < filters.date) return false;
    if (filters.priceRange) {
      const price = parseInt(tour.price.replace(/[^0-9]/g, ""));
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (price < min || price > max) return false;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: { xs: 3, md: 4 },
        }}
      >
        Наши туры
      </Typography>

      {/* Фильтры */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            "& .MuiTextField-root": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
        >
          <TextField
            select
            label="Тип тура"
            value={filters.type}
            onChange={handleFilterChange("type")}
            sx={{ minWidth: { xs: "100%", sm: 200 } }}
          >
            <MenuItem value="">Все типы</MenuItem>
            <MenuItem value="Umra">Умра</MenuItem>
            <MenuItem value="Hajj">Хадж</MenuItem>
            <MenuItem value="Ziyarat">Зиярат</MenuItem>
            <MenuItem value="Special">Специальные</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Дата выезда"
            value={filters.date}
            onChange={handleFilterChange("date")}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: { xs: "100%", sm: 200 } }}
          />

          <TextField
            select
            label="Ценовой диапазон"
            value={filters.priceRange}
            onChange={handleFilterChange("priceRange")}
            sx={{ minWidth: { xs: "100%", sm: 200 } }}
          >
            <MenuItem value="">Все цены</MenuItem>
            <MenuItem value="1000-2000">1000$ - 2000$</MenuItem>
            <MenuItem value="2000-3000">2000$ - 3000$</MenuItem>
            <MenuItem value="3000-5000">3000$ - 5000$</MenuItem>
          </TextField>
        </Stack>
      </Box>

      {/* Карточки туров */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {filteredTours.map((tour) => (
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
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    color: "primary.main",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {tour.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {tour.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    mb: 2,
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">Тип: {tour.type}</Typography>
                  <Typography variant="body2">
                    Длительность: {tour.duration} дней
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    {tour.price}$
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    sx={{
                      minWidth: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Забронировать
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
};

export default Tours;

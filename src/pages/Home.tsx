import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import Tours from "./Tours";

const features = [
  {
    title: "Годы опыта",
    description: "Более 10 лет опыта в организации паломнических туров",
  },
  {
    title: "Профессиональная команда",
    description: "Опытные гиды и координаторы",
  },
  {
    title: "Поддержка 24/7",
    description: "Всегда на связи с нашими клиентами",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Carousel />

      {/* Hero Section */}
      {/* <Box
        sx={{
          position: "relative",
          height: "80vh",
          backgroundImage: 'url("/images/kaaba.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
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
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ color: "white", maxWidth: "600px" }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Духовное путешествие в Мекку
            </Typography>
            <Typography variant="h5" paragraph>
              Организуем паломнические туры в Мекку и Медину с заботой о каждом
              паломнике
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/tours")}
              sx={{ mt: 2 }}
            >
              Посмотреть туры
            </Button>
          </Box>
        </Container>
      </Box> */}

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ p: 4, backgroundColor: "transparent" }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Кто мы такие
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Мы - команда профессионалов с многолетним опытом организации
            паломнических туров. Наша миссия - сделать ваше духовное путешествие
            комфортным и незабываемым.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/about")}
            >
              Узнать больше
            </Button>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Добро пожаловать в Umra Tours
        </Typography>
        <Tours />
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          Ваш надежный партнер в организации паломнических туров
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

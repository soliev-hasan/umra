import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import axios from "axios";

interface CarouselSlide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  order: number;
}

const Carousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get<CarouselSlide[]>(
          "https://umra-vjr0.onrender.com/api/carousel"
        );
        setSlides(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке слайдов карусели:", error);
      }
    };

    fetchSlides();
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (slides.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isMobile ? "50vh" : "70vh",
        overflow: "hidden",
      }}
    >
      {/* Слайд */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundImage: `url(https://umra-vjr0.onrender.com${slides[currentSlide]?.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {/* Наложение */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: theme.spacing(3),
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {slides[currentSlide]?.title}
          </Typography>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {slides[currentSlide]?.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Кнопки навигации */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          left: theme.spacing(2),
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: theme.spacing(2),
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Точки */}
      <Box
        sx={{
          position: "absolute",
          bottom: theme.spacing(2),
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: theme.spacing(1),
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;

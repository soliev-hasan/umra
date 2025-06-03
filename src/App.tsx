import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Tours from "./pages/Tours";
import Contact from "./pages/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminGallery from "./components/admin/AdminGallery";
import AdminTours from "./components/admin/AdminTours";
import AdminCarousel from "./components/admin/AdminCarousel";
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./pages/Admin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4D3E", // Исламский зеленый
      light: "#2E7D32",
      dark: "#0D2C1F",
    },
    secondary: {
      main: "#C4A35A", // Золотой
      light: "#D4B36A",
      dark: "#B48B3A",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/images/islamic-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: -1,
          },
        }}
      >
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Admin />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/tours" element={<AdminTours />} />
              <Route path="/admin/carousel" element={<AdminCarousel />} />
            </Routes>
          </Router>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;

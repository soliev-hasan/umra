import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            mb: { xs: 3, md: 6 },
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Наши контакты
        </Typography>

        <Grid container spacing={4} sx={{ flex: 1 }}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 2, md: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PhoneIcon color="primary" />
                  <Typography variant="body1">
                    Телефон:{" "}
                    <Link
                      href="tel:+79030160200"
                      color="primary"
                      underline="hover"
                    >
                      +7 (903) 016-02-00
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <WhatsAppIcon color="primary" />
                  <Typography variant="body1">
                    WhatsApp:{" "}
                    <Link
                      href="https://wa.me/+79030160200"
                      color="primary"
                      underline="hover"
                    >
                      +7 (903) 016-02-00
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <WhatsAppIcon color="primary" />
                  <Typography variant="body1">
                    Наша группа в WhatsApp:{" "}
                    <Link
                      href="https://chat.whatsapp.com/Kz4dEAp7YnHG4SvarC87OJ"
                      color="primary"
                      underline="hover"
                    >
                      Чат
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TelegramIcon color="primary" />
                  <Typography variant="body1">
                    Telegram:{" "}
                    <Link
                      href="https://t.me/umratj"
                      color="primary"
                      underline="hover"
                    >
                      @umratj
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TelegramIcon color="primary" />
                  <Typography variant="body1">
                    Наша группа в Telegram:{" "}
                    <Link
                      href="https://t.me/tjkUMRA"
                      color="primary"
                      underline="hover"
                    >
                      @tjkUMRA
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body1">
                    г. Москва, ул. Примерная, д. 123
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          {/* <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 }, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Напишите нам
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Ваше имя"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Сообщение"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Отправить
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

import { Box, Container, Typography, Link, Grid } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[900],
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2">
              Телефон: <a href="tel:+79030160200">+7 (903) 016-02-00</a>
            </Typography>
            <Typography variant="body2">
              Email: <a href="mailto:sayfullo-n@mail.ru">sayfullo-n@mail.ru</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Социальные сети
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="https://wa.me/+79030160200" color="inherit">
                <WhatsAppIcon />
              </Link>
              <Link href="https://t.me/umratj" color="inherit">
                <TelegramIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Адрес
            </Typography>
            <Typography variant="body2">
              г. Москва, Фут сити 2 этаж(офис)
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Umra Tours. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

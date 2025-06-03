import {
  Container,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          color: "primary.main",
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        О нас
      </Typography>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: { xs: 2, md: 4 },
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "primary.main",
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Наша миссия
            </Typography>
            <Typography
              paragraph
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: 1.8,
              }}
            >
              Мы стремимся сделать духовное путешествие доступным и комфортным
              для каждого мусульманина. Наша цель - помочь паломникам совершить
              умру и хадж с максимальной духовной пользой и минимальными
              бытовыми заботами.
            </Typography>
            <Typography
              paragraph
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: 1.8,
              }}
            >
              Мы понимаем важность этого священного путешествия и делаем все
              возможное, чтобы каждый паломник мог полностью сосредоточиться на
              духовной стороне паломничества.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: { xs: 2, md: 4 },
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "primary.main",
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Наши ценности
            </Typography>
            <List>
              <ListItem
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Профессионализм"
                  secondary="Мы обеспечиваем высокий уровень сервиса и поддержки"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: "bold",
                      color: "primary.main",
                    },
                    "& .MuiListItemText-secondary": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  }}
                />
              </ListItem>
              <ListItem
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Надежность"
                  secondary="Мы гарантируем безопасность и комфорт наших клиентов"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: "bold",
                      color: "primary.main",
                    },
                    "& .MuiListItemText-secondary": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  }}
                />
              </ListItem>
              <ListItem
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Духовность"
                  secondary="Мы помогаем паломникам достичь духовного просветления"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: "bold",
                      color: "primary.main",
                    },
                    "& .MuiListItemText-secondary": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;

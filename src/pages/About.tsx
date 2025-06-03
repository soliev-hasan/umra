import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import Footer from "../components/Footer";

const testimonials = [
  {
    name: "Ахмад",
    text: "Отличная организация поездки. Все было на высшем уровне.",
    avatar: "/images/avatar1.jpg",
  },
  {
    name: "Марьям",
    text: "Благодарна за комфортное путешествие и заботу о паломниках.",
    avatar: "/images/avatar2.jpg",
  },
  {
    name: "Ибрагим",
    text: "Профессиональный подход и внимание к деталям.",
    avatar: "/images/avatar3.jpg",
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Company Info */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          О нашей организации
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Мы специализируемся на организации паломнических туров в Мекку и
          Медину с 2010 года. Наша команда состоит из опытных специалистов,
          которые помогут вам совершить духовное путешествие с максимальным
          комфортом.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Наша команда
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src="/images/guide1.jpg"
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6">Мухаммад Али</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Главный гид
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src="/images/guide2.jpg"
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6">Аиша Хадиджа</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Координатор туров
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src="/images/guide3.jpg"
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6">Абдулла Рашид</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Менеджер по работе с клиентами
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Отзывы паломников
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {testimonials.map((testimonial, index) => (
            <Grid xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {testimonial.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default About;

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        "https://umra-vjr0.onrender.com/api/auth/login",
        {
          email: username,
          password,
        }
      );
      
      if (response.data.token) {
   
        localStorage.setItem("token", response.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 4,
            color: "primary.main",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Вход в админ-панель
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;

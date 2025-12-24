import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { token, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Главная", path: "/" },
    { text: "Галерея", path: "/gallery" },
    { text: "Туры", path: "/tours" },
    { text: "О нас", path: "/about" },
    { text: "Контакты", path: "/contact" },
    { text: "Панель Управления", path: "/admin/dashboard"}
    
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              color: "white",
            },
          }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      {token ? (
        <>
      
          <ListItem
            button
            onClick={() => {
              logout();
              handleDrawerToggle();
            }}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: "white",
              },
            }}
          >
            <ListItemText primary="Выйти" />
          </ListItem>
        </>
      ) : (
        <ListItem
          button
          component={RouterLink}
          to="/admin/login"
          onClick={handleDrawerToggle}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              color: "white",
            },
          }}
        >
          <ListItemText primary="Войти" />
        </ListItem>
      )}
    </List>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(27, 77, 62, 0.95)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/images/mosque-icon.svg"
            alt="Mosque Icon"
            sx={{ height: 32, width: 32 }}
          />
          Umra Tours
        </Typography>
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
            {token ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Выйти
                </Button>
                
              </>
            ) : (
              <Button
                color="inherit"
                component={RouterLink}
                to="/admin/login"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Войти
              </Button>
            )}
            {/* <Button
              component={RouterLink}
              to="/tours"
              color="inherit"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Туры
            </Button> */}
          </Box>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

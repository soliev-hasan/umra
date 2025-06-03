import { useState } from "react";
import { Box, Container, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import AdminGallery from "../components/admin/AdminGallery";
import AdminCarousel from "../components/admin/AdminCarousel";
import AdminNews from "../components/admin/AdminNews";
import AdminTours from "../components/admin/AdminTours";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Admin = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Панель администратора
      </Typography>
      <Typography variant="body1" paragraph>
        Добро пожаловать, {user?.name}!
      </Typography>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Туры" />
          <Tab label="Галерея" />
          <Tab label="Карусель" />
          <Tab label="Новости" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AdminTours />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminGallery />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminCarousel />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdminNews />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Admin;

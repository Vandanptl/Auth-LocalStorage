import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Dashboard
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;

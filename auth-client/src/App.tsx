import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Register from "./pages/Register";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

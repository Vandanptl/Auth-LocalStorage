import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44325/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(
        "https://localhost:44325/api/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Google authentication failed");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google authentication failed");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <GoogleOAuthProvider clientId="your-google-client-id">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </GoogleOAuthProvider>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

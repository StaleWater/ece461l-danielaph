import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = () => {
    // Simulate login logic
    if (userId === 'admin' && password === 'password') {
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      auth?.login("jwtgoeshere");
      setTimeout(() => navigate("/projects"), 2000)
    } else {
      setErrorMessage('Invalid User ID or Password.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      {errorMessage && <ErrorMessages message={errorMessage} />}
      {successMessage && <SuccessMessages message={successMessage} />}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
        <Button variant="contained" onClick={() => navigate("/signup")} sx={{ mt: 2, marginLeft: "4px" }}>
          Need an account? Signup
        </Button>
      </Box>
    </>
  );
}

export default Login;
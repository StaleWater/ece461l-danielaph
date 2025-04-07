import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import request, { Method } from "../util/request"
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = async () => {
    const response = await request(`login?uname=${encodeURIComponent(userId)}&pw=${encodeURIComponent(password)}`, Method.Get)

    if(response.ok) {
      const tokenData = await response.text();
      setSuccessMessage(tokenData);
      setErrorMessage('');
      const token = {token: tokenData}
      auth?.login(token);
      setTimeout(() => navigate("/projects"), 2000)
    } else {
      const error = await response.text();
      setSuccessMessage('');
      setErrorMessage(error);
    }
  };

  return (
    <>
      {errorMessage && <ErrorMessages message={errorMessage} />}
      {successMessage && <SuccessMessages message={successMessage} />}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Go Die"
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
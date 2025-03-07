import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (userid: string, password: string) => {
    // Simulate login logic
    if (userid === 'admin' && password === 'password') {
      setSuccessMessage('Login successful!');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid user ID or password');
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
      </Box>
    </>
  );
}

export default Login;
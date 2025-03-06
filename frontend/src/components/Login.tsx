import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface LoginProps {
  onLogin: (userid: string, password: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(userid, password);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="User ID"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
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
  );
}

export default Login;
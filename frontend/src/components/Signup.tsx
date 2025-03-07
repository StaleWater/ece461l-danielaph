import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSignup = () => {
    // Simulate signup logic
    if (userId == "" || password == "") {
        setErrorMessage('User ID and Password fields must not be blank.');
        setSuccessMessage('');
    } else if (userId === "admin") {
        setErrorMessage('User ID already registered.');
        setSuccessMessage('');
    } else {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
    }
  };

  return (
    <>
      {errorMessage && <ErrorMessages message={errorMessage} />}
      {successMessage && <SuccessMessages message={successMessage} />}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Signup</Typography>
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
        <Button variant="contained" onClick={handleSignup} sx={{ mt: 2 }}>
          Signup
        </Button>
        <Button variant="contained" onClick={() => navigate("/login")} sx={{ mt: 2, marginLeft: "4px" }}>
          Have an account? Login
        </Button>
      </Box>
    </>
  );
}

export default Signup;
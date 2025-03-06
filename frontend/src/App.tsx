import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Login from './components/Login';
import ErrorMessages from './components/ErrorMessages';
import SuccessMessages from './components/SuccessMessages';
import './App.css';

function App() {
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
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        HaaS System
      </Typography>
      <Login onLogin={handleLogin} />
      {errorMessage && <ErrorMessages message={errorMessage} />}
      {successMessage && <SuccessMessages message={successMessage} />}
    </Container>
  );
}

export default App;
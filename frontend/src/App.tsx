import { Container, Typography } from '@mui/material';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          HaaS System
        </Typography>
        <Login />
      </Container>
    </>
  );
}

export default App;
import { Container, Typography } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './components/Projects';

import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            HaaS System
          </Typography>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
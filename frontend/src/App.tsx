import { useState } from "react";
import { Container, Typography } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from './components/Login';
import Signup from './components/Signup';
import Projects, {Project} from './components/Projects';
import ProjectCreation from './components/ProjectCreation'; 
import './App.css';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

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
                  <Projects projects={projects}/>
                </PrivateRoute>
              }
            />
            <Route
              path="/create-project"
              element={
                <PrivateRoute>
                  <ProjectCreation onCreateProject={(name, id) => {
                    let newProjects = projects;
                    let newProject: Project = {name, id};
                    newProjects.push(newProject);
                    setProjects(newProjects);
                  }} />
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
import React, { useState } from 'react';
import { Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface Project {
  name: string;
  id: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <Box>
      <Typography variant="h4">Projects</Typography>
      <Button
        variant="contained"
        component={Link}
        to="/create-project"
        sx={{ mt: 2 }}
      >
        Create New Project
      </Button>
      <List>
        {projects.map((project, index) => (
          <ListItem key={index}>
            <ListItemText primary={project.name} secondary={`ID: ${project.id}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Projects;
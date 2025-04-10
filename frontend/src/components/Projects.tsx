import { Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import request, { Method } from "../util/request"
import { Token } from "../contexts/AuthContext";

export interface Project {
  pid: string;
  name: string;
  description: string;
}

interface ProjectProps {
  token: Token;
}

export function Projects({token}: Readonly<ProjectProps>) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    request("/get-user-projects", Method.Get, token)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  })

  return (
    <>
      <Box>
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/create-project"
          sx={{ mt: 2 }}
        >
          Create Project
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/join-project"
          sx={{ mt: 2, marginLeft: "5px" }}
        >
          Join Project
        </Button>
        <List>
          {projects.map((project, index) => (
            <ListItem key={index}>
              <ListItemText sx={{textAlign: "center"}} primary={project.name} secondary={`ID: ${project.pid}`} slotProps={{secondary: {sx: {color: "text.primary"}}}} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Projects;
import { Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export interface Project {
  name: string;
  id: string;
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({projects}: Readonly<ProjectsProps>) {
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
              <ListItemText sx={{textAlign: "center"}} primary={project.name} secondary={`ID: ${project.id}`} slotProps={{secondary: {sx: {color: "text.primary"}}}} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Projects;
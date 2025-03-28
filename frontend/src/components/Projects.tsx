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
  //const [projects, setProjects] = useState<Project[]>([]);
  //const navigate = useNavigate();

  //const addProject = (project: Project) => {
    //setProjects([...projects, project]);
  //};

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
            <ListItemText sx={{textAlign: "center"}} primary={project.name} secondary={`ID: ${project.id}`} slotProps={{secondary: {sx: {color: "white"}}}} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Projects;
import { Typography, Box, Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import request, { Method } from "../util/request"
import { Token } from "../contexts/AuthContext";
import ProjectInfo from "./ProjectInfo"

export interface Project {
  pid: string;
  name: string;
  description: string;
}

export interface HardwareSet {
  hwid: string;
  hwname: string;
  capacity: Number;
  availability: Number;
  checked_out: Number[];
}

interface ProjectProps {
  token: Token;
}

export function Projects({token}: Readonly<ProjectProps>) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hardwareSets, setHardwareSets] = useState<HardwareSet[]>([]);

  useEffect(() => {
    request("/get-user-projects", Method.Get, token)
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
    
    request("/get-hwsets", Method.Get, token)
      .then((response) => response.json())
      .then((data: HardwareSet[]) => {
        setHardwareSets(data);
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
            <ListItem key={index} sx={{justifyContent: "center"}}>
              <ProjectInfo project={project} hardwareSets={hardwareSets} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Projects;
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface ProjectCreationProps {
  onCreateProject: (projectName: string, projectID: string) => void;
}

function ProjectCreation({ onCreateProject }: ProjectCreationProps) {
  const [projectName, setProjectName] = useState('');
  const [projectID, setProjectID] = useState('');

  const handleCreateProject = () => {
    onCreateProject(projectName, projectID);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Create New Project</Typography>
      <TextField
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Project ID"
        value={projectID}
        onChange={(e) => setProjectID(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleCreateProject} sx={{ mt: 2 }}>
        Create Project
      </Button>
    </Box>
  );
}

export default ProjectCreation;
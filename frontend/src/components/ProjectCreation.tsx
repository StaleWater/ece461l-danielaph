import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Token } from "../contexts/AuthContext"
import request, { Method } from "../util/request"
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

interface ProjectCreationProps {
  token: Token;
}

function ProjectCreation({ token }: ProjectCreationProps) {
  const [projectName, setProjectName] = useState('');
  const [projectID, setProjectID] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    const response = await request(`make-new-project?pid=${encodeURIComponent(projectID)}&pname=${encodeURI(projectName)}&desc=${encodeURIComponent(projectDescription)}`, Method.Post, token)
    if(response.ok) {
      setSuccessMessage(`Successfully created project ${projectName}`);
      setErrorMessage('');
      setTimeout(() => navigate("/projects"), 2000)
  } else {
      const error = await response.text();
      setSuccessMessage('');
      setErrorMessage(error);
  }
  };

  return (
    <>
      {errorMessage && <ErrorMessages message={errorMessage} />}
      {successMessage && <SuccessMessages message={successMessage} />}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">
          Create New Project
        </Typography>
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
        <TextField
          label="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleCreateProject} sx={{ mt: 2 }}>
          Create Project
        </Button>
        <Button variant="contained" onClick={() => navigate("/projects")} sx={{ mt: 2, marginLeft: "4px" }}>
            Cancel
        </Button>
      </Box>
    </>
  );
}

export default ProjectCreation;
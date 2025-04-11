import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Token } from "../contexts/AuthContext";
import request, { Method } from "../util/request"
import ErrorMessages from './ErrorMessages';
import SuccessMessages from './SuccessMessages';

interface ProjectJoinProps {
  token: Token;
}

function ProjectJoin({token}: Readonly<ProjectJoinProps>) {
  const [projectID, setProjectID] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleJoinProject = async () => {
    const response = await request(`join-project?pid=${encodeURIComponent(projectID)}`, Method.Post, token)
    if(response.ok) {
        setSuccessMessage(`Successfully joined project ${projectID}`);
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
        <Typography variant="h5">Join Existing Project</Typography>
        <TextField
            label="Project ID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
            fullWidth
            margin="normal"
        />
        <Button variant="contained" onClick={handleJoinProject} sx={{ mt: 2 }}>
            Join Project
        </Button>
        <Button variant="contained" onClick={() => navigate("/projects")} sx={{ mt: 2, marginLeft: "4px" }}>
            Cancel
        </Button>
      </Box>
    </>
  );
}

export default ProjectJoin;
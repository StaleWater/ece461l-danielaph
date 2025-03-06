import React from 'react';
import { Alert } from '@mui/material';

interface ErrorMessagesProps {
  message: string;
}

function ErrorMessages({ message }: ErrorMessagesProps) {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {message}
    </Alert>
  );
}

export default ErrorMessages;
import { Alert } from '@mui/material';

interface SuccessMessagesProps {
  message: string;
}

function SuccessMessages({ message }: SuccessMessagesProps) {
  return (
    <Alert severity="success" sx={{ mt: 2 }}>
      {message}
    </Alert>
  );
}

export default SuccessMessages;
import React from 'react';
import { Alert, Box } from '@mui/material';
import { FlashMessageType } from '@/types/flashMessageType';


const FlashMessage: React.FC<FlashMessageType> = ({ message, type }) => {
  if (!message) return null;

  return (
    <Box my={2}>
      <Alert severity={type}>{message}</Alert>
    </Box>
  );
};

export default FlashMessage;

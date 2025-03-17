import React, { useState, useEffect } from 'react';
import { Alert, Snackbar, Link } from '@mui/material';
import { api_key } from '../hooks/nasaCall';

const ApiKeyWarning = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // If using the DEMO_KEY, show the warning
    if (api_key === 'DEMO_KEY') {
      setOpen(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={15000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity="warning" 
        variant="filled"
        sx={{ width: '100%' }}
      >
        You're using NASA's DEMO_KEY, which is limited to 30 requests per hour. 
        <Link 
          href="https://api.nasa.gov/" 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ color: 'white', ml: 1, fontWeight: 'bold' }}
        >
          Get your own API key
        </Link>
      </Alert>
    </Snackbar>
  );
};

export default ApiKeyWarning; 
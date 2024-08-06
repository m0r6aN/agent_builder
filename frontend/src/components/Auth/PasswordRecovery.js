// src/components/Auth/PasswordRecovery.js

import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();
    const result = await authService.recoverPassword(email);
    if (result.success) {
      setMessage(result.message);
      setError('');
    } else {
      setError(result.message);
      setMessage('');
    }
  };

  return (
    <Box className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        Password Recovery
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleRecover}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Recover Password
        </Button>
      </form>
    </Box>
  );
};

export default PasswordRecovery;
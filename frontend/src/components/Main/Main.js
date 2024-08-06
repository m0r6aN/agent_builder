// src/components/Main/Main.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Main = () => (
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Typography paragraph>Main content goes here.</Typography>
  </Box>
);

export default Main;
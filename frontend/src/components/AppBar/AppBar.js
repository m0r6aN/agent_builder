import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

const AppBar = () => (
  <MuiAppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: '240px' }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        SynthetIQ
      </Typography>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
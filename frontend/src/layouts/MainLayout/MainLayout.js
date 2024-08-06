import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../assets/styles/theme';
import AppBar from '../../components/AppBar/AppBar';
import LeftDrawer from '../../components/Drawers/LeftDrawer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ display: 'flex', paddingTop:'35px' }}>
      <AppBar />
      <LeftDrawer />
      <main style={{ flexGrow: 1, padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  </ThemeProvider>
);

export default MainLayout;
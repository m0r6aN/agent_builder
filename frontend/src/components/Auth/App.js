// src/components/Auth/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Login from './Login';
import PasswordRecovery from './PasswordRecovery';
import theme from '../theme/theme';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recover" element={<PasswordRecovery />} />
          <Route path="/home" element={<div className="App-header">Home Page</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
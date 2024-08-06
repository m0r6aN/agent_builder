import React from 'react';
import { Typography, Box } from '@mui/material';
import WizardComponent from '../Wizard/WizardComponent';

const HomeComponent = () => (
  <Box sx={{ padding: '20px' }}>
    <Typography variant="h6" gutterBottom>
      SynthetIQ is a flexible and extensible framework designed for creating, managing, and testing AI agents.
    </Typography>
    <Typography gutterBottom>
      These agents can perform a variety of tasks, such as web scraping, research, and content creation, utilizing various tools like Google Search, Wikipedia Search, and more. SynthetIQ allows users to define agents using prompts,
      assign them tools, and manage their configurations.
    </Typography>
    <Typography gutterBottom>
      The project also supports persistence through local storage, making it easy to save and retrieve agent configurations.
    </Typography>
    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
      Get Started with SynthetIQ
    </Typography>
    <WizardComponent />
  </Box>
);

export default HomeComponent;

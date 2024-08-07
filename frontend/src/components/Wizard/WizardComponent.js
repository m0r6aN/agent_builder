import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import ModelManager from '../Model/ModelManager';
import AgentManager from '../Agent/AgentManager';
import TaskManager from '../Task/TaskManager';
import ProcessManager from '../Process/ProcessManager';

const steps = [
  'Create a Model',
  'Create Agents',
  'Create Tasks',
  'Create a Process',
  'Export Application',
];

const Wizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [modelData, setModelData] = useState(null);
  const [agentsData, setAgentsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [processData, setProcessData] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setModelData(null);
    setAgentsData([]);
    setTasksData([]);
    setProcessData(null);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ModelManager modelData={modelData} setModelData={setModelData} />;
      case 1:
        return <AgentManager agentsData={agentsData} setAgentsData={setAgentsData} />;
      case 2:
        return <TaskManager tasksData={tasksData} setTasksData={setTasksData} />;
      case 3:
        return <ProcessManager processData={processData} setProcessData={setProcessData} />;
      case 4:
        return <Typography>All steps completed - you can now export your application!</Typography>;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished!
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Wizard;

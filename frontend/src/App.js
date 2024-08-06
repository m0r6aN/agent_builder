import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import HomeComponent from './components/Home/HomeComponent'; 
import AgentManager from './components/Agent/AgentManager';
import ProcessManager from './components/Process/ProcessManager';
import PromptManager from './components/Prompt/PromptManager';
import ToolManager from './components/Tool/ToolManager';
import TaskManager from './components/Task/TaskManager';
import ModelManager from './components/Model/ModelManager';
import './assets/styles/App.css';
import RequestManager from './components/Requests/RequestManager';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeComponent />} />
        <Route path="agents" element={<AgentManager />} />
        <Route path="models" element={<ModelManager />} />
        <Route path="requests" element={<RequestManager />} />
        <Route path="tasks" element={<TaskManager />} />
        <Route path="prompts" element={<PromptManager />} />
        <Route path="tools" element={<ToolManager />} />
        <Route path="builder" element={<AgentManager />} />
        <Route path="process" element={<ProcessManager />} />
      </Route>
    </Routes>
  </Router>
);

export default App;

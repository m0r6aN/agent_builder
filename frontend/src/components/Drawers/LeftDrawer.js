import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import BuildIcon from '@mui/icons-material/Build';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const drawerWidth = 240;

const LeftDrawer = () => (
  <MuiDrawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar />
    <Divider />
    <List>
      <ListItem component={Link} to="/" disablePadding>
        <ListItemButton>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/agents" disablePadding>
        <ListItemButton>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Agents" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/models" disablePadding>
        <ListItemButton>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Models" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/requests" disablePadding>
        <ListItemButton>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Requests" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/process" disablePadding>
        <ListItemButton>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Processes" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/tasks" disablePadding>
        <ListItemButton>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/prompts" disablePadding>
        <ListItemButton>
          <ListItemIcon><ChatIcon /></ListItemIcon>
          <ListItemText primary="Prompts" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/tools" disablePadding>
        <ListItemButton>
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItemButton>
      </ListItem>
      <ListItem component={Link} to="/tester" disablePadding>
        <ListItemButton>
          <ListItemIcon><FactCheckIcon /></ListItemIcon>
          <ListItemText primary="Tester" />
        </ListItemButton>
      </ListItem>
    </List>
  </MuiDrawer>
);

export default LeftDrawer;

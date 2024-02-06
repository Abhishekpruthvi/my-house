import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Drawer, List, ListItem, Toolbar, Typography, IconButton } from '@mui/material';
import GoogleSheetData from './GoogleSheetData';
import Home from './Home';
import HouseDetails from './HouseDetails'
import UpdateDetails from './UpdateDetails.js'


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" noWrap>
            My House
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:index" element={<HouseDetails />} />
          <Route path="/update/:index" element={<UpdateDetails />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

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
import UpdateHouseDetails from './UpdateHouseDetails.js'
  
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
          <Link to="/my-house" style={{ textDecoration: 'none', color: 'inherit' }}>
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
          <Route path="/my-house" element={<Home />} />
          <Route path="/my-house/details/:index" element={<HouseDetails />} />
          <Route path="/my-house/update/:index" element={<UpdateDetails />} />
          <Route path="/my-house/update/:floor/:house" element={<UpdateHouseDetails />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

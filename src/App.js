import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import IndividualMemberPage from './pages/IndividualMemberPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes> 
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/member/:id" element={<IndividualMemberPage />} /> 
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

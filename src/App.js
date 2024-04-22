import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import LandingPage from './pages/LandingPage';
import IndividualMemberPage from './pages/IndividualMemberPage';

function App() {
  return (
    <Router>
      <Routes> {/* Wrap Route components with Routes */}
        <Route exact path="/" element={<LandingPage />} /> {/* Use element prop */}
        <Route path="/member/:id" element={<IndividualMemberPage />} /> {/* Use element prop */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage';
import { useJsApiLoader } from '@react-google-maps/api';
import MapsPage from './pages/App/MapsPage/MapsPage';
import CmsPage from './pages/App/CmsPage/CmsPage';

const App = () => {




  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/app" element={  <MapsPage/>} />
        <Route path="/cms" element={  <CmsPage/>} />
      </Routes>
    </Router>
  
  );
};

export default App;
